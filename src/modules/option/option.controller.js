const autoBind=require('auto-bind');
const { OptionService } = require('./option.service');
const {StatusCodes:HttpStatus}=require('http-status-codes');
const { OptionMessage } = require('./option.message');

class OptionController {
    #service;
    constructor(){
        autoBind(this);
        this.#service=OptionService;
    }
    async create(req,res,next){
        try {
            const {title, key, guid, enum: list, type, category, required} = req.body;
            await this.#service.create({title, key, guid, enum: list, type, category, required})
            return res.status(HttpStatus.CREATED).json({
                message: OptionMessage.Created
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports={
    OptionController:new OptionController()
}