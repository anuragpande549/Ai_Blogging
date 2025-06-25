import Router from "express"
import upload from "../middleware/multer.js";
import { userRegister, userLogIn, userLogOut,createAccessToken } from "../controllers/user.controller.js";
import authUser from "../middleware/auth.js";

const userRoutes = Router();

// userRoutes.route("/register").post(upload.fields([
//     { name: "avatar", maxCount: 1 }
// ])
// ,userRegister)
userRoutes.route("/register").post(userRegister)

userRoutes.route("/logIn").post(userLogIn)
userRoutes.route("/logOut").post(authUser,userLogOut)
userRoutes.route("/access-token").post(createAccessToken);


export default userRoutes;