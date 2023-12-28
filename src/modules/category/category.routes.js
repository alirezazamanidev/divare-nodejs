const router=require('express').Router();
const {CategoryController}=require('./category.controller')
router.post('/add',CategoryController.create);
router.get('/list',CategoryController.find);
module.exports={
    CategoryRoutes:router
}