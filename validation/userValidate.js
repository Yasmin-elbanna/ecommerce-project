const {check}=require("express-validator")
const User=require('../models/userSchema')

const signupValidate=[check('username').notEmpty().withMessage("please entre your username").isLength({min:4}).withMessage("Invalid username").custom((val)=>User.findOne({username:val}).then((user)=>{
    if(user){
       return Promise.reject(new Error('username is already exist'))
    }
  })),
    check('email').notEmpty().withMessage("please entre your email").isEmail().withMessage("Invalid email").custom(async (value, req) => {
      try {
       const user = await User.findOne({email: value})
       if (user) {
        return Promise.reject('User is already exist')
       }
      } catch (e) {
       console.log(e);
      }
     }),
    check('firstname').notEmpty().withMessage("please entre your first name").isAlpha().withMessage("Invalid firstname"),
    check('lastname').notEmpty().withMessage("please entre your last name").isAlpha().withMessage("Invalid lastname"),
    check('fullname').notEmpty().withMessage("please entre your full name").isAlpha().withMessage("Invalid fullname"),
    check('address').notEmpty().withMessage("please entre your address").isAlpha().withMessage("Invalid address"),
    check('phoneNumber').notEmpty().withMessage("please entre your phone number").isNumeric().withMessage("Not valid phone number").matches(/^01[0125][0-9]{8}$/).withMessage("Not valid phone number")
    ,check('password').notEmpty().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,15}$/).withMessage("Invalid password")];


const loginValidate=[check('email').notEmpty().withMessage('please entre  your email').isEmail().withMessage('Invalid email'),
check('password').notEmpty().withMessage("Please entre your password")];
module.exports={signupValidate,loginValidate}
    