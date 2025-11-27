const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

router.post('/create-wishlists', wishlistController.createWishlist);
router.get('/wishlists/:userId', wishlistController.getWishlistByUserId);
router.put('/wishlists/:id', wishlistController.updateWishlist);
router.delete('/wishlists/:id', wishlistController.deleteWishlist);
router.put('/wishlists/:id/clear', wishlistController.clearWishlist);

module.exports = router;
