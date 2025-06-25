import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import fs from "fs";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}))

app.use(express.json({ limit: "4.5mb" }));
app.use(express.urlencoded({ extended: true, limit: "4.5mb" }));
app.use(cookieParser());
app.use(express.static("public"))

import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import comment from "./routes/comment.routes.js";

app.use("/user",userRoutes)
app.use("/blogs",blogRoutes)
app.use("/comment",comment)

app.use((err, req, res, next) => {

    //garbage remove
    const avatarLocalPath = req.files?.avatar?.[0]?.path;    
    if( avatarLocalPath && (req?.originalUrl === '/user/register')){
        fs.unlinkSync(avatarLocalPath);
        console.log("file remove success", avatarLocalPath)
    }

    //errors 
    const statusCode = err.statusCode || 500;
    
    console.error("🚨 ERROR:", {
        message: err?.message || "Internal Server Error",
        stack: err?.stack || "No stack trace",
        route: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
    });
    res.status(statusCode).json({
        message: err?.message || "Internal Server Error",
        stack: err?.stack || "No stack trace",
        route: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
        success: false,
        errors: err.errors || [],
        suggestedFix: err.suggestedFix || "Try again later.",
    });
})


export {app}