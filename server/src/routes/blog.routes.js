import express from "express";
import authUser from "../middleware/auth.js";
import { createBlog,deleteBlog,updateBlog, getBlog,publishUpdate, allBlogData, generateContent, getUserBlog } from "../controllers/blog.controller.js";
import upload from "../middleware/multer.js";

const blogRoutes = express.Router();

blogRoutes.route("/").get(allBlogData)

blogRoutes.route("/create-blog").post( authUser, upload.fields([
    {
        name:"image",
        maxCount:1
    }
]), createBlog );

blogRoutes.route("/update-blog").patch(authUser, upload.fields([
    {
        name:"image",
        maxCount:1
    }
]), updateBlog );

blogRoutes.route("/delete-blog").delete(authUser, deleteBlog);

blogRoutes.route("/get-blog/:blogId").get(getBlog);

blogRoutes.route("/publish-update").put(authUser, publishUpdate);

blogRoutes.route("/generate").post(authUser, generateContent)
blogRoutes.route("/user-post").post(authUser, getUserBlog)

export default blogRoutes;