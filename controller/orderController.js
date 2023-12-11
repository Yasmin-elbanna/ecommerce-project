const ApiError=require('../errors/apierror')
const cartmodel=require('../models/cartSchema')
const productmodel=require('../models/productSchema')
const ordermodel=require('../models/orderSchema')
const { path } = require('@hapi/joi/lib/errors')



const addorder = async (req, res,nxt) => {
   
    const user = req.user._id
    const {cart}=req.body;
 const neworder = new ordermodel({
    
    cart,
    user
    
 });
  neworder.save()
  await cartmodel.findOneAndDelete(cart);

  res.status(200).json({message:"Order Successfully"})
  
}

  const allorders=async (req, res, next) => {
    const orders=await ordermodel.find({})
    .populate("user").populate('cart')
    //console.log(cartmodel.findOne({user:req.user}))
    if(!orders)  next(new ApiError("Not Found orders",401))
    res.status(200).json({orders})
  };



  const myorder= async (req, res, next) => {
    const user = req.user._id
    const findorder = await ordermodel.findOne({user:user});
    if (findorder) res.send(findorder);
  // console.log(findcart)
    return next(
       new ApiError("order not found",404)
    );
  };

const cancelorder=async(req,res,nxt)=>{
  const {id}=req.params
  await ordermodel.findOneAndDelete(id);
  res.status(200).send("order deleted sucessfully");
}


module.exports={addorder,allorders,myorder,cancelorder}