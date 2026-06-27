const Wishlist = require("../models/Wishlist");

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate("products");
    res.json(wishlist || { products: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) wishlist = await Wishlist.create({ user: req.user.id, products: [] });

    // Use .toString() comparison to fix ObjectId === string mismatch
    const exists = wishlist.products.some(id => id.toString() === productId.toString());
    if (exists) {
      wishlist.products = wishlist.products.filter(id => id.toString() !== productId.toString());
      await wishlist.save();
      return res.json({ added: false, message: "Removed from wishlist" });
    } else {
      wishlist.products.push(productId);
      await wishlist.save();
      return res.json({ added: true, message: "Added to wishlist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
