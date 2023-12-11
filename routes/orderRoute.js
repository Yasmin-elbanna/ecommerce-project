const {addorder,allorders,myorder,cancelorder}=require('../controller/orderController')
const express = require("express");
const router = express.Router();
const{authorized,adminauthorized}=require('../authorization/middleware')

router.post('/add',authorized,addorder)
router.get('/getall',authorized,adminauthorized,allorders)
router.get('/myorder',authorized,myorder)
router.delete('/cancel/:id',authorized,cancelorder)


module.exports = router;
