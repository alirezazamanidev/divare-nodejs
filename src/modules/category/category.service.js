const autoBind = require("auto-bind");
const { CategoryModel } = require("./category.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");

const slugify=require('slugify');
class CategoryService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
  }
  async create(categoryDTO) {
    if (categoryDTO?.psrent && isValidObjectId(categoryDTO.parent)) {
        const existCategory=await this.checkExistById(categoryDTO.parent);
        categoryDTO.parent=existCategory._id;
        categoryDTO.parents = [
            ... new Set(
                ([existCategory._id.toString()].concat(
                    existCategory.parents.map(id => id.toString())
                )).map(id => new Types.ObjectId(id))
            )
        ]
    }
    if(categoryDTO?.slug){
        categoryDTO.slug=slugify(categoryDTO);
        await this.alreadyExistBySlug(categoryDTO.slug);
    }else{
        categoryDTO.slug = slugify(categoryDTO.name)
    }
    const category=await this.#model.create(categoryDTO);
    return category;
  }
  async checkExistById(id) {
    const category = await this.#model.findById(id);
    if (!category) throw createHttpError.NotFound(CategoryMessage.NotFound);
    return category;
  }
  async alreadyExistBySlug(slug) {
    const category = await this.#model.findOne({slug});
    if(category) throw new createHttpError.Conflict(CategoryMessage.AlreadyExist);
    return null;
}
}

module.exports = {
  CategoryService: new CategoryService(),
};
