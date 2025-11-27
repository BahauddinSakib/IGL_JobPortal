const prisma = require('@prisma/client').PrismaClient;
const prismaClient = new prisma();


// Create a new cart for a user
module.exports.createCart = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const newCart = await prismaClient.cart.create({
      data: {
        userId,
      },
    });
    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a cart by user ID
module.exports.getCartByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await prismaClient.cart.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        cartItems: true,
      },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a cart (add/remove items)
module.exports.updateCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { cartItems } = req.body;

    const updatedCart = await prismaClient.cart.update({
      where: { id: parseInt(id) },
      data: {
        cartItems: {
          create: cartItems,
        },
      },
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a cart
module.exports.deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCart = await prismaClient.cart.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Clear a user's cart (remove all cart items)
module.exports.clearCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const clearedCart = await prismaClient.cart.update({
      where: { id: parseInt(id) },
      data: {
        cartItems: {
          deleteMany: {}, // Removes all items associated with the cart
        },
      },
    });

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
