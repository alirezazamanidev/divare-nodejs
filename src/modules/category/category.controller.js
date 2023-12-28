const autoBind=require('auto-bind');
const {StatusCodes:HttpStatus}=require('http-status-codes')

const { CategoryService } = require('./category.service');
const CategoryMessage = require('./category.message');
class CategoryController {

    #service;
    constructor(){
      autoBind(this);
      this.#service=CategoryService;
    }
    async find(req,res,next){
      try {
        return res.status(HttpStatus.OK).json({
          categories:await this.#service.find()
        })
      } catch (error) {
        next(error);
      }
    }

    async create(req,res,next){
      try {
        const {name, icon, slug, parent} = req.body;
        await this.#service.create({name, icon, slug, parent})
        return res.status(HttpStatus.CREATED).json({
            message: CategoryMessage.Created
        })
      } catch (error) {
        next(error);
      }
    }
}

module.exports={
    CategoryController:new CategoryController()
}