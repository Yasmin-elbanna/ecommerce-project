const {adminAdd,oneuser,adminDelete,allusers,editone,changepass}=require('../controller/adminController')
const express = require("express");
const router = express.Router();
const {signupValidate}=require('../validation/userValidate')
const{authorized,adminauthorized}=require('../authorization/middleware')



router.post('/add',signupValidate,authorized,adminauthorized,adminAdd)
router.get('/getone/:id',authorized,adminauthorized,oneuser)
router.get('/getall',authorized,adminauthorized,allusers)
router.delete('/delete/:id',authorized,adminauthorized,adminDelete)
router.patch('/update/:id',authorized,adminauthorized,editone)
router.patch('/updatepass/:id',authorized,changepass)




module.exports = router;
