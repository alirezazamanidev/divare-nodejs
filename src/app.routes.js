const authRoutes = require('./modules/auth/auth.routes');
const router=require('express').Router();


router.use('/auth',authRoutes);
module.exports={
    MainRoutes:router
}