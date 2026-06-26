import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const [pRes, oRes] = await Promise.all([
        API.get("/products"),
        API.get("/orders", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setProducts(pRes.data);
      setOrders(oRes.data);
    } catch (error) { console.log(error); }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  const statusStyle = (status) => ({
    fontSize: "0.7rem", fontWeight: 600, padding: "4px 12px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.07em",
    ...(status === "Shipped" ? { background: "rgba(45,106,79,.25)", color: "#6fcf97" } : { background: "rgba(212,168,67,.15)", color: "#D4A843" }),
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", color: "#FAFAF8", paddingTop: "64px" }}>
      <div style={{ padding: "2.5rem 2rem 0", borderBottom: "1px solid #2E2E2E", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "0.5rem" }}>Admin Dashboard</h1>
        <p style={{ color: "#666", fontSize: "0.85rem", paddingBottom: "1.5rem" }}>Overview of your store</p>
      </div>

      <div style={{ padding: "0 2rem 4rem" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
          {[
            { label: "Total Products", value: products.length, color: "#7EB8F7" },
            { label: "Total Orders", value: orders.length, color: "#6fcf97" },
            { label: "Revenue", value: `₹ ${totalRevenue}`, color: "#D4A843" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.5rem" }}>
              <p style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{label}</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color, fontWeight: 600 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", marginBottom: "1.5rem" }}>Recent Orders</h2>
          {orders.length === 0 ? (
            <p style={{ color: "#666" }}>No orders found</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {orders.slice(0, 5).map((order) => (
                <div key={order._id} style={{ border: "1px solid #2E2E2E", borderRadius: "6px", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                  <div>
                    <p style={{ fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.06em" }}>Order ID</p>
                    <p style={{ fontSize: "0.8rem", color: "#999", fontFamily: "monospace" }}>{order._id}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "0.72rem", color: "#666" }}>Amount</p>
                    <p style={{ color: "#D4A843", fontWeight: 600 }}>₹ {order.totalPrice}</p>
                  </div>
                  <span style={statusStyle(order.status)}>{order.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
