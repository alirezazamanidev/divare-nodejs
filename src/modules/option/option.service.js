const autoBind = require("auto-bind");
const { OptionModel } = require("./option.model");
const slugify = require("slugify");
const { CategoryService } = require("./../category/category.service");
const createHttpError = require("http-errors");
const { OptionMessage } = require("./option.message");
const { isFalse, isTrue } = require("./../../common/utils/functions");
const { isValidObjectId } = require("mongoose");
class OptionService {
  #model;
  #categoryServie;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryServie = CategoryService;
  }
  async create(optionDto) {
    const category = await this.#categoryServie.checkExistById(
      optionDto.category
    );
    optionDto.category = category._id;
    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: "_",
      lower: true,
    });
    await this.alreadyExistByCategoryAndKey(optionDto.key, category._id);
    if (optionDto?.enum && typeof optionDto.enum === "string") {
      optionDto.enum = optionDto.enum.split(",");
    } else if (!Array.isArray(optionDto.enum)) optionDto.enum = [];
    if (isTrue(optionDto?.required)) optionDto.required = true;
    if (isFalse(optionDto?.required)) optionDto.required = false;
    const option = await this.#model.create(optionDto);
    return option;
  }
  async update(id, optionDto) {
    const existOption = await this.checkExistById(id);
    if (optionDto?.category && isValidObjectId(optionDto.category)) {
      const category = await this.#categoryServie.checkExistById(
        optionDto.category
      );
      optionDto.category = category._id;
    } else {
      delete optionDto.category;
    }
    if (optionDto.slug) {
      optionDto.key = slugify(optionDto.key, {
        trim: true,
        replacement: "_",
        lower: true,
      });
      let categoryId = existOption.category;
      await this.alreadyExistByCategoryAndKey(optionDto.key, categoryId, id);
    }
    if (optionDto?.enum && typeof optionDto.enum === "string") {
      optionDto.enum = optionDto.enum.split(",");
    } else if (!Array.isArray(optionDto.enum)) delete optionDto.enum;
    {
      if (isTrue(optionDto?.required)) {
        optionDto.required = true;
      } else if (isFalse(optionDto?.required)) optionDto.required = false;
      else delete optionDto?.required;
      const updateResult= await this.#model.updateOne({_id:id},{$set:optionDto});
      if(updateResult.modifiedCount==0) throw createHttpError.InternalServerError();

      
    }
  }

  async findById(id) {
    return await this.checkExistById(id)
}
async removeById(id) {
    await this.checkExistById(id);
    return await this.#model.deleteOne({_id: id});
}
async findByCategoryId(category) {
    return await this.#model.find({category}, {__v: 0}).populate([{path: "category", select: {name: 1, slug: 1}}]);
}
async findByCategorySlug(slug) {
    const options = await this.#model.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $addFields: {
                categorySlug: "$category.slug",
                categoryName: "$category.name",
                categoryIcon: "$category.icon",
            }
        },
        {
            $project: {
                category: 0,
                __v: 0
            }
        },
        {
            $match: {
                categorySlug: slug
            }
        }
    ]);
    return options;
}
 
  async checkExistById(id) {
    const option = await this.#model.findById(id);
    if (!option) throw new createHttpError.NotFound(OptionMessage.NotFound);
    return option;
  }
  async alreadyExistByCategoryAndKey(key, category, exceptionId = null) {
    const isExist = await this.#model.findOne({
      category,
      key,
      _id: { $ne: exceptionId },
    });
    if (isExist) throw createHttpError.Conflict(OptionMessage.AlreadyExist);
    return null;
  }
}

module.exports = {
  OptionService: new OptionService(),
};
