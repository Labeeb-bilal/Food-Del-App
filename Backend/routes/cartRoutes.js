const { Router } = require("express");

const router = Router();
const {addToCart,removeFromCart,getAllCart} = require('../controller/cartController')

router.post('/addToCart',addToCart);
router.post('/removeFromCart',removeFromCart);
router.get('/getAllCart',getAllCart);

module.exports = router