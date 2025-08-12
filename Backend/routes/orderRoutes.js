const { Router } = require('express');
const {handlePlaceOrder,verifyPayment,handleFetchUserOrder,handleAllOrders,handleStatusUpdate,handleDownloadInvoice} = require('../controller/orderController');
const router = Router();

const { default: Stripe } = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

router.post('/placeorder', handlePlaceOrder);
router.post('/verify', verifyPayment);
router.get('/fetchOrders',handleFetchUserOrder);
router.get('/getAllOrders',handleAllOrders);
router.put('/updateStatus',handleStatusUpdate);
router.put('/download-invoice/:orderId',handleDownloadInvoice);




module.exports = router 