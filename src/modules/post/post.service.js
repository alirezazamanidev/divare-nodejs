const autoBind = require("auto-bind");
const OptionModel = require("../option/option.model");
const {isValidObjectId, Types} = require("mongoose");
const createHttpError = require("http-errors");
const {PostModel} = require("./post.model");
const {PostMessage} = require("./post.message");
const {CategoryModel} = require("../category/category.model");

class PostService {
    #model;
    #optionModel;
    #categoryModel;
    constructor () {
        autoBind(this);
        this.#model = PostModel;
        this.#optionModel = OptionModel;
        this.#categoryModel = CategoryModel;
    }



}
module.exports = {
    PostService:new PostService()
}