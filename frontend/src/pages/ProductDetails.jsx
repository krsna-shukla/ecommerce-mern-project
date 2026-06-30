import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const BACKEND = "https://ecommerce-mern-project-dimt.onrender.com";

const ALL_FAKE_REVIEWS = [
  [
    { userName: "Rahul Sharma", rating: 5, comment: "Absolutely love this! Build quality is top-notch and arrived well-packaged. Highly recommend to anyone looking for value for money.", date: "12 Jun 2025" },
    { userName: "Priya Mehta", rating: 4, comment: "Great product overall. Exactly as described. Delivery was quick too. Minor packaging issue but the product itself is perfect.", date: "3 May 2025" },
    { userName: "Amit Verma", rating: 5, comment: "Exceeded my expectations! The quality is premium and worth every rupee. Already recommended it to my friends.", date: "28 Apr 2025" },
    { userName: "Sneha Kapoor", rating: 4, comment: "Really good purchase. Used it for a week now and very satisfied. Would definitely buy again from this store.", date: "15 Apr 2025" },
    { userName: "Vikram Singh", rating: 3, comment: "Decent product for the price. Nothing extraordinary but does the job well. Delivery was prompt.", date: "2 Apr 2025" },
  ],
  [
    { userName: "Ananya Reddy", rating: 5, comment: "Superb quality! Fits perfectly and looks even better in person than in photos. Very impressed.", date: "20 Jun 2025" },
    { userName: "Rohan Gupta", rating: 5, comment: "Best purchase I made this year. Premium material and immaculate packaging. Will definitely order again.", date: "14 May 2025" },
    { userName: "Divya Nair", rating: 4, comment: "Very happy with this purchase. Quality is great, delivery was on time. Already recommended to friends!", date: "5 May 2025" },
    { userName: "Arjun Patel", rating: 4, comment: "Good value for money. Product works as expected. Delivery was slightly delayed but overall satisfied.", date: "22 Apr 2025" },
  ],
  [
    { userName: "Kavya Iyer", rating: 5, comment: "Outstanding product! Every detail is well crafted. Very impressed with the build quality and finish.", date: "18 Jun 2025" },
    { userName: "Siddharth Rao", rating: 4, comment: "Solid purchase! Exactly as shown in images. Great customer experience overall.", date: "9 May 2025" },
    { userName: "Pooja Sharma", rating: 5, comment: "Was skeptical at first but this totally exceeded my expectations. Premium feel and great quality!", date: "30 Apr 2025" },
    { userName: "Nikhil Joshi", rating: 3, comment: "Product is decent but could be better for the price. Delivery was on time and packaging was good.", date: "18 Apr 2025" },
    { userName: "Aisha Khan", rating: 5, comment: "Absolutely worth every rupee! Amazing quality and I have already placed a second order.", date: "7 Apr 2025" },
  ],
];

const getFakeReviews = (productName) => {
  const idx = (productName || "").length % ALL_FAKE_REVIEWS.length;
  return ALL_FAKE_REVIEWS[idx];
};

const getFakeAvg = (reviews) => {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return avg.toFixed(1);
};


function StarRating({ value, onChange, size = 24 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          style={{
            fontSize: size,
            cursor: onChange ? "pointer" : "default",
            color: star <= (hovered || value) ? "#D4A843" : "#2E2E2E",
            transition: "color 0.15s",
          }}
        >★</span>
      ))}
    </div>
  );
}

function PaymentModal({ product, quantity, onClose }) {
  const [step, setStep] = useState(1); // 1=form, 2=processing, 3=success
  const [form, setForm] = useState({ name: "", card: "", expiry: "", cvv: "", address: "" });
  const navigate = useNavigate();

  const handlePay = async (e) => {
    e.preventDefault();
    setStep(2);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2000));
    // Place actual order
    try {
      const token = sessionStorage.getItem("token");
      // Add to cart first then place order
      await API.post("/cart", { product: product._id, quantity }, { headers: { Authorization: `Bearer ${token}` } });
      await API.post("/orders", {}, { headers: { Authorization: `Bearer ${token}` } });
    } catch (e) { console.log(e); }
    setStep(3);
  };

  const inputStyle = { background: "#252525", border: "1px solid #2E2E2E", color: "#FAFAF8", padding: "10px 14px", borderRadius: "6px", fontSize: "0.85rem", outline: "none", width: "100%", fontFamily: "'Inter', sans-serif" };
  const labelStyle = { fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div className="modal-box" style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "12px", padding: "2rem", width: "100%", maxWidth: "480px", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "#252525", border: "1px solid #2E2E2E", color: "#999", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem" }}>✕</button>

        {step === 1 && (
          <>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", marginBottom: "0.4rem" }}>Secure Checkout</h2>
            <div style={{ background: "#252525", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "0.82rem", fontWeight: 500 }}>{product.name}</p>
                <p style={{ fontSize: "0.75rem", color: "#666" }}>Qty: {quantity}</p>
              </div>
              <span style={{ color: "#D4A843", fontWeight: 600 }}>₹ {product.price * quantity}</span>
            </div>
            <form onSubmit={handlePay} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Cardholder Name</label>
                <input placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={inputStyle} onFocus={e => e.target.style.borderColor="#D4A843"} onBlur={e => e.target.style.borderColor="#2E2E2E"} />
              </div>
              <div>
                <label style={labelStyle}>Card Number</label>
                <input placeholder="4242 4242 4242 4242" value={form.card} onChange={e => setForm({...form, card: e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19)})} required maxLength={19} style={inputStyle} onFocus={e => e.target.style.borderColor="#D4A843"} onBlur={e => e.target.style.borderColor="#2E2E2E"} />
              </div>
              <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Expiry</label>
                  <input placeholder="MM/YY" value={form.expiry} onChange={e => setForm({...form, expiry: e.target.value})} required maxLength={5} style={inputStyle} onFocus={e => e.target.style.borderColor="#D4A843"} onBlur={e => e.target.style.borderColor="#2E2E2E"} />
                </div>
                <div>
                  <label style={labelStyle}>CVV</label>
                  <input placeholder="123" type="password" value={form.cvv} onChange={e => setForm({...form, cvv: e.target.value})} required maxLength={3} style={inputStyle} onFocus={e => e.target.style.borderColor="#D4A843"} onBlur={e => e.target.style.borderColor="#2E2E2E"} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Delivery Address</label>
                <textarea placeholder="Enter your full address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} required rows={2} style={{...inputStyle, resize: "none"}} onFocus={e => e.target.style.borderColor="#D4A843"} onBlur={e => e.target.style.borderColor="#2E2E2E"} />
              </div>
              <div style={{ background: "#252525", borderRadius: "6px", padding: "10px 14px", fontSize: "0.75rem", color: "#666", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#D4A843" }}>🔒</span> This is a demo payment. No real charges will be made.
              </div>
              <button type="submit" style={{ background: "#D4A843", color: "#0F0F0F", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Pay ₹ {product.price * quantity}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem", animation: "spin 1s linear infinite" }}>⏳</div>
            <p style={{ color: "#D4A843", fontFamily: "'Playfair Display', serif", fontSize: "1.2rem" }}>Processing Payment...</p>
            <p style={{ color: "#666", fontSize: "0.82rem", marginTop: "0.5rem" }}>Please do not close this window</p>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#6fcf97", marginBottom: "0.5rem" }}>Payment Successful!</h2>
            <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Your order has been placed successfully.</p>
            <div style={{ background: "#252525", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.8rem", color: "#999" }}>Order Total</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#D4A843" }}>₹ {product.price * quantity}</p>
            </div>
            <button onClick={() => { onClose(); navigate("/myorders"); }} style={{ background: "#D4A843", color: "#0F0F0F", fontWeight: 600, padding: "12px 28px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}>
              View My Orders
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("reviews");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    if (token) fetchWishlist();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (e) { console.log(e); }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data.reviews);
      setAvgRating(res.data.avgRating);
    } catch (e) { console.log(e); }
  };

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist", { headers: { Authorization: `Bearer ${token}` } });
      // products are populated objects — extract string IDs
      setWishlistIds(res.data.products?.map(p => (p._id || p).toString()) || []);
    } catch (e) { console.log(e); }
  };

  const addToCart = async () => {
    if (!token) { navigate("/login"); return; }
    try {
      await API.post("/cart", { product: product._id, quantity }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Added to cart!");
    } catch (e) { console.log(e); }
  };

  const toggleWishlist = async () => {
    if (!token) { navigate("/login"); return; }
    try {
      const res = await API.post("/wishlist/toggle", { productId: product._id }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.added) setWishlistIds([...wishlistIds, product._id.toString()]);
      else setWishlistIds(wishlistIds.filter(w => w !== product._id.toString()));
    } catch (e) { console.log(e); }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) { navigate("/login"); return; }
    setSubmitting(true);
    try {
      await API.post(`/reviews/${id}`, newReview, { headers: { Authorization: `Bearer ${token}` } });
      setNewReview({ rating: 5, comment: "" });
      fetchReviews();
    } catch (e) {
      alert(e.response?.data?.message || "Failed to submit review");
    } finally { setSubmitting(false); }
  };

  const deleteReview = async (reviewId) => {
    try {
      await API.delete(`/reviews/${reviewId}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchReviews();
    } catch (e) { console.log(e); }
  };

  const isWishlisted = wishlistIds.includes(product?._id?.toString());

  if (!product) return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "64px" }}>
      <p style={{ color: "#666" }}>Loading...</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", color: "#FAFAF8", paddingTop: "64px" }}>
      {showPayment && <PaymentModal product={product} quantity={quantity} onClose={() => setShowPayment(false)} />}

      <div className="page-content" style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem" }}>
        {/* Product Section */}
        <div className="pd-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          {/* Image */}
          <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", overflow: "hidden", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={product.image?.startsWith("http") ? product.image : `${BACKEND}${product.image}`} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "1rem" }} />
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <p style={{ fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>{product.category}</p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", lineHeight: 1.2 }}>{product.name}</h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <StarRating value={avgRating > 0 ? Math.round(avgRating) : 5} size={20} />
              <span style={{ color: "#D4A843", fontWeight: 600 }}>{avgRating > 0 ? avgRating : getFakeAvg(getFakeReviews(product?.name))}</span>
              <span style={{ color: "#666", fontSize: "0.8rem" }}>({reviews.length > 0 ? reviews.length : getFakeReviews(product?.name).length} reviews)</span>
            </div>

            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#D4A843", fontWeight: 600 }}>₹ {product.price}</p>

            <p style={{ color: "#999", fontSize: "0.9rem", lineHeight: 1.7 }}>{product.description}</p>

            {/* Quantity */}
            <div>
              <p style={{ fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Quantity</p>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #2E2E2E", borderRadius: "6px", overflow: "hidden", width: "fit-content" }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ background: "#252525", border: "none", color: "#FAFAF8", width: "40px", height: "40px", cursor: "pointer", fontSize: "1.1rem" }}>−</button>
                <span style={{ background: "#1A1A1A", borderLeft: "1px solid #2E2E2E", borderRight: "1px solid #2E2E2E", width: "52px", textAlign: "center", fontSize: "0.9rem", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} style={{ background: "#252525", border: "none", color: "#FAFAF8", width: "40px", height: "40px", cursor: "pointer", fontSize: "1.1rem" }}>+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="pd-actions" style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setShowPayment(true)} style={{ flex: 1, background: "#D4A843", color: "#0F0F0F", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Buy Now
              </button>
              <button onClick={addToCart} style={{ flex: 1, background: "none", color: "#FAFAF8", fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "14px", border: "1px solid #2E2E2E", borderRadius: "4px", cursor: "pointer" }}>
                Add to Cart
              </button>
              <button onClick={toggleWishlist} style={{ background: isWishlisted ? "rgba(212,168,67,0.15)" : "#252525", border: `1px solid ${isWishlisted ? "#D4A843" : "#2E2E2E"}`, color: isWishlisted ? "#D4A843" : "#999", width: "48px", height: "48px", borderRadius: "4px", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {isWishlisted ? "♥" : "♡"}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: "1px solid #2E2E2E", marginBottom: "2rem", display: "flex", gap: "2rem" }}>
          {["reviews", "write"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: "none", border: "none", color: activeTab === tab ? "#D4A843" : "#666", fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 0 1rem", cursor: "pointer", borderBottom: `2px solid ${activeTab === tab ? "#D4A843" : "transparent"}` }}>
              {tab === "reviews" ? `Reviews (${reviews.length > 0 ? reviews.length : getFakeReviews(product?.name).length})` : "Write a Review"}
            </button>
          ))}
        </div>

        {activeTab === "reviews" && (
          <div>
            {(() => {
              const displayReviews = reviews.length > 0 ? reviews : null;
              const fakeReviews = getFakeReviews(product?.name);
              const showFake = reviews.length === 0;
              const allReviews = showFake ? fakeReviews : reviews;
              return (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {allReviews.map((review, idx) => (
                  <div key={review._id || idx} style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "4px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#252525", border: "1px solid #D4A843", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", color: "#D4A843", fontSize: "0.85rem" }}>
                            {(review.userName || "U")[0].toUpperCase()}
                          </div>
                          <div>
                            <p style={{ fontSize: "0.88rem", fontWeight: 500 }}>{review.userName}</p>
                            <p style={{ fontSize: "0.72rem", color: "#666" }}>{review.date || new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                          </div>
                        </div>
                        <StarRating value={review.rating} size={16} />
                      </div>
                      {token && review._id && (
                        <button onClick={() => deleteReview(review._id)} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "0.78rem" }}>Delete</button>
                      )}
                    </div>
                    <p style={{ color: "#999", fontSize: "0.88rem", lineHeight: 1.6 }}>{review.comment}</p>
                  </div>
                ))}
              </div>
              );
            })()}
          </div>
        )}

        {activeTab === "write" && (
          <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.5rem", maxWidth: "600px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", marginBottom: "1.25rem" }}>Share Your Experience</h3>
            <form onSubmit={submitReview} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <p style={{ fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Your Rating</p>
                <StarRating value={newReview.rating} onChange={r => setNewReview({...newReview, rating: r})} size={32} />
              </div>
              <div>
                <label style={{ fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>Your Review</label>
                <textarea
                  placeholder="Tell others about your experience with this product..."
                  value={newReview.comment}
                  onChange={e => setNewReview({...newReview, comment: e.target.value})}
                  required rows={4}
                  style={{ background: "#252525", border: "1px solid #2E2E2E", color: "#FAFAF8", padding: "10px 14px", borderRadius: "6px", fontSize: "0.85rem", outline: "none", width: "100%", resize: "vertical", fontFamily: "'Inter', sans-serif" }}
                  onFocus={e => e.target.style.borderColor="#D4A843"}
                  onBlur={e => e.target.style.borderColor="#2E2E2E"}
                />
              </div>
              <button type="submit" disabled={submitting} style={{ background: "#D4A843", color: "#0F0F0F", fontWeight: 600, fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "13px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
