const {cartAdd,allcarts,mycart,clearcart,clearitem,updatequantiity}=require('../controller/cartController')
const express = require("express");
const router = express.Router();
const{authorized,adminauthorized}=require('../authorization/middleware')

router.post('/add',authorized,cartAdd)
router.get('/getall',authorized,adminauthorized,allcarts)
router.get('/mycart',authorized,mycart)
router.delete('/clearcart/:id',authorized,adminauthorized,clearcart)
router.delete('/clearitem/:itemId',authorized,clearitem)
router.patch('/updatequantity/:itemId',authorized,updatequantiity)

module.exports = router;
