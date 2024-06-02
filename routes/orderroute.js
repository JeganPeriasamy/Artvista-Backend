const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const OrderController = require('../contoller/ordercontrol');

router.post('/place', authMiddleware, OrderController.placeOrder);
router.post('/verify', OrderController.verifyOrder);
router.post('/userorders', authMiddleware, OrderController.userOrders);
router.get('/list', OrderController.listOrders);
router.post('/status',OrderController.updateStatus);

module.exports = router;