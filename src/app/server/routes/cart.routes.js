const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/carts', cartController.createCart);
router.get('/carts/:userId', cartController.getCartByUserId);
router.put('/carts/:id', cartController.updateCart);
router.delete('/carts/:id', cartController.deleteCart);
router.put('/carts/:id/clear', cartController.clearCart);

module.exports = router;