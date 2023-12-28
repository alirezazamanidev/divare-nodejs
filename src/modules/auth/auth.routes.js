const { AuthController } = require('./auth.controller');

const router=require('express').Router();

router.post('/send-otp',AuthController.sendOtp);
router.post('/check-otp',AuthController.checkOtp);
module.exports={
    AuthRoutes:router
}