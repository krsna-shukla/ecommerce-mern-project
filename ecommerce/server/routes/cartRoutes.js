const express = require("express");
const router = express.Router();

const {
    addToCart,
    getCart,
    updateQuantity,
    removeFromCart
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.put("/update", authMiddleware, updateQuantity);
router.delete("/remove", authMiddleware, removeFromCart);

module.exports = router;