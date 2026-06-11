const express = require("express");

const router = express.Router();

const { 
    placeOrder,
    updateOrderStatus,
    getMyOrders,
    getAllOrders
} = require("../controllers/orderController");


const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, placeOrder);
router.put("/:id", authMiddleware,updateOrderStatus);
router.get("/myorders", authMiddleware,getMyOrders),
router.get("/", authMiddleware,adminMiddleware,getAllOrders)


module.exports = router;