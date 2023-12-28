const Authorization = require('../../common/guard/authorization.guard');
const { UserController } = require('./user.controller');

const router=require('express').Router();

router.get('/whoiam',Authorization,UserController.whoiam);
module.exports={
    UserRoutes:router
}