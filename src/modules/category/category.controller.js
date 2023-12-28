const autoBind=require('auto-bind');
const {StatusCodes:HttpStatus}=require('http-status-codes')

const { CategoryService } = require('./category.service');
class CategoryController {

    #service;
    constructor(){
      autoBind(this);
      this.#service=CategoryService;
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