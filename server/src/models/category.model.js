import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        unique: true,
        trim: true
    },
    connectBlog:[{
        type: mongoose.Schema.ObjectId,
        ref:"blog"
    }],
    description: {
        type: String,
        default: "" // Optional description for category
    }
}, { timestamps: true }); 

const Category = mongoose.model("category", categorySchema);

export default Category;
