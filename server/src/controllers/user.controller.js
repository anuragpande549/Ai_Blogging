import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cloudinaryUpload from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const accessAndRefreshTokenGenerate = async (user) =>{
    try {
        if(!user) throw new ApiError("user is not receive for generate access and refresh token");
        const accessToken = await user.generateAccessToken()
        const refreshToken =await user.generateRefreshToken()

        if(!accessToken || !refreshToken) throw new ApiError("token generate is not receive");

        user.refreshToken = refreshToken ;
        await user.save({ validateBeforeSave: false })
        return {accessToken, refreshToken};


    } catch (error) {
         throw new ApiError("access and refresh token is not generated")
    }
}

const userRegister = asyncHandler(async (req, res) => {

        const { name, email, phoneNumber, profileImage, password, confirmPassword } = req.body;

        if ([name, email, phoneNumber, profileImage, password, confirmPassword].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required.");
        }

        // Check if user already exists
        const existedUser = await User.findOne({ $or: [{ phoneNumber }, { email }] });
        if (existedUser) throw new ApiError(400, "User already exists.");


        // Validate avatar upload
        const avatarLocalPath = req.files?.avatar?.[0]?.path;
        if (!avatarLocalPath) throw new ApiError(400, "Avatar file is missing.");

        const avatarUpload = await cloudinaryUpload(avatarLocalPath);
        if (!avatarUpload) throw new ApiError(400, "Avatar image upload failed.");

        // Create user
        const user = await User.create({
            name: name.toLowerCase(),
            email: email.trim().toLowerCase(),
            phoneNumber: phoneNumber.trim(),
            password,
            avatar: avatarUpload.url,
        });

        if (!user) throw new ApiError(400, "User creation failed.");

        const createUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createUser) throw new ApiError(400, "User retrieval failed.");

        return res.status(201).json(new ApiResponse(201, "User created successfully.", { createUser }));

});

const userLogIn = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const { email , password } = req.body
    if([email, password].some((value)=>value?.trim()==="")) throw new ApiError(402 , "All filed is required");

    const user = await User.findOne({
        $or:[{email}]
    })
    if (!user) throw new ApiError(404, "User not found");

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if (!isPasswordCorrect) throw new ApiError(400, "password is not match ");

    const { accessToken, refreshToken } = await accessAndRefreshTokenGenerate(user);
    if (!accessToken || !refreshToken) throw new ApiError(500, "Token generation failed");

    const logInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        // secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    return res.cookie("accessToken",accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user:logInUser, accessToken, refreshToken
            },
            "user LogIn successful"
            ,
            {success : true}
        )
    )

})


const userLogOut = asyncHandler(async (req, res) => {
    console.log("user ")
    const userId = req?.user?._id;
    if (!userId) throw new ApiError(400, "user is is not receive");

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $unset: { refreshToken: "" }
        },
        {
            new: true
        }
    );


    console.log("refreshToken :",updatedUser.refreshToken);
    if(!(updatedUser.refreshToken === undefined)) throw new ApiError(400 ,"refresh Token update failed ");

    const options = {
        httpOnly: true,
        // secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    return res
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logout successful"));


})

const createAccessToken = asyncHandler(async (req, res) =>{

    const token = req?.cookies?.refreshToken || req?.header('Authorization').replace("bearer ", "");
    if(!token) throw new ApiError(400, "access token is not receive");
    // console.log("token :" , token);

    const userId = await jwt.verify(token , process.env.REFRESH_TOKEN);
    // console.log("userId :" , userId);

    if (!userId) throw new ApiError(401, "user id is not receive");

    const user = await User.findById(userId._id);
    if (!user) throw new ApiError("user is not present");

    if (!(token === user.refreshToken)) throw new ApiError(401, "Access token is not match");

    console.log({
        expiresAt: user.expiresAt,
        timestamp: user.expiresAt?.getTime(),
        now: Date.now()
    });
    if (!(user.expiresAt instanceof Date) || user.expiresAt.getTime() < Date.now()) {
        throw new ApiError(401, "Access token has expired");
    }

    const accessToken = await user.generateAccessToken();
    if(!accessToken) throw new ApiError(401, "access token is not generated");

        const options = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 7 days
    };

    return res.cookie("accessToken", accessToken, options).json(
        new ApiResponse(200, "token generated successful")
    )


})




export { userRegister,userLogIn, userLogOut, createAccessToken };
