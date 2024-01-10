const {Router} = require("express");
const {PostController} = require("./post.controller");

const Authorization = require("../../common/guard/authorization.guard");
const { upload } = require("../../common/utils/multer");

const router = Router();
router.get('/create',PostController.createPostPage);
router.post('/create',upload.array('images',10),PostController.create);

module.exports = {
    PostRouter: router
};