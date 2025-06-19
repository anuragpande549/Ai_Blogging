import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog", 
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    parentComment: { // Optional field for replies
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
        default: null
    }
}, { timestamps: true }); 

const Comment = mongoose.model("comment", commentSchema);

export default Comment;
