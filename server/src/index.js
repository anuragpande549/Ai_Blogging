import { app } from "./app.js";
import dotenv from "dotenv"
import connectDb from "./db/mongoDB.js";

dotenv.config({
    path:"./env"
})


connectDb().then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`⚙️ Server is running at port : ${process.env.PORT || 8000}`);
    })
}).catch((error)=>{
    console.log("server connection error :" , error);
})