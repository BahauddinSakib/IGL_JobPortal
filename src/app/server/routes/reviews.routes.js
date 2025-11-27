const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews.controller');

router.post('/create-reviews', reviewController.createReview);
router.get('/reviews/product/:productId', reviewController.getReviewsByProductId);
router.get('/get-reviews/:id', reviewController.getReviewById);
router.put('/reviews/:id', reviewController.updateReview);
router.delete('/delete-reviews/:id', reviewController.deleteReview);

module.exports = router;
