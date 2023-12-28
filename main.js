
const express=require('express');
const {config}=require('dotenv');
const cookieParser=require('cookie-parser');
const { MainRoutes } = require('./src/app.routes');
const NotFoundHandler = require('./src/common/exception/not-found.handler');
const AllExceptionHandler = require('./src/common/exception/all-exception.handler');
const SwaggerConfig = require('./src/config/swagger.config');
config();
async function main(){
    const app=express();
    const Port=process.env.PORT;
    // config mongoDB
    require('./src/config/mongoose.config');
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(MainRoutes);
    // swagger config
    SwaggerConfig(app);
    NotFoundHandler(app);
    AllExceptionHandler(app);

    app.listen(Port,()=>{
        console.log(`Server running at port ${Port}`);
    });
}

main();