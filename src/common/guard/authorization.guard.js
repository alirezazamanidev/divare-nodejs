const createHttpError = require("http-errors");
const AuthorizationMessage = require("../messages/auth.message");
const Jwt=require('jsonwebtoken');
const { UserModel } = require("../../modules/user/user.model");
const Authorization=async (req,res,next)=>{
    try {
        const token=req?.cookies?.access_token;
        if(!token) throw createHttpError.Unauthorized(AuthorizationMessage.Login);
        const data=Jwt.verify(token,process.env,JWT_SECRET_KEY);
        if(typeof data==='object' &&'id' in data){
            const user=await UserModel.findById(data.id,{otp:0,__v:0,updatedAt:0,verifiedMobile:0}).lean();
            if(!user) throw createHttpError.Unauthorized(AuthorizationMessage.NotFoundAccount);
            req.user=user;
            return next();
        }
        throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken);
    } catch (error) {
        next(error);
    }
}

module.exports=Authorization;