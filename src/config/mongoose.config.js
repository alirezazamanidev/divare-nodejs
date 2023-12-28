const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const Uri=process.env.MONGO_URI;
mongoose.connect(Uri)
.then(()=>console.log('Conected to mongoDb!'))
// .catch((err)=>console.log(err.message));