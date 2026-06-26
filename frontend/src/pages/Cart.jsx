import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();
  const BACKEND_URL = "https://ecommerce-mern-project-dimt.onrender.com";

  const fetchCart = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await API.get("/cart", { headers: { Authorization: `Bearer ${token}` } });
      setCart(res.data);
    } catch (error) { console.log(error); }
  };

  const updateQuantity = async (productId, action) => {
    try {
      const token = sessionStorage.getItem("token");
      await API.put("/cart/update", { productId, action }, { headers: { Authorization: `Bearer ${token}` } });
      fetchCart();
    } catch (error) { console.log(error); }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = sessionStorage.getItem("token");
      await API.delete("/cart/remove", { headers: { Authorization: `Bearer ${token}` }, data: { productId } });
      fetchCart();
    } catch (error) { console.log(error); }
  };

  const placeOrder = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await API.post("/orders", {}, { headers: { Authorization: `Bearer ${token}` } });
      alert("Order Placed Successfully!");
      fetchCart();
      navigate("/myorders");
    } catch (error) { console.log(error); }
  };

  useEffect(() => { fetchCart(); }, []);

  const total = cart?.products?.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0;

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", color: "#FAFAF8", paddingTop: "64px" }}>
      <div style={{ padding: "2.5rem 2rem 0", borderBottom: "1px solid #2E2E2E", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "0.5rem" }}>My Cart</h1>
        <p style={{ color: "#666", fontSize: "0.85rem", paddingBottom: "1.5rem" }}>
          {cart?.products?.length || 0} item(s) in your cart
        </p>
      </div>

      <div style={{ padding: "0 2rem 4rem", display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", maxWidth: "1100px" }}>
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {!cart?.products?.length ? (
            <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "3rem", textAlign: "center", color: "#666" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.products.map((item) => (
              <div key={item._id} style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.25rem", display: "flex", gap: "1.25rem", alignItems: "center" }}>
                <img src={`${BACKEND_URL}${item.product.image}`} alt={item.product.name}
                  style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "6px", background: "#252525" }} />
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: "0.95rem", fontWeight: 500, marginBottom: "4px" }}>{item.product.name}</h2>
                  <p style={{ color: "#D4A843", fontSize: "0.9rem", fontWeight: 600, marginBottom: "10px" }}>₹ {item.product.price}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0", border: "1px solid #2E2E2E", borderRadius: "6px", overflow: "hidden", width: "fit-content" }}>
                    <button onClick={() => updateQuantity(item.product._id, "decrease")} style={qtyBtnStyle}>−</button>
                    <span style={{ background: "#1A1A1A", color: "#FAFAF8", border: "none", borderLeft: "1px solid #2E2E2E", borderRight: "1px solid #2E2E2E", width: "44px", textAlign: "center", fontSize: "0.9rem", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.quantity}
                    </span>
                    <button onClick={() => updateQuantity(item.product._id, "increase")} style={qtyBtnStyle}>+</button>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
                  <span style={{ fontSize: "1rem", fontWeight: 600, color: "#D4A843" }}>₹ {item.product.price * item.quantity}</span>
                  <button onClick={() => removeFromCart(item.product._id)} style={{ background: "none", border: "1px solid #2E2E2E", color: "#999", padding: "6px 14px", borderRadius: "4px", cursor: "pointer", fontSize: "0.78rem" }}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.5rem", height: "fit-content", position: "sticky", top: "80px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", marginBottom: "1.5rem" }}>Order Summary</h2>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#666", marginBottom: "0.75rem" }}>
            <span>Subtotal</span><span>₹ {total}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#666", marginBottom: "1rem" }}>
            <span>Shipping</span><span style={{ color: "#6fcf97" }}>Free</span>
          </div>
          <div style={{ borderTop: "1px solid #2E2E2E", paddingTop: "1rem", display: "flex", justifyContent: "space-between", fontSize: "1rem", fontWeight: 600, marginBottom: "1.5rem" }}>
            <span>Total</span><span style={{ color: "#D4A843" }}>₹ {total}</span>
          </div>
          <button onClick={placeOrder} disabled={!cart?.products?.length} style={{ background: "#D4A843", color: "#0F0F0F", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px", border: "none", borderRadius: "4px", cursor: "pointer", width: "100%", opacity: cart?.products?.length ? 1 : 0.5 }}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

const qtyBtnStyle = { background: "#252525", border: "none", color: "#FAFAF8", width: "36px", height: "36px", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" };

export default Cart;
