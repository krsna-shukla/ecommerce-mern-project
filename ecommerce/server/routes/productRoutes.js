const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,getSingleProduct
} = require("../controllers/productController");


router.post("/", authMiddleware, adminMiddleware, upload.single("image"), addProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.put("/:id", authMiddleware, adminMiddleware, updateProduct);

router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

router.get("/:id", getSingleProduct);
module.exports = router;