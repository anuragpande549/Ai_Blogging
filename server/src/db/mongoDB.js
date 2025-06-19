import mongoose from "mongoose"


const mongodbURL = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

const connectDb = async () =>{
    try {
        const db = await mongoose.connect(`${mongodbURL}/${dbName}` )
        // console.log("connect db :", db);
    } catch (error) {
        console.log(" mongodb connection error :", error.message);
        process.exit(1)
    }
}

export default connectDb;