const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();

// Create a new wishlist for a user
module.exports.createWishlist = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const newWishlist = await prismaClient.wishlist.create({
      data: {
        userId,
      },
    });
    res.status(201).json(newWishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get wishlist by user ID
module.exports.getWishlistByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const wishlist = await prismaClient.wishlist.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        wishlistItems: true,
      },
    });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update wishlist (add/remove items)
module.exports.updateWishlist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { wishlistItems } = req.body;
    const updatedWishlist = await prismaClient.wishlist.update({
      where: { id: parseInt(id) },
      data: {
        wishlistItems: {
          create: wishlistItems,
        },
      },
    });
    res.status(200).json(updatedWishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a wishlist
module.exports.deleteWishlist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedWishlist = await prismaClient.wishlist.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Wishlist deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Clear a user's wishlist (remove all items)
module.exports.clearWishlist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clearedWishlist = await prismaClient.wishlist.update({
      where: { id: parseInt(id) },
      data: {
        wishlistItems: {
          deleteMany: {},
        },
      },
    });
    res.status(200).json({ message: 'Wishlist cleared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
