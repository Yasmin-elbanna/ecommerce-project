const { validationResult } = require('express-validator');
const ApiError=require('../errors/apierror')
const usermodel=require('../models/userSchema');
const bcrypt = require('bcrypt')


const adminAdd = async (req, res) => {
    const {username, email, firstname, lastname, fullname, password ,address,isAdmin} = req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    } 
        const newuser = new usermodel({
           username,
            email,
          firstname,
          lastname,
          fullname,
          password,
          address,
          isAdmin,
        });

        newuser.save().then((result) => {
          res.json({result});
        });      
  };

 const changepass=async (req,res,next)=>{
    const userId=req.params.id;
    const founduser=await usermodel.findByIdAndUpdate(userId,{ password: await bcrypt.hash(req.body.password, 15),
      passwordChangedAt: Date.now(),
    }, {new: true});
    if(!founduser){
      next(
        new ApiError("user not found")
      )
    }
 res.status(200).send("password update sucessfully")
 }



  const allusers=async (req, res, next) => {
    const finduser = await usermodel.find();
    res.send(finduser)
  };

const editone= async (req, res,next) => {
    const { id } = req.params;
    const { username,email,firstname,lastname,fullname,address,phoneNumber,isAdmin } = req.body;
    const updatproduct = await usermodel.findByIdAndUpdate(id,{username,email,firstname,lastname,fullname,address,phoneNumber,isAdmin} );
    res.status(200).send("updated user sucessfully")
    return next(
      new ApiError("user not found",404)
   );
  };

  const oneuser= async (req, res, next) => {
    const { id } = req.params;
    const finduser = await usermodel.findById(id);
    if (finduser) res.send(finduser);
   //console.log(finduser)
    return next(
       new ApiError("user not found",404)
    );
  };

  const adminDelete=async (req, res,next) => {
      const {id}=req.params;
      deleteduser=await usermodel.findByIdAndDelete(id);
      res.status(200).send("Deleted user sucessfully")
      return next(
      new ApiError("product not found",404)
);
  };

  module.exports={adminAdd,oneuser,adminDelete,editone,allusers,changepass}