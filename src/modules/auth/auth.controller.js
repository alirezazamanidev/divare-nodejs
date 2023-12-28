const autoBind = require("auto-bind");
const {AuthService}=require('./auth.service');
const { AuthMessage } = require("./auth.message");
const {StatusCodes:HttpStatus}=require('http-status-codes')

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = AuthService;
  }
  async sendOtp(req,res,next){
    try {
      const {mobile} = req.body;
      await this.#service.sendOtp(mobile);
      return res.json({
          message: AuthMessage.SendOtpSuccessfully
      });
    } catch (error) {
        next(error);
    }
  }
  async checkOtp(req,res,next){
    try {
      const {code,mobile}=req.body;
      const token = await this.#service.checkOtp(mobile, code);
      return res.cookie(CookieNames.AccessToken, token, {
          httpOnly: true,
          secure: false 
      }).status(HttpStatus.OK).json({
          message: AuthMessage.LoginSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AuthController: new AuthController(),
};
