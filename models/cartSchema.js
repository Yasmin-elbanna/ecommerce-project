const  mongoose  = require("mongoose");

const schema = mongoose.Schema({


    cartItems: [
        {
          product: {
            type: mongoose.Schema.ObjectId,
            ref: 'products',
          },
          quantity: {
            type: Number,
            default: 1,
          },
         
          price: Number,
        },
      ],
      totalCartPrice: Number,
  
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'project-itis',
      },
    },{ timestamps: true });

cartShema=mongoose.model('carts',schema);
module.exports=cartShema;