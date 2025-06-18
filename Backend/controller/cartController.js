const UserModel = require("../models/UserModel")

//add to Cart
const addToCart = async (req,res) => {
  const id = req.user.id;
  const {itemId} = req.body;
  try {
    const userData = await UserModel.findById(id);
    const cartData = userData.cartData;

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else{
      cartData[itemId] += 1;
    }
    await UserModel.findByIdAndUpdate(id,{cartData});
    return res.json({success : true , message : 'Item Added To Cart'});

  } catch (error) {
    console.log(error);
    return res.json({success: true, message : error})
  }
  
}

//remove to Cart
const removeFromCart = async (req,res) => {
  const userid = req.user.id;
  const {itemId} = req.body;
  try {
    const userData = await UserModel.findById(userid);
    const cartData = userData.cartData;

   if (cartData[itemId] && cartData[itemId] > 1) {
  // Decrement quantity
    cartData[itemId] -= 1;
    } else {
      // Remove item completely if quantity is 1 or less
      delete cartData[itemId];
    }

    await UserModel.findByIdAndUpdate(userid,{cartData});
    return res.json({success : true , message : 'Item removed from Cart'});

  } catch (error) {
    console.log(error);
    return res.json({success: true, message : error})
  }
}

//get to Cart
const getAllCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const cartData = userData.cartData || {};

    console.log(cartData);
    res.status(200).json({ success: true, cartData });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports = {
    addToCart,
    removeFromCart,
    getAllCart,
}