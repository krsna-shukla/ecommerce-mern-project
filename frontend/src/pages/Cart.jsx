import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "https://ecommerce-mern-project-dimt.onrender.com";

function PaymentModal({ total, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1=form, 2=processing, 3=success
  const [form, setForm] = useState({ name: "", card: "", expiry: "", cvv: "", address: "" });

  const handlePay = async (e) => {
    e.preventDefault();
    setStep(2);
    await new Promise(r => setTimeout(r, 2000));
    await onSuccess();
    setStep(3);
  };

  const inputStyle = { background: "#252525", border: "1px solid #2E2E2E", color: "#FAFAF8", padding: "10px 14px", borderRadius: "6px", fontSize: "0.85rem", outline: "none", width: "100%", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" };
  const labelStyle = { fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "12px", padding: "2rem", width: "100%", maxWidth: "480px", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
        
        {step !== 3 && (
          <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "#252525", border: "1px solid #2E2E2E", color: "#999", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem" }}>✕</button>
        )}

        {step === 1 && (
          <>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", marginBottom: "0.4rem" }}>Secure Checkout</h2>
            <p style={{ color: "#666", fontSize: "0.82rem", marginBottom: "1.25rem" }}>Complete your purchase</p>

            {/* Order Total Banner */}
            <div style={{ background: "#252525", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em" }}>Order Total</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#D4A843", marginTop: "2px" }}>₹ {total}</p>
              </div>
              <span style={{ fontSize: "1.5rem" }}>🛒</span>
            </div>

            <form onSubmit={handlePay} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Cardholder Name</label>
                <input placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={inputStyle}
                  onFocus={e => e.target.style.borderColor="#D4A843"} onBlur={e => e.target.style.borderColor="#2E2E2E"} />
              </div>
              <div>
                <label style={labelStyle}>Card Number</label>
                <input placeholder="4242 4242 4242 4242" value={form.card}
                  onChange={e => setForm({...form, card: e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19)})}
                  required maxLength={19} style={inputStyle}
                  onFocus={e => e.target.style.borderColor="#D4A843"} onBlur={e => e.target.style.borderColor="#2E2E2E"} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Expiry</label>
                  <input placeholder="MM/YY" value={form.expiry} onChange={e => setForm({...form, expiry: e.target.value})} required maxLength={5} style={inputStyle}
                    onFocus={e => e.target.style.borderColor="#D4A843"} onBlur={e => e.target.style.borderColor="#2E2E2E"} />
                </div>
                <div>
                  <label style={labelStyle}>CVV</label>
                  <input placeholder="123" type="password" value={form.cvv} onChange={e => setForm({...form, cvv: e.target.value})} required maxLength={3} style={inputStyle}
                    onFocus={e => e.target.style.borderColor="#D4A843"} onBlur={e => e.target.style.borderColor="#2E2E2E"} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Delivery Address</label>
                <textarea placeholder="Enter your full address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} required rows={2}
                  style={{...inputStyle, resize: "none"}}
                  onFocus={e => e.target.style.borderColor="#D4A843"} onBlur={e => e.target.style.borderColor="#2E2E2E"} />
              </div>
              <div style={{ background: "#252525", borderRadius: "6px", padding: "10px 14px", fontSize: "0.75rem", color: "#666", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#D4A843" }}>🔒</span> This is a demo payment. No real charges will be made.
              </div>
              <button type="submit" style={{ background: "#D4A843", color: "#0F0F0F", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Pay ₹ {total}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem", display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</div>
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
              <p style={{ fontSize: "0.8rem", color: "#999" }}>Amount Paid</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#D4A843" }}>₹ {total}</p>
            </div>
            <button onClick={onClose} style={{ background: "#D4A843", color: "#0F0F0F", fontWeight: 600, padding: "12px 28px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}>
              View My Orders
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Cart() {
  const [cart, setCart] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();

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

  // Called by PaymentModal after processing animation
  const placeOrder = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await API.post("/orders", {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchCart();
    } catch (error) { console.log(error); }
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
    navigate("/myorders");
  };

  useEffect(() => { fetchCart(); }, []);

  const total = cart?.products?.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0;

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", color: "#FAFAF8", paddingTop: "64px" }}>

      {showPayment && (
        <PaymentModal
          total={total}
          onClose={handlePaymentClose}
          onSuccess={placeOrder}
        />
      )}

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
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #2E2E2E", borderRadius: "6px", overflow: "hidden", width: "fit-content" }}>
                    <button onClick={() => updateQuantity(item.product._id, "decrease")} style={qtyBtnStyle}>−</button>
                    <span style={{ background: "#1A1A1A", color: "#FAFAF8", borderLeft: "1px solid #2E2E2E", borderRight: "1px solid #2E2E2E", width: "44px", textAlign: "center", fontSize: "0.9rem", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.quantity}
                    </span>
                    <button onClick={() => updateQuantity(item.product._id, "increase")} style={qtyBtnStyle}>+</button>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
                  <span style={{ fontSize: "1rem", fontWeight: 600, color: "#D4A843" }}>₹ {item.product.price * item.quantity}</span>
                  <button onClick={() => removeFromCart(item.product._id)}
                    style={{ background: "none", border: "1px solid #2E2E2E", color: "#999", padding: "6px 14px", borderRadius: "4px", cursor: "pointer", fontSize: "0.78rem" }}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
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
          <button
            onClick={() => setShowPayment(true)}
            disabled={!cart?.products?.length}
            style={{ background: "#D4A843", color: "#0F0F0F", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px", border: "none", borderRadius: "4px", cursor: "pointer", width: "100%", opacity: cart?.products?.length ? 1 : 0.5 }}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}

const qtyBtnStyle = { background: "#252525", border: "none", color: "#FAFAF8", width: "36px", height: "36px", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" };

export default Cart;
