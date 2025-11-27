const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();

// Create a new review
module.exports.createReview = async (req, res, next) => {
  try {
    const { productId, userId, rating, comment } = req.body;


    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const newReview = await prismaClient.review.create({
      data: {
        productId,
        userId,
        rating,
        comment,
      },
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all reviews for a product
module.exports.getReviewsByProductId = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const reviews = await prismaClient.review.findMany({
      where: { productId: parseInt(productId) },
      include: {
        user: true,
      },
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a review by ID
module.exports.getReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await prismaClient.review.findUnique({
      where: { id: parseInt(id) },
      include: {
        product: true,
        user: true,
      },
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a review
module.exports.updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const updatedReview = await prismaClient.review.update({
      where: { id: parseInt(id) },
      data: {
        rating,
        comment,
      },
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a review
module.exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedReview = await prismaClient.review.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
