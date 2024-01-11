const {Router} = require("express");
const {PostController} = require("./post.controller");

const Authorization = require("../../common/guard/authorization.guard");
const { upload } = require("../../common/utils/multer");

const router = Router();
router.get('/create',Authorization,PostController.createPostPage);
router.post('/create',Authorization,upload.array('images',10),PostController.create);
router.get('/my',Authorization,PostController.findMyPosts);
router.delete('/delete/:id',Authorization,PostController.remove);
router.get('/:id',PostController.showPost);
module.exports = {
    PostRouter: router
};