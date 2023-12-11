const ApiError=require('../errors/apierror')
const cartmodel=require('../models/cartSchema')
const productmodel=require('../models/productSchema')
const mongoose=require('mongoose')
const calcTotalCartPrice = (cart) => {
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });
    cart.totalCartPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;
    return totalPrice;
  };

const cartAdd = async (req, res,nxt) => {
    const { productId,quantity } = req.body;
    const product = await productmodel.findById(productId);
   //check if product in the stock
    if(product.instock<quantity){
   return nxt(new ApiError("out of the stock",400)) 
   }
   console.log(req.user._id)
    
    let cart = await cartmodel.findOne({ user: req.user._id });
    //check if user has cart
    if (!cart) {
      // create cart fot user
      cart = await cartmodel.create({
        user:  req.user._id,
        cartItems: [{ product: productId,quantity, price: product.price }],
      })
      
      // if user has cart
    } else {
      // product exist in cart, update product quantity
        const productIndex = cart.cartItems.findIndex(
        (item) => item.product.toString() === productId );
  
      if (productIndex > -1) {
        const cartItem = cart.cartItems[productIndex];
        cartItem.quantity += 1;
  
        cart.cartItems[productIndex] = cartItem;
      } else {
    
        cart.cartItems.push({ product: productId,quantity, price: product.price });
      }
    }
  
    calcTotalCartPrice(cart);
    await cart.save();
  
    res.status(200).json({
      status: 'success',
      message: 'Product added to cart successfully',
      numOfCartItems: cart.cartItems.length,
      data: cart,
    });
  }



  const allcarts=async (req, res, next) => {
    const findcart = await cartmodel.find();
    res.send(findcart)
  };

  const mycart= async (req, res, next) => {
    const findcart = await cartmodel.findOne({user:req.user._id});
    if (findcart) res.send(findcart);
   console.log(findcart)
    return next(
       new ApiError("cart not found",404)
    );
  };

  const clearitem=async(req,res,nxt)=>{

    const cart = await cartmodel.findOneAndUpdate(
      { user: req.user._id },
      {
        $pull: { cartItems: { _id: req.params.itemId } },
      },
      { new: true }
    );
  
    calcTotalCartPrice(cart);
    cart.save();
  
    res.status(200).json({
      status: 'success',
      numOfCartItems: cart.cartItems.length,
      data: cart,
    });
  };

const updatequantiity=async(req,res,nxt)=>{
  const { quantity } = req.body;

  const cart = await cartmodel.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError(`there is no cart for user ${req.user._id}`, 404));
  }

  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.itemId
  );
  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return nxt(
      new ApiError(`there is no item for this id :${req.params.itemId}`, 404)
    );
  }

  calcTotalCartPrice(cart);

  await cart.save();

  res.status(200).json({
    status: 'success',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });


  calcTotalCartPrice(cart);
  cart.save();

  res.status(200).json({
    status: 'success',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
}

const clearcart=async(req,res,nxt)=>{
  const {id}=req.params
  await cartmodel.findOneAndDelete(id);
  res.status(200).send("cart deleted sucessfully");
}


module.exports={cartAdd,allcarts,mycart,clearcart,clearitem,updatequantiity}