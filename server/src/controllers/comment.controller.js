import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js"
import Blog from "../models/blog.model.js";

import Comment from "../models/comment.model.js";


const allCommentsByUserBlogs = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log({user})
  if (!user) throw new ApiError(401, "User not authenticated");

  const blogsWithComments = await Blog.find({ author: user._id }).select("comment")
    .populate({
      path: "comments",
      model: "comment", //this use when ref is not defined
      options: { sort: { createdAt: -1 } }, // optional: newest first
      populate:({
        path:"blog",
        select:"title _id"
      })
    });

    if(!blogsWithComments) throw new ApiError(400,"comment fetch failed")
  res.status(200).json(new ApiResponse(200, "Comments fetched", blogsWithComments));
});


const addComment = asyncHandler(async (req, res) => {
  console.log("body :", req)
  const { name, message, blogID } = req.body;

  if (!name || !message) {
    throw new ApiError(1401, "All fields are needed");
  }

  const comment = await Comment.create({
    content: message,
    blog: blogID,
    user: name,
  });

  if (!comment) {
    throw new ApiError(401, "Comment was not saved");
  }



  const blogCommentAdd = await Blog.findByIdAndUpdate(
    blogID,
    { $push: { comments: comment._id } },
    { new: true }
  );

  if (!blogCommentAdd) {
    throw new ApiError(401, "Blog comment save failed");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Comment saved successfully wait for approver", { comment}));
});



const approveStatus = asyncHandler(async (req, res) => {
//   const user = req.user;
//   if (!user) throw new ApiError(401, "User is not received");

  const { status, commentID } = req.body;
  if (typeof status !== "boolean" || !commentID) {
    throw new ApiError(400, "Status or Comment ID is missing");
  }

  const updateStatus = await Comment.findByIdAndUpdate(
    commentID,
    { $set: { isApproved: status } },
    { new: true }
  );

  if (!updateStatus) {
    throw new ApiError(500, "Status update failed");
  }

  res.status(200).json(
    new ApiResponse(200, "Status is approved", updateStatus)
  );
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentID, blogID } = req.body.commentID;
  console.log({ commentID, blogID })
  if (!commentID) throw new ApiError(400, "Comment ID is needed");

  const blogComment = await Blog.findByIdAndUpdate(
    blogID,
    { $pull: { comments: commentID } },
    { new: true }
  );
  if (!blogComment) throw new ApiResponse(402, "blog comment delete failed");
  const deleteByID = await Comment.findOneAndDelete({ _id: commentID }, { new: true });

  if (!deleteByID) throw new ApiError(500,"delete is failed");
    
    res.status(200).json(new ApiResponse(200, "Delete is success", deleteByID))
})


export {deleteComment, approveStatus, addComment, allCommentsByUserBlogs};