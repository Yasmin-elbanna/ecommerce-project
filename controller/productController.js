
const productmodel=require('../models/productSchema')
const ApiError=require('../errors/apierror')
const { validationResult } = require('express-validator');

const oneproduct= async (req, res, next) => {
    const { id } = req.params;
    const findproduct = await productmodel.findById(id);
    if (findproduct) res.send(findproduct);
    return next(
       new ApiError("product not found",404)
    );
  };

 const addproduct= (req, res) => {
  const { name, price,description,instock } = req.body;
  const errors=validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
  }
  const newproduct =  new productmodel({
    name,
    price,
    description,
    instock
  });
  newproduct.save() 
  res.status(200).send(newproduct)
};
const allproducts=async (req, res, next) => {
    const findproduct = await productmodel.find();
    res.send(findproduct)
  };
const editone= async (req, res,next) => {
    const { id } = req.params;
    const { name, price,description,instock } = req.body;
    const updatproduct = await productmodel.findByIdAndUpdate(id,{name, price,description,instock} );
    res.status(200).send("updated product sucessfully")
    return next(
      new ApiError("product not found",404)
   );
  };
 const deletprodect=async (req, res,next) => {
    const { id } = req.params;
  
    const deleteproduct = await productmodel.findByIdAndDelete(id);
    res.status(200).send("Deleted product sucessfully")
    return next(
      new ApiError("product not found",404)
   );
  };
  module.exports={addproduct,editone,deletprodect,allproducts,oneproduct}