const autoBind=require('auto-bind');
const { UserModel } = require('../user/user.model');
const {randomInt}=require('crypto');
const createHttpError = require('http-errors');
const { AuthMessage } = require('./auth.message');
const Jwt=require('jsonwebtoken');
class AuthService {
    #model;
    constructor(){
        autoBind(this);
        this.#model=UserModel;
    }

    async sendOtp(mobile){
        const user=await this.#model.findOne({mobile});
        const now=new Date().getTime();
        const otp={
            code:randomInt(10000,99999),
            expiresIn:now +(1000*60*2)
        }
        if(!user) {
            const newUser=await this.#model.create({mobile,otp});
            return newUser;
        }إ
        if(user.otp &&user.otp.expiresIn >now) throw createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired);
        user.otp=otp;
        await user.save();
        return user;
    }
    async checkOtp(mobile,code){
        const user=await this.checkExistByMobile(mobile);
        const now=new Date().getTime();
        if(user?.otp?.expiresIn <now) throw createHttpError.BadRequest(AuthMessage.OtpCodeExpired);
        if(user.otp.code!==code) throw createHttpError.BadRequest(AuthMessage.OtpCodeIsIncorrect);
        if(!user.verifiedMobile) user.verifiedMobile=true;
        const accessToken=await this.signToken({mobile,id:user?._id});
        return accessToken;
    }
    async checkExistByMobile(mobile){
        const user=await this.#model.findOne({mobile});
        if(!user) throw createHttpError.NotFound(AuthMessage.NotFound);
        return user;
    }
    async signToken(payload){
        return Jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'1y'});
    }
}

module.exports={
    AuthService:new AuthService()
}