const asyncHandler =require('express-async-handler')
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')


const protect =asyncHandler(
   async (req,res,next)=>{
        const bearer=req.headers.authorization;
        if(!bearer){
            res.status(401);
            throw new Error("user not authorized");
        }

        const [,token]=bearer.split(' ')

        if(!token){
            res.status(401);
            throw new Error("invalid token")
        }

        try{
            const user=jwt.verify(token,process.env.JWT_SECRET);
            console.log(user)
            req.user=await User.findById(user.id).select("-password");
            next();
        }catch(e){
            console.error(e)
            res.status(401);
            throw new Error("invalid token")
        }
    }
)

module.exports={protect}