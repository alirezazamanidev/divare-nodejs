const {AuthRoutes} = require('./modules/auth/auth.routes');
const { CategoryRoutes } = require('./modules/category/category.routes');
const { OptionRoutes } = require('./modules/option/option.routes');
const { PostRouter } = require('./modules/post/post.routes');
const { UserRoutes } = require('./modules/user/user.routes');
const router=require('express').Router();


router.use('/auth',AuthRoutes);
router.use('/user',UserRoutes);
router.use('/category',CategoryRoutes);
router.use('/option',OptionRoutes);
// router.use('/post',PostRouter);

router.get("/panel",(req,res)=>{
    res.render('./pages/panel/dashboard.ejs')
})
router.get("/",(req,res)=>{
    res.locals.layout='./layouts/website/main.ejs'
    res.render('./pages/home/index.ejs')
})
module.exports={
    MainRoutes:router
}

