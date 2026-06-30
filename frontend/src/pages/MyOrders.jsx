import { useEffect, useState } from "react";
import API from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const { data } = await API.get("/orders/myorders", { headers: { Authorization: `Bearer ${token}` } });
      setOrders(data);
    } catch (error) { console.log(error); }
  };

  const statusStyle = (status) => ({
    fontSize: "0.72rem", fontWeight: 600, padding: "4px 14px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.07em",
    ...(status === "Shipped"
      ? { background: "rgba(212,168,67,.15)", color: "#D4A843" }
      : { background: "rgba(52,120,246,.15)", color: "#7EB8F7" }),
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", color: "#FAFAF8", paddingTop: "64px" }}>
      <div className="page-header" style={{ padding: "2.5rem 2rem 0", borderBottom: "1px solid #2E2E2E", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "0.5rem" }}>My Orders</h1>
        <p style={{ color: "#666", fontSize: "0.85rem", paddingBottom: "1.5rem" }}>{orders.length} order(s) placed</p>
      </div>

      <div className="page-content" style={{ padding: "0 2rem 4rem", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {orders.length === 0 ? (
          <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "3rem", textAlign: "center", color: "#666" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📦</div>
            <p>No orders placed yet</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em" }}>Order ID</p>
                  <p style={{ fontSize: "0.82rem", color: "#999", fontFamily: "monospace" }}>{order._id}</p>
                </div>
                <span style={statusStyle(order.status)}>{order.status}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px solid #2E2E2E", paddingTop: "1rem" }}>
                {order.products.map((item) => (
                  <div key={item._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: "0.88rem", fontWeight: 500 }}>{item.product.name}</p>
                      <p style={{ fontSize: "0.75rem", color: "#666" }}>Qty: {item.quantity}</p>
                    </div>
                    <span style={{ color: "#D4A843", fontWeight: 600 }}>₹ {item.product.price}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "1rem", borderTop: "1px solid #2E2E2E", marginTop: "1rem" }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em" }}>Order Total</p>
                  <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#D4A843" }}>₹ {order.totalPrice}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyOrders;
