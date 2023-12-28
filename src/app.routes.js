const {AuthRoutes} = require('./modules/auth/auth.routes');
const { CategoryRoutes } = require('./modules/category/category.routes');
const router=require('express').Router();


router.use('/auth',AuthRoutes);
router.use('/category',CategoryRoutes);
module.exports={
    MainRoutes:router
}