const autoBind = require("auto-bind");
const {AuthService}=require('./auth.service');
const { AuthMessage } = require("./auth.message");

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
}

module.exports = {
  AuthController: new AuthController(),
};
