import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authUser = asyncHandler(async(req, _, next)=>{
try {
        //Get cookies form the request
        console.log("user req :" , req.cookies)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if(!token) throw new ApiError(400, "cookie is not receive")

        // verify cookies and store in user
        const decryptToken = jwt.verify(token, process.env.ACCESS_TOKEN);
        
        const user = await User.findById(decryptToken?._id).select("-password -refreshToken");
        if(!user) throw new ApiError(401, "Access token is invalid");


        req.user = user;

        next()
} catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
}
})

export default authUser