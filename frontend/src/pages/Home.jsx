import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CATEGORIES = [
  { label: "All", icon: "🛍️" },
  { label: "Fashion", icon: "👕" },
  { label: "Electronics", icon: "📱" },
  { label: "Shoes", icon: "👟" },
  { label: "Watches", icon: "⌚" },
  { label: "Sports", icon: "🏏" },
];

function Home({ search }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const navigate = useNavigate();

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId, e) => {
    e.stopPropagation();
    try {
      const token = sessionStorage.getItem("token");
      if (!token) { navigate("/login"); return; }
      await API.post("/cart", { product: productId, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("Added to cart");
    } catch (error) {
      console.log(error);
    }
  };

  const showToast = (msg) => {
    const t = document.getElementById("toast");
    if (t) { t.textContent = "✦ " + msg; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 2500); }
  };

  let filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", color: "#FAFAF8", paddingTop: "64px" }}>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg,#0F0F0F 0%,#1C1408 50%,#0F0F0F 100%)",
        padding: "5rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "3rem",
        minHeight: "380px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, width: "60%", height: "100%",
          background: "radial-gradient(ellipse at 70% 50%,rgba(212,168,67,.1) 0%,transparent 70%)",
        }} />

        <div style={{ maxWidth: "520px", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4A843", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "24px", height: "1px", background: "#D4A843", display: "inline-block" }} />
            Limited Time Offer
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.2rem", lineHeight: 1.1, color: "#FAFAF8", marginBottom: "1rem" }}>
            Mega Sale <span style={{ color: "#D4A843" }}>50% OFF</span>
          </h1>
          <p style={{ color: "#999", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Discover curated collections across Fashion, Electronics, Sports & more — all at unbeatable prices.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => document.getElementById("products-section").scrollIntoView({ behavior: "smooth" })}
              style={{ background: "#D4A843", color: "#0F0F0F", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "13px 28px", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Shop Now
            </button>
            <button
              onClick={() => setSelectedCategory("Fashion")}
              style={{ background: "none", color: "#FAFAF8", fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "13px 28px", border: "1px solid #2E2E2E", borderRadius: "4px", cursor: "pointer" }}
            >
              Browse Collections
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "2.5rem", position: "relative", zIndex: 1, flexShrink: 0 }}>
          {[["6+", "Products"], ["Fast", "Delivery"], ["24/7", "Support"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#D4A843" }}>{num}</div>
              <div style={{ fontSize: "0.7rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TRUST STRIP */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", padding: "1.5rem 2rem", borderBottom: "1px solid #2E2E2E" }}>
        {[["🚚", "Free Shipping", "Orders above ₹999"],["🔄","Easy Returns","30-day return policy"],["🔒","Secure Payment","100% safe checkout"],["⭐","Top Rated","4.8★ avg rating"]].map(([icon, t1, t2]) => (
          <div key={t1} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "1.4rem", color: "#D4A843" }}>{icon}</span>
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: 500, color: "#FAFAF8" }}>{t1}</div>
              <div style={{ fontSize: "0.72rem", color: "#666" }}>{t2}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CATEGORIES */}
      <div style={{ padding: "2.5rem 2rem 1rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "#FAFAF8" }}>Shop by Category</h2>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: "4px" }}>
          {CATEGORIES.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setSelectedCategory(label)}
              style={{
                flexShrink: 0,
                padding: "9px 22px",
                borderRadius: "100px",
                border: `1px solid ${selectedCategory === label ? "#D4A843" : "#2E2E2E"}`,
                background: selectedCategory === label ? "#D4A843" : "#1A1A1A",
                color: selectedCategory === label ? "#0F0F0F" : "#999",
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                cursor: "pointer",
                fontWeight: selectedCategory === label ? 600 : 400,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products-section" style={{ padding: "1rem 2rem 4rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "#FAFAF8" }}>
            🔥 Trending Products
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em" }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ background: "#252525", border: "1px solid #2E2E2E", color: "#FAFAF8", padding: "7px 14px", borderRadius: "6px", fontSize: "0.82rem", cursor: "pointer", outline: "none" }}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <span style={{ fontSize: "0.8rem", color: "#666" }}>{filtered.length} products</span>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {filtered.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                style={{
                  background: "#1A1A1A",
                  border: "1px solid #2E2E2E",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "border-color 0.25s, transform 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8A97E"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2E2E2E"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#252525" }}>
                  <img
                    src={`https://ecommerce-mern-project-dimt.onrender.com${product.image}`}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span style={{ position: "absolute", top: "10px", left: "10px", background: "#D4A843", color: "#0F0F0F", fontSize: "0.65rem", fontWeight: 700, padding: "4px 10px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    NEW
                  </span>
                </div>
                <div style={{ padding: "1rem" }}>
                  <div style={{ fontSize: "0.68rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{product.category}</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "#FAFAF8", marginBottom: "6px", lineHeight: 1.3 }}>{product.name}</div>
                  <p style={{ fontSize: "0.76rem", color: "#666", marginBottom: "10px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {product.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "1rem", fontWeight: 600, color: "#D4A843" }}>₹ {product.price}</span>
                    <button
                      onClick={(e) => addToCart(product._id, e)}
                      style={{ background: "#252525", border: "1px solid #2E2E2E", color: "#FAFAF8", padding: "7px 14px", borderRadius: "6px", fontSize: "0.78rem", cursor: "pointer", fontWeight: 500, letterSpacing: "0.04em", transition: "all 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#D4A843"; e.currentTarget.style.color = "#0F0F0F"; e.currentTarget.style.borderColor = "#D4A843"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#252525"; e.currentTarget.style.color = "#FAFAF8"; e.currentTarget.style.borderColor = "#2E2E2E"; }}
                    >
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem", color: "#666", fontSize: "1rem" }}>
            No products found
          </div>
        )}
      </div>

      {/* TOAST */}
      <div id="toast" style={{
        position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%) translateY(100px)",
        background: "#252525", border: "1px solid #2E2E2E", color: "#FAFAF8",
        padding: "12px 24px", borderRadius: "8px", fontSize: "0.82rem", zIndex: 500,
        transition: "transform 0.3s", color: "#D4A843",
      }} />
      <style>{`.show { transform: translateX(-50%) translateY(0) !important; }`}</style>
    </div>
  );
}

export default Home;
