const FoodModel = require('../models/FoodModel');
const orderModel = require('../models/orderModel');
const UserModel = require('../models/UserModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // ✅ Correct Stripe init
require('dotenv').config(); // ✅ Optional to move this to the top of your entry file

const handlePlaceOrder = async (req, res) => {
  const frontendUrl = 'http://localhost:5173';

  try {
    const { items, amount, address } = req.body;

     if (!items.length>0) {
      return res.status(404).json({ success: false, message: 'Cart is empty' });
     }

    // Temporarily save the order draft
    const draftOrder = await orderModel.create({
      userId: req.user.id,
      items,
      address,
      amount,
      payment: false,
    });




    // Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: 'inr',
        product_data: { name: 'Delivery Charges' },
        unit_amount: 40 * 100,
      },
      quantity: 1,
    });

  // Now pass only the order ID in Stripe metadata
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    success_url: `${frontendUrl}/verify?success=true&orderId=${draftOrder._id}`,
    cancel_url: `${frontendUrl}/verify?success=false&orderId=${draftOrder._id}`,
    metadata: {
      draftOrderId: draftOrder._id.toString(),
    }
  });

    res.json({ success: true, session_URL: session.url });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error placing order' });
  }
};


const verifyPayment = async (req, res) => {
  const { orderId } = req.body;
  const { id } = req.user;

  try {
    // Optional: you can double-check if the order exists
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Update order payment status
    await orderModel.findByIdAndUpdate(orderId, {
      payment: true,
    });

    // Clear user cart
    await UserModel.findByIdAndUpdate(id, { cartData: {} });

    return res.json({ success: true, message: 'Order verified and payment successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error verifying payment' });
  }
};





const handleFetchUserOrder = async (req,res) => {
   try {
     const { id } = req.user; // find by userId can get many orders which is as usual 
     const orders = await orderModel.find({userId : id});
     console.log(id)
     return res.json({ success : true , orders : orders });

   } catch (error)  {
     console.log(error);
     return res.json({success : true , error : 'Error'})
   }
}
// Controller to fetch all orders
const handleAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    
    return res.status(200).json({
      success: true,
      message: 'All orders fetched successfully',
      orders,
    });

  } catch (error) {
    console.error('Error fetching orders:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders. Please try again later.',
    });
  }
};

const handleStatusUpdate = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;

    // Validate input
    if (!orderId || !newStatus) {
      return res.status(400).json({ success: false, message: 'Order ID and new status are required.' });
    }

    // Update the order status
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true } // Return the updated document
    );

    // If order not found
    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    // Success
    return res.status(200).json({
      success: true,
      message: 'Order status updated successfully.',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating order status.',
    });
  }
};


module.exports = {
  handlePlaceOrder,
  verifyPayment,
  handleFetchUserOrder,
  handleAllOrders,
  handleStatusUpdate,
};
