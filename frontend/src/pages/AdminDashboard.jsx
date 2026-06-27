import { useEffect, useState } from "react";
import API from "../services/api";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const GOLD = "#D4A843";
const COLORS = [GOLD, "#7EB8F7", "#6fcf97", "#e74c3c", "#C8A97E"];

function StatCard({ label, value, color, sub }) {
  return (
    <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.5rem" }}>
      <p style={{ fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{label}</p>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color, fontWeight: 600 }}>{value}</p>
      {sub && <p style={{ fontSize: "0.75rem", color: "#666", marginTop: "4px" }}>{sub}</p>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#252525", border: "1px solid #2E2E2E", borderRadius: "6px", padding: "10px 14px" }}>
        <p style={{ fontSize: "0.75rem", color: "#999", marginBottom: "4px" }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ fontSize: "0.85rem", color: p.color || GOLD, fontWeight: 600 }}>
            {p.name}: {p.name === "Revenue" ? `₹ ${p.value}` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

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
    } catch (e) { console.log(e); }
  };

  const totalRevenue = orders.reduce((s, o) => s + o.totalPrice, 0);
  const shippedOrders = orders.filter(o => o.status === "Shipped").length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;

  // Revenue per day (last 7 days using order createdAt)
  const revenueByDay = (() => {
    const days = {};
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      days[key] = 0;
    }
    orders.forEach(o => {
      const key = new Date(o.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      if (days[key] !== undefined) days[key] += o.totalPrice;
    });
    return Object.entries(days).map(([date, Revenue]) => ({ date, Revenue }));
  })();

  // Category breakdown
  const categoryData = (() => {
    const cats = {};
    products.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
    return Object.entries(cats).map(([name, value]) => ({ name, value }));
  })();

  // Orders by status
  const statusData = [
    { name: "Shipped", value: shippedOrders },
    { name: "Pending", value: pendingOrders },
  ];

  const statusStyle = (s) => ({
    fontSize: "0.7rem", fontWeight: 600, padding: "4px 12px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.07em",
    ...(s === "Shipped" ? { background: "rgba(45,106,79,.25)", color: "#6fcf97" } : { background: "rgba(212,168,67,.15)", color: GOLD }),
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", color: "#FAFAF8", paddingTop: "64px" }}>
      <div style={{ padding: "2.5rem 2rem 0", borderBottom: "1px solid #2E2E2E", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "0.5rem" }}>Admin Dashboard</h1>
        <p style={{ color: "#666", fontSize: "0.85rem", paddingBottom: "1.5rem" }}>Store analytics & overview</p>
      </div>

      <div style={{ padding: "0 2rem 4rem" }}>
        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
          <StatCard label="Total Products" value={products.length} color="#7EB8F7" />
          <StatCard label="Total Orders" value={orders.length} color="#6fcf97" />
          <StatCard label="Revenue" value={`₹ ${totalRevenue.toLocaleString()}`} color={GOLD} />
          <StatCard label="Pending Orders" value={pendingOrders} color="#e74c3c" sub={`${shippedOrders} shipped`} />
        </div>

        {/* Charts Row 1 */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
          {/* Revenue Area Chart */}
          <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", marginBottom: "1.5rem" }}>Revenue — Last 7 Days</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueByDay}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={GOLD} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
                <XAxis dataKey="date" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="Revenue" stroke={GOLD} strokeWidth={2} fill="url(#goldGrad)" dot={{ fill: GOLD, strokeWidth: 0, r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Order Status Pie */}
          <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", marginBottom: "1.5rem" }}>Order Status</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                  {statusData.map((_, i) => <Cell key={i} fill={[GOLD, "#7EB8F7"][i]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(v) => <span style={{ color: "#999", fontSize: "0.78rem" }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.25rem", marginBottom: "2rem" }}>
          {/* Category Bar */}
          <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", marginBottom: "1.5rem" }}>Products by Category</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#999", fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Products" radius={[0, 4, 4, 0]}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Orders */}
          <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", marginBottom: "1.5rem" }}>Recent Orders</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {orders.length === 0 ? (
                <p style={{ color: "#666", fontSize: "0.85rem" }}>No orders found</p>
              ) : orders.slice(0, 5).map((order) => (
                <div key={order._id} style={{ border: "1px solid #2E2E2E", borderRadius: "6px", padding: "0.875rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: "0.72rem", color: "#666" }}>Order ID</p>
                    <p style={{ fontSize: "0.78rem", color: "#999", fontFamily: "monospace" }}>{order._id.slice(-8)}</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "0.72rem", color: "#666" }}>User</p>
                    <p style={{ fontSize: "0.8rem" }}>{order.user?.name || "—"}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={statusStyle(order.status)}>{order.status}</span>
                    <p style={{ color: GOLD, fontWeight: 600, marginTop: "4px" }}>₹ {order.totalPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
