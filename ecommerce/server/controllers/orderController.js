const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async (req, res) => {

    try {

        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("products.product");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        let totalPrice = 0;

        cart.products.forEach((item) => {
            totalPrice += item.product.price * item.quantity;
        });

        const order = new Order({
            user: req.user.id,
            products: cart.products,
            totalPrice
        });

        await order.save();

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = req.body.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.user.id
        }).populate("products.product");

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product");

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    placeOrder,
    updateOrderStatus,
    getMyOrders,
    getAllOrders
};