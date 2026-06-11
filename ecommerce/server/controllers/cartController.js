const Cart = require("../models/Cart");

const addToCart = async (req, res) => {

    try {

        const { product, quantity } = req.body;

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({
                user: req.user.id,
                products: []
            });
        }

        cart.products.push({
            product,
            quantity
        });

        await cart.save();

        res.status(201).json(cart);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getCart = async (req, res) => {
  try {
    console.log(req.user);

    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate({
      path: "products.product",
      model: "Product",
    });

    console.log(cart);

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { productId, action } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    const item = cart.products.find(
  (p) =>
    (p.product._id
      ? p.product._id.toString()
      : p.product.toString()) === productId
);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    if (action === "increase") {
      item.quantity += 1;
    }

    if (action === "decrease") {
      item.quantity -= 1;

      if (item.quantity < 1) {
        item.quantity = 1;
      }
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    cart.products = cart.products.filter(
      (p) =>
        (p.product._id
          ? p.product._id.toString()
          : p.product.toString()) !== productId
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    addToCart,
    getCart,
    updateQuantity,
    removeFromCart
};