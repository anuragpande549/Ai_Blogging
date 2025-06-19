import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "user", 
        required: true 
    },
    title: {
        type: String,
        required: true

    },
    image:{
        type:String,
        require:true
    },
    subTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "category"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "comment"
        }
    ],
    isPublish: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model("blog", blogSchema);

export default Blog;
