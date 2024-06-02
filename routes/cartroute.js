
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const cartController = require('../contoller/cartcontrol');

router.post('/addtocart', authMiddleware, cartController.addToCart);
router.post('/removefromcart', authMiddleware, cartController.removeFromCart);
router.post('/getcart', authMiddleware, cartController.getCart);

module.exports = router;
