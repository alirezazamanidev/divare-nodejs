const {Router} = require("express");
const {PostController} = require("./post.controller");

const Authorization = require("../../common/guard/authorization.guard");

const router = Router();
router.get('/create',PostController.createPostPage);
router.post('/create',PostController.create);

module.exports = {
    PostRouter: router
};