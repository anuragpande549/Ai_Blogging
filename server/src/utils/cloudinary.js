import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";
import fs from "fs";
import { asyncHandler } from "./asyncHandler.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async function (localFilePath) {


    try {
        if (!localFilePath) {
            throw new ApiError(400, "File name or path missing");
        }

        console.log("Present local file path:", localFilePath);

        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File upload success:", uploadResult);

        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

        return uploadResult;
    } catch (error) {
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

        throw new ApiError(500, "Avatar image upload failed", [error.message]); // Forward error properly
    }
};

const deleteFile = async (filePublicId)=>{
    
    const result = await cloudinary.uploader.destroy(filePublicId,(result) => result);
    if(!result) throw new ApiError("402", "delete File is failed ")
    console.log("result :", result);
    return result
}

export {deleteFile}
export default cloudinaryUpload;
