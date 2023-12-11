const  mongoose  = require("mongoose");

const schema = mongoose.Schema({

cart:  {
    type: mongoose.Schema.ObjectId,
    ref: 'carts',
  },
  paymentMethod:{
    type:String
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'project-itis',
  },
},{ timestamps: true });

cartShema=mongoose.model('orders',schema);
module.exports=cartShema;