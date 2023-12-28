const {AuthRoutes} = require('./modules/auth/auth.routes');
const { CategoryRoutes } = require('./modules/category/category.routes');
const { OptionRoutes } = require('./modules/option/option.routes');
const { UserRoutes } = require('./modules/user/user.routes');
const router=require('express').Router();


router.use('/auth',AuthRoutes);
router.use('/user',UserRoutes);
router.use('/category',CategoryRoutes);
router.use('/option',OptionRoutes);authorization.guard
module.exports={
    MainRoutes:router
}