const { OptionController } = require('./option.controller');

const router=require('express').Router();

router.post("/", OptionController.create)
router.get("/by-category/:categoryId", OptionController.findByCategoryId)
router.get("/by-category-slug/:slug", OptionController.findByCategorySlug)
router.get("/:id", OptionController.findById)
router.delete("/:id", OptionController.removeById)
router.get("/", OptionController.find)
router.put("/:id", OptionController.update)
module.exports={
    OptionRoutes:router
}