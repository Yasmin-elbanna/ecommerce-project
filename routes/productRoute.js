const {addproduct,editone,allproducts,oneproduct,deletprodect}=require('../controller/productController')
const express = require("express");
const router = express.Router();
const{authorized,adminauthorized}=require('../authorization/middleware')
const addproductValidation=require('../validation/productValidate')

router.post('/add',addproductValidation,authorized,adminauthorized,addproduct)
router.get('/getall',allproducts)
router.get('/getone/:id',oneproduct)
router.patch('/edit/:id',authorized,adminauthorized,editone)
router.delete('/delete/:id',authorized,adminauthorized,deletprodect)

module.exports = router;
