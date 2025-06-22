import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from"jsonwebtoken"

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    password : {
        type: String,
        required:[true, "password is required"],
    },
    avatar:{
        type:String,
        required:true
    },
    name:{
        type:String,
        lowercase:true,
    },
    phoneNumber:{
        type:Number,
        require:true
    },
    blogs :[
        {
            type: mongoose.Schema.ObjectId,
            ref: "blog"
        }
    ],
    refreshToken: {
        type: String,
    },
    expiresAt: {
        type:Date,
        default: () => new Date(Date.now() + 10 * 24 * 60* 60 * 1000 )
    }
},{timestamps:true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password") ) return next();
    this.password = await bcrypt.hash(this.password, 11 );
    next();
} );

userSchema.pre("save", function (next) {
  if (this.isModified("refreshToken")) {

    this.expiresAt = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
    // console.log("update is done")
    next();
  }
  next();
});


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function (){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN
        ,{
            expiresIn : process.env.ACCESS_EXPIRE
        }
    )
}


userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id : this._id
        },
        
         process.env.REFRESH_TOKEN
        ,
        {
            expiresIn:process.env.REFRESH_EXPIRE
        }
    )
}

const User = mongoose.model("user", userSchema, ); 

export default User