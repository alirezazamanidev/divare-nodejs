const autoBind=require('auto-bind');
class UserController {
    constructor(){
        autoBind(this);
    }
    async whoiam(req,res,next){
        try {
            const user = req.user;
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports={
    UserController:new UserController()
}