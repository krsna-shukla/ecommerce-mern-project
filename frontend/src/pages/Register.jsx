import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "12px", padding: "2.5rem", width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#D4A843", marginBottom: "0.5rem" }}>ShopEasy</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#FAFAF8" }}>Create Account</h1>
          <p style={{ color: "#666", fontSize: "0.85rem", marginTop: "0.4rem" }}>Join thousands of happy shoppers</p>
        </div>

        {error && (
          <div style={{ background: "rgba(155,34,38,0.15)", border: "1px solid rgba(155,34,38,0.4)", color: "#e74c3c", padding: "10px 14px", borderRadius: "6px", fontSize: "0.82rem", marginBottom: "1.25rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { label: "Full Name", type: "text", placeholder: "Enter name", value: name, set: setName },
            { label: "Email Address", type: "email", placeholder: "Enter email", value: email, set: setEmail },
            { label: "Password", type: "password", placeholder: "Enter password", value: password, set: setPassword },
          ].map(({ label, type, placeholder, value, set }) => (
            <div key={label}>
              <label style={labelStyle}>{label}</label>
              <input type={type} placeholder={placeholder} value={value} onChange={(e) => set(e.target.value)} required style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = "#D4A843"}
                onBlur={(e) => e.target.style.borderColor = "#2E2E2E"} />
            </div>
          ))}
          <button type="submit" disabled={loading} style={{ background: "#D4A843", color: "#0F0F0F", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "13px", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "0.5rem" }}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.82rem", color: "#666" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#D4A843", textDecoration: "none" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const labelStyle = { fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" };
const inputStyle = { background: "#252525", border: "1px solid #2E2E2E", color: "#FAFAF8", padding: "10px 14px", borderRadius: "6px", fontSize: "0.85rem", outline: "none", width: "100%", transition: "border-color 0.2s", fontFamily: "'Inter', sans-serif" };

export default Register;
