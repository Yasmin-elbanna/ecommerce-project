const {check}=require("express-validator")

const addproductValidate=[check('name').notEmpty().withMessage("product name required"),
    check('price').notEmpty().withMessage("product price required"),
    check('description').notEmpty().withMessage("product description required")];



module.exports=addproductValidate
    