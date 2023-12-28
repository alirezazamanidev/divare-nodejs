const router=require('express').Router();
const {CategoryController}=require('./category.controller')
router.post('/add',CategoryController.create);
router.get('/list',CategoryController.find);
router.delete('/:cateId',CategoryController.remove);
module.exports={
    CategoryRoutes:router
}