import express from "express";
import authUser from "../middleware/auth.js";
import { addComment, approveStatus, deleteComment,allCommentsByUserBlogs } from "../controllers/comment.controller.js";


const comment = express.Router();

comment.route("/").get(authUser,allCommentsByUserBlogs);
comment.route("/add").post(addComment);
comment.route("/status").put(authUser, approveStatus)
comment.route("/delete").delete(authUser,deleteComment)

export default comment

