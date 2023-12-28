const {AuthRoutes} = require('./modules/auth/auth.routes');
const { CategoryRoutes } = require('./modules/category/category.routes');
const router=require('express').Router();


router.use('/auth',AuthRoutes);
router.use('/category',CategoryRoutes);

router.get("/", (req, res) => {
    // res.locals.layout = "./layouts/website/main.ejs";
    res.render("./layouts/website/main.ejs");
});
// router.get('/',(req,res)=>{
//     res.render('./layouts/panel/main.ejs');
// })

// router.get("/panel", (req, res) => {
//     res.locals.layout = "./layouts/panel/main.ejs";
//     res.render("./pages/panel/dashboard.ejs");
// });
module.exports={
    MainRoutes:router
}