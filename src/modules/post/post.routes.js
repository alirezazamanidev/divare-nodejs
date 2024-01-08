const {Router} = require("express");
const {PostController} = require("./post.controller");

const Authorization = require("../../common/guard/authorization.guard");

const router = Router();
router.get('/create',PostController.createPostPage);
// router.post("/create", Authorization, upload.array("images", 10), postController.create);
// router.get("/my", Authorization, postController.findMyPosts);/
// router.delete("/delete/:id", Authorization, postController.rem/ove);
// router.get("/:id", postController.showPost);/
module.exports = {
    PostRouter: router
};