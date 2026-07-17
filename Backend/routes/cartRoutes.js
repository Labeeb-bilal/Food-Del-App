const { Router } = require("express");

const router = Router();
const {addToCart,removeFromCart,getAllCart,RemoveFood} = require('../controller/cartController')

router.post('/addToCart',addToCart);
router.post('/removeFromCart',removeFromCart);
router.get('/getAllCart',getAllCart);
router.patch('/removeFood',RemoveFood);


module.exports = router