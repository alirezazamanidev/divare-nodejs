const autoBind=require('auto-bind');
class AuthService {

    #model;
    constructor(){
        autoBind(this);
    }
}

module.exports={
    AuthService:new AuthService()
}