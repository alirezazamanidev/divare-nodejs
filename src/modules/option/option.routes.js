const { OptionController } = require('./option.controller');

const router=require('express').Router();

router.post('/add',OptionController.create);

module.exports={
    OptionRoutes:router
}