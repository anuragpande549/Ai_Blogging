import mongoose from "mongoose";
import Blog from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Category from "../models/category.model.js";
import cloudinaryUpload from "../utils/cloudinary.js";
import User from "../models/user.model.js";
import { deleteFile } from "../utils/cloudinary.js";
import main from "../config/gemini.js";

const allBlogData = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({isPublish : true}, "_id title subTitle category image")
    .populate("category", "name -_id")// Only fetch category name
    .lean(); // Optional: improves performance
  const category = await Category.find({},"name connectBlog").lean()
  res.status(200).json(
    new ApiResponse(200, {
      count: blogs.length,
      blogs,
      category
    })
  );
});

const getUserBlog = asyncHandler(async (req, res) => {
  const userID = req?.user?._id;
  if (!userID) throw new ApiError(401, "User details not found");

  const { page, limit } = req.body;
  if (!page || !limit) throw new ApiError(400, "Page and limit are required");

  const skip = (page - 1) * limit;

  const blogsList = await Blog.find({ author: userID })
    .populate("category", "name -_id")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!blogsList || blogsList.length === 0)
    throw new ApiError(404, "No blogs found");

  res.status(200).json(new ApiResponse(200, blogsList, true));
});


const createBlog = asyncHandler(async (req, res)=>{
    const user = req?.user
    const { title, subTitle, description ,category , isPublish } = req.body
    if([ title, subTitle, description , isPublish ].some((field) => (field.trim() === ""))) throw new ApiError(402 , "All field are required");

    const image = req?.files?.image?.[0]?.path;
    if (!image) throw new ApiError(401, "image path is not receive");

    const uploadImage = await cloudinaryUpload(image);
    if (!uploadImage) throw new ApiError(402, "cloudinary details are not receive");

    const updateCategory = await Category.findOneAndUpdate(
        { name: category },
        { $set: { name: category } },
        {
            new: true,   // return the updated document
            upsert: true // create it if it doesn't exist
        }
    );
    if (!updateCategory) throw new ApiError(402, "Adding category is failed");

    const blogCreate = await Blog.create({
        author : user?._id,
        image:uploadImage.url,
        title,
        subTitle,
        description,
        category:updateCategory._id,
        isPublish,

    });
    if(!blogCreate) throw new ApiError(402,"blog creation is failed");

    updateCategory.connectBlog.push(blogCreate?._id)
    await updateCategory.save();

    user.blogs.push(blogCreate?._id)
    await user.save();

    return res.json(
        new ApiResponse(200, {
            user,
            blogCreate,
            updateCategory,
        })
    )

})
const updateBlog = asyncHandler(async (req, res) => {
  const user = req?.user;
  const {blogId} = req.body;

  const { title, subTitle, description, category, isPublish,  } = req.body;
  const image = req?.files?.image?.[0]?.path;

  if (!blogId) throw new ApiError(400, "Blog ID is required for update");

  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found");
  if (!blog.author.equals(user._id)) throw new ApiError(403, "Unauthorized to update this blog");

  let updatedFields = {
    title,
    subTitle,
    description,
    isPublish,
   
  };

  if (category) {
    const updatedCategory = await Category.findOneAndUpdate(
      { name: category },
      { $set: { name: category } },
      { new: true, upsert: true }
    );
    if (!updatedCategory) throw new ApiError(400, "Failed to update category");
    updatedFields.category = updatedCategory._id;
  }

  if (image) {
    const uploadedImage = await cloudinaryUpload(image);
    if (!uploadedImage) throw new ApiError(400, "Failed to upload image");
    updatedFields.image = uploadedImage.secure_url;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedFields, { new: true });
  if (!updatedBlog) throw new ApiError(400, "Blog update failed");

 return res.json(new ApiResponse(200, updatedBlog));
});

const extractPublicId = (url) => {
  const parts = url.split('/');
  const fileWithExtension = parts.pop() // "sample.jpg"
  const publicId = fileWithExtension.split('.')[0]; // "sample"
  return publicId;
};

const deleteBlog = asyncHandler(async (req, res) => {

  console.log({"hsfcsaufhdsljdfvkldjvn":req.body})
  const { blogId } = req.body


  // Validate blog ID
  if (!blogId) throw new ApiError(400, "Blog ID is required");

  const blog = await Blog.findById(blogId);
  if (!blog) throw new ApiError(404, "Blog not found");

  // Extract publicId from blog image
  const publicId = extractPublicId(blog.image);
  if (!publicId) throw new ApiError(422, "Invalid public ID from image URL");

  // Attempt to delete image from Cloudinary
  const imageDeleted = await deleteFile(publicId);
  if (!imageDeleted) throw new ApiError(500, "Failed to delete image from Cloudinary");

  // Clean up references in related collections
  await Promise.all([
    User.updateOne(
      { _id: blog.author },
      { $pull: { blogs: blog._id } }
    ),
    Category.updateMany(
      { _id: { $in: blog.category } },
      { $pull: { connectBlog: blog._id } }
    ),
    Blog.deleteOne({ _id: blog._id })
  ]);

  res.status(200).json(
    new ApiResponse(200, { message: "Blog deleted successfully" }, true)
  );
});


const getBlog = asyncHandler(async (req, res) => {
  const  blogId  = req.params.blogId; // ⬅️ changed from body to params

  if (!blogId) throw new ApiError(400, "Blog ID is required");

  const blogDetails = await Blog.findById(blogId);
  if (!blogDetails) throw new ApiError(404, "Blog not found");

  const categoryDetails = await Category.find({ _id: { $in: blogDetails.category } });
  const userDetails = await User.findById(blogDetails.author);

  if (!userDetails) throw new ApiError(404, "Author not found");

  res.status(200).json(
    new ApiResponse(200, {
      blogDetails,
      categoryDetails: categoryDetails.map((cat) => cat.name),
      userDetails: {
        name: userDetails.name,
        avatar: userDetails.avatar,
      },
    })
  );
});

const publishUpdate = asyncHandler(async (req, res) => {
  const { isPublish, blogId } = req.body;

  if (!blogId) throw new ApiError(401, "blogId is required");
  if (typeof isPublish !== "boolean") throw new ApiError(401, "Status must be a boolean");

  const updateBlog = await Blog.findByIdAndUpdate(
    blogId,
    { $set: { isPublish: isPublish } },
    { new: true }
  );

  if (!updateBlog) throw new ApiError(401, "Failed to update blog status");

  res.status(200).json(new ApiResponse(200, updateBlog));
});

const generateContent = asyncHandler(async (req, res) => {
  const { title, subTitle, description } = req.body;

  if (!title && !subTitle) {
    throw new ApiError(400, "Title and subTitle are required");
  }

  const prompt = `Write a comprehensive and SEO-optimized blog post on the topic "${title}". 
Include a compelling introduction, detailed explanation under the subtitle "${subTitle}", 
and incorporate this description context: ${description}`
// Make sure the tone is informative and engaging, suitable for readers with general interest in the topic

  const aiResponse = await main(prompt); 
  if(!aiResponse) throw new ApiError(401, "blog generation is failed")
  res.status(200).json(new ApiResponse(200,true ,{message:"ai generation is success"
,data:aiResponse}));
});






export {createBlog,updateBlog,deleteBlog,getBlog,publishUpdate,allBlogData,generateContent,
  getUserBlog
}

