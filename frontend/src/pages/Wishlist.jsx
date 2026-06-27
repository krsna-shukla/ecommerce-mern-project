import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const BACKEND = "https://ecommerce-mern-project-dimt.onrender.com";

function Wishlist() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => { fetchWishlist(); }, []);

  const fetchWishlist = async () => {
    try {
      const res = await API.get("/wishlist", { headers: { Authorization: `Bearer ${token}` } });
      setProducts(res.data.products || []);
    } catch (e) { console.log(e); }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await API.post("/wishlist/toggle", { productId }, { headers: { Authorization: `Bearer ${token}` } });
      setProducts(products.filter(p => p._id !== productId));
    } catch (e) { console.log(e); }
  };

  const addToCart = async (productId) => {
    try {
      await API.post("/cart", { product: productId, quantity: 1 }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Added to cart!");
    } catch (e) { console.log(e); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", color: "#FAFAF8", paddingTop: "64px" }}>
      <div style={{ padding: "2.5rem 2rem 0", borderBottom: "1px solid #2E2E2E", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "0.5rem" }}>My Wishlist</h1>
        <p style={{ color: "#666", fontSize: "0.85rem", paddingBottom: "1.5rem" }}>{products.length} saved item(s)</p>
      </div>

      <div style={{ padding: "0 2rem 4rem" }}>
        {products.length === 0 ? (
          <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "4rem", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>♡</div>
            <p style={{ color: "#666", marginBottom: "1.5rem" }}>Your wishlist is empty</p>
            <button onClick={() => navigate("/")} style={{ background: "#D4A843", color: "#0F0F0F", fontWeight: 600, padding: "12px 28px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}>
              Browse Products
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {products.map(product => (
              <div key={product._id} style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ position: "relative", cursor: "pointer" }} onClick={() => navigate(`/product/${product._id}`)}>
                  <img src={`${BACKEND}${product.image}`} alt={product.name} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", background: "#252525" }} />
                  <button onClick={e => { e.stopPropagation(); removeFromWishlist(product._id); }}
                    style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(155,34,38,0.2)", border: "1px solid rgba(155,34,38,0.4)", color: "#e74c3c", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    ✕
                  </button>
                </div>
                <div style={{ padding: "1rem" }}>
                  <p style={{ fontSize: "0.7rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{product.category}</p>
                  <p style={{ fontSize: "0.9rem", fontWeight: 500, marginBottom: "8px", lineHeight: 1.3 }}>{product.name}</p>
                  <p style={{ color: "#D4A843", fontWeight: 600, marginBottom: "12px" }}>₹ {product.price}</p>
                  <button onClick={() => addToCart(product._id)}
                    style={{ width: "100%", background: "#D4A843", color: "#0F0F0F", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "10px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
