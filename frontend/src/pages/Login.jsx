import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await API.post("/auth/login", { email, password });
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div className="form-card" style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "12px", padding: "2.5rem", width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#D4A843", marginBottom: "0.5rem" }}>ShopEasy</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#FAFAF8" }}>Welcome Back</h1>
          <p style={{ color: "#666", fontSize: "0.85rem", marginTop: "0.4rem" }}>Sign in to your account</p>
        </div>

        {error && (
          <div style={{ background: "rgba(155,34,38,0.15)", border: "1px solid rgba(155,34,38,0.4)", color: "#e74c3c", padding: "10px 14px", borderRadius: "6px", fontSize: "0.82rem", marginBottom: "1.25rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = "#D4A843"}
              onBlur={(e) => e.target.style.borderColor = "#2E2E2E"} />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = "#D4A843"}
              onBlur={(e) => e.target.style.borderColor = "#2E2E2E"} />
          </div>
          <button type="submit" disabled={loading} style={{ background: "#D4A843", color: "#0F0F0F", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "13px", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "0.5rem" }}>
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.82rem", color: "#666" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#D4A843", textDecoration: "none" }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const labelStyle = { fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" };
const inputStyle = { background: "#252525", border: "1px solid #2E2E2E", color: "#FAFAF8", padding: "10px 14px", borderRadius: "6px", fontSize: "0.85rem", outline: "none", width: "100%", transition: "border-color 0.2s", fontFamily: "'Inter', sans-serif" };

export default Login;
