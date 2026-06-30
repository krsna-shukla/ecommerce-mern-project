import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const { data } = await API.get("/orders", { headers: { Authorization: `Bearer ${token}` } });
      setOrders(data);
    } catch (error) { console.log(error); }
  };

  const updateStatus = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      await API.put(`/orders/${id}`, { status: "Shipped" }, { headers: { Authorization: `Bearer ${token}` } });
      setOrders(orders.map((o) => o._id === id ? { ...o, status: "Shipped" } : o));
    } catch (error) { console.log(error); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", color: "#FAFAF8", paddingTop: "64px" }}>
      <div className="page-header" style={{ padding: "2.5rem 2rem 0", borderBottom: "1px solid #2E2E2E", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "0.5rem" }}>Admin Orders</h1>
        <p style={{ color: "#666", fontSize: "0.85rem", paddingBottom: "1.5rem" }}>{orders.length} total orders</p>
      </div>

      <div className="page-content" style={{ padding: "0 2rem 4rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {orders.map((order) => (
          <div key={order._id} style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.5rem" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div>
                <p style={{ fontWeight: 500, fontSize: "0.95rem" }}>User: {order.user?.name}</p>
                <p style={{ color: "#666", fontSize: "0.8rem" }}>{order.user?.email}</p>
              </div>
              <span style={{
                fontSize: "0.72rem", fontWeight: 600, padding: "5px 14px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.07em",
                ...(order.status === "Shipped" ? { background: "rgba(45,106,79,.25)", color: "#6fcf97" } : { background: "rgba(212,168,67,.15)", color: "#D4A843" }),
              }}>
                {order.status}
              </span>
            </div>

            {/* Products */}
            <div style={{ borderTop: "1px solid #2E2E2E", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {order.products.map((item) => (
                <div key={item._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 500 }}>{item.product?.name || "Product Deleted"}</p>
                    <p style={{ fontSize: "0.75rem", color: "#666" }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ color: "#D4A843", fontWeight: 600 }}>₹ {item.product?.price || 0}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ borderTop: "1px solid #2E2E2E", marginTop: "1rem", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.06em" }}>Order Total</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#D4A843", fontWeight: 600 }}>₹ {order.totalPrice}</p>
              </div>
              {order.status !== "Shipped" && (
                <button
                  onClick={() => updateStatus(order._id)}
                  style={{ background: "#D4A843", color: "#0F0F0F", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "10px 22px", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Mark Shipped
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
