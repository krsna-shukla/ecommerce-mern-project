const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addReview, getReviews, deleteReview } = require("../controllers/reviewController");

router.get("/:productId", getReviews);
router.post("/:productId", auth, addReview);
router.delete("/:reviewId", auth, deleteReview);

module.exports = router;
