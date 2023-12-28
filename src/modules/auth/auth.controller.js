const autoBind=require('auto-bind');

class AuthController {
    #service
    constructor(){
        autoBind(this);
}
}


module.exports={
    AuthController:new AuthController()
}