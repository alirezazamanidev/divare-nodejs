const autoBind = require("auto-bind");
const authService = require("./auth.service");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }
  async sendOtp(req,res,next){
    try {
        
    } catch (error) {
        next(error);
    }
  }
}

module.exports = {
  AuthController: new AuthController(),
};
