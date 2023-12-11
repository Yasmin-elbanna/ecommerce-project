require('./db')
require('express-async-errors')

const express=require('express')
const publicerror=require('./errors/errors')
const app=express()
const env=require("dotenv")
const helmet=require("helmet")
const morgan=require("morgan")
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const ApiError=require('./errors/apierror')
const adminRoute=require('./routes/adminRoute')
const cartRoute=require('./routes/cartRoute')
const orderRoute=require('./routes/orderRoute')
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(helmet())
env.config({path:'config.env'}) //path file config.env , if name the file is (.env) only this line not required
app.use(["/user"], userRoute);
app.use(["/product"], productRoute);
app.use(["/admin"], adminRoute);
app.use(["/cart"], cartRoute);
app.use(['/order'],orderRoute)


if(app.get('env')==='development'){
    app.use(morgan('tiny'))
}


//api error handling 
app.all('*',(req,res,next)=>{
//const err=new Error(`can't find this route:${req.originalUrl}`);
//next(err.message)      //return to next middleware
next(new ApiError("can't find this route",400))  
})


//global error handling middlewer 
app.use(publicerror)


const PORT=process.env.PORT 
app.listen(PORT,()=>{
    console.log("server running...")
})