const autoBind = require("auto-bind");
const { OptionModel } = require("../option/option.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const { PostModel } = require("./post.model");
const { PostMessage } = require("./post.message");
const { CategoryModel } = require("../category/category.model");

class PostService {
  #model;
  #optionModel;
  #categoryModel;
  constructor() {
    autoBind(this);
    this.#model = PostModel;
    this.#optionModel = OptionModel;
    this.#categoryModel = CategoryModel;
  }
  async getCategoryOptions(cateId) {
    return await this.#optionModel.find({ category: cateId });
  }
  async create(postDTO){
    await this.#model.create(postDTO);
  }
  async find(query={}){
    return this.#model.find(query);
  }
  async checkExist(postId){
    if(postId && !isValidObjectId(postId)) throw createHttpError.BadRequest(PostMessage.RequestNotValid);
    const post=await this.#model.findById(postId);
    if(!post) throw createHttpError.NotFound(PostMessage.NotFound);
    return post;
  }
  async remove(postId){
    const post=await this.checkExist(postId);
    const result=await this.#model.deleteOne({_id:post._id});
    if(result.deletedCount==0) throw createHttpError.InternalServerError();
  }
}
module.exports = {
  PostService: new PostService(),
};
