const UserModel = require("../models/UserModel")





//add to Cart //increment
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

//remove to Cart //decrement
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
    return res.json({success: false, message : error})
  }
}
//delete one food section in cartData ❌
const RemoveFood = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { itemId } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: User ID missing" });
    }

    if (!itemId) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      return res.status(400).json({ success: false, message: "Item not found in cart" });
    }

    // your original logic
    if (cartData[itemId] && cartData[itemId] >= 1) {
      delete cartData[itemId];
      await UserModel.findByIdAndUpdate(userId, { cartData });

      return res.status(200).json({
        success: true,
        message: "Item removed from Cart",
      });
    } else {
       return res.json({
        success: false, message: "Food quantity is 0"
       })
    }


  } catch (error) {
    console.error("Error in RemoveFood:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


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
    RemoveFood,
}