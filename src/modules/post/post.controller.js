const autoBind = require("auto-bind");
const { PostService } = require("./post.service");
const { CategoryModel } = require("../category/category.model");
const { removePropertyInObject } = require("../../common/utils/functions");
const { Types } = require("mongoose");
const { PostMessage } = require("./post.message");
const { getAddressDetail } = require("../../common/utils/http");

class PostController {
  #service;
  success_message;
  constructor() {
    autoBind(this);
    this.#service = PostService;
  }

  async createPostPage(req, res, next) {
    try {
      let { slug } = req.query;
      let showBack = false;
      let match = { parent: null };
      let options, category;
      if (slug) {
        slug = slug.trim();
        category = await CategoryModel.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(PostMessage.NotFound);
        options = await this.#service.getCategoryOptions(category._id);
        if (options.length === 0) options = null;
        showBack = true;
        match = {
          parent: category._id,
        };
      }
      const categories = await CategoryModel.aggregate([
        {
          $match: match,
        },
      ]);
      res.render("./pages/panel/create-post.ejs", {
        categories,
        showBack,
        category: category?._id.toString(),
        options,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const userId = req.user._id;
      const images = req?.files?.map((image) => image?.path?.slice(7));
      const {
        title_post: title,
        description: content,
        lat,
        lng,
        category,
        amount,
      } = req.body;
      const options = removePropertyInObject(req.body, [
        "amount",
        "title_post",
        "description",
        "lat",
        "lng",
        "category",
        "images",
      ]);

      const { address, province, city, district } = await getAddressDetail(
        lat,
        lng
      );
      await this.#service.create({
        userId,
        images,
        title,
        amount: Number(amount),
        content,
        coordinate: [lat, lng],
        category: new Types.ObjectId(category),
        options,
        address,
        province,
        city,
        district,
      });

      this.success_message = PostMessage.Created;
      return res.redirect("/post/my");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async findMyPosts(req, res, next) {
    try {
      const userId = req.user._id;
      const posts = await this.#service.find({userId});
      res.render("./pages/panel/posts.ejs", {
        posts,
        count: posts.length,
        success_message: this.success_message,
        error_message: null,
      });
      this.success_message = null;
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  PostController: new PostController(),
};
