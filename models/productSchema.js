const  mongoose  = require("mongoose");
const bcrypt = require('bcrypt')

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instock:{
       type:Number,
       required:true
    }
   
});
productShema=mongoose.model('products',schema);
module.exports=productShema;