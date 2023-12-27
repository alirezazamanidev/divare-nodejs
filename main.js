
const express=require('express');
const {config}=require('dotenv');
const cookieParser=require('cookie-parser');
const { MainRoutes } = require('./src/app.routes');
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

    app.listen(Port,()=>{
        console.log(`Server running at port ${Port}`);
    });
}

main();