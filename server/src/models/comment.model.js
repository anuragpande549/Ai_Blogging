import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true
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
    isApproved:{
        type:Boolean,
        default:false
    },
    parentComment: { // Optional field for replies
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
        default: null
    }
}, { timestamps: true }); 

const Comment = mongoose.model("comment", commentSchema);

export default Comment;
