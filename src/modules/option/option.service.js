const autoBind=require('auto-bind');
const { OptionModel } = require('./option.model');
const slugify=require('slugify');
const {CategoryService}=require('./../category/category.service');
const createHttpError = require('http-errors');
const { OptionMessage } = require('./option.message');
const {isFalse,isTrue}=require('./../../common/utils/functions')
class OptionService {
    #model;
    #categoryServie;
    constructor(){
        autoBind(this);
        this.#model=OptionModel;
        this.#categoryServie=CategoryService;
    }

    async create(optionDto){
        const category=await this.#categoryServie.checkExistById(optionDto.category);
        optionDto.category=category._id;
        optionDto.key=slugify(optionDto.key,{trim:true,replacement:'_',lower:true});
        await this.alreadyExistByCategoryAndKey(optionDto.key,category._id)
        if(optionDto?.enum && typeof optionDto.enum ==='string'){
            optionDto.enum=optionDto.enum.split(',');
        }
        else if(!Array.isArray(optionDto.enum)) optionDto.enum=[];
        if(isTrue(optionDto?.required))
            optionDto.required=true;
        if(isFalse(optionDto?.required))
           optionDto.required=false;
        const option=await this.#model.create(optionDto);
        return option;
    }
    async alreadyExistByCategoryAndKey(key,category,exceptionId=null){
        const isExist=await this.#model.findOne({category,key,_id:{$ne:exceptionId}});
        if(isExist) throw createHttpError.Conflict(OptionMessage.AlreadyExist);
        return null;
    }
}

module.exports={
    OptionService:new OptionService()
}