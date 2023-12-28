const router=require('express').Router();
const {CategoryController}=require('./category.controller')
router.post('/add',CategoryController.create);

module.exports={
    CategoryRoutes:router
}