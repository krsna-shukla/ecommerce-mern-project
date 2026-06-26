import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ search, setSearch }) {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "shadow-2xl" : ""
      }`}
      style={{
        background: "#1A1A1A",
        borderBottom: "1px solid #2E2E2E",
        height: "64px",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        gap: "1.5rem",
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.4rem",
            color: "#D4A843",
            letterSpacing: "0.03em",
          }}
        >
          ShopEasy
        </span>
      </Link>

      {/* Search Bar */}
      <div
        style={{
          flex: 1,
          maxWidth: "420px",
          display: "flex",
          alignItems: "center",
          background: "#252525",
          border: "1px solid #2E2E2E",
          borderRadius: "8px",
          padding: "7px 14px",
          gap: "8px",
        }}
      >
        <span style={{ color: "#666", fontSize: "0.9rem" }}>🔍</span>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "none",
            border: "none",
            color: "#FAFAF8",
            fontSize: "0.85rem",
            outline: "none",
            width: "100%",
          }}
        />
      </div>

      {/* Nav Links */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "2rem" }}>
        {role === "admin" ? (
          <>
            {[
              { to: "/admin", label: "Dashboard" },
              { to: "/admin-products", label: "Products" },
              { to: "/add-product", label: "Add Product" },
              { to: "/admin/orders", label: "Orders" },
            ].map(({ to, label }) => (
              <Link key={to} to={to} style={navLinkStyle}>
                {label}
              </Link>
            ))}
          </>
        ) : (
          <>
            <Link to="/" style={navLinkStyle}>Home</Link>
            {token && <Link to="/cart" style={navLinkStyle}>Cart</Link>}
            {token && <Link to="/myorders" style={navLinkStyle}>My Orders</Link>}
          </>
        )}

        {!token && (
          <>
            <Link to="/login" style={navLinkStyle}>Login</Link>
            <Link
              to="/register"
              style={{
                ...navLinkStyle,
                background: "#D4A843",
                color: "#0F0F0F",
                padding: "8px 20px",
                borderRadius: "4px",
                fontWeight: "600",
              }}
            >
              Register
            </Link>
          </>
        )}

        {token && (
          <button
            onClick={() => {
              sessionStorage.clear();
              window.location.href = "/login";
            }}
            style={{
              ...navLinkStyle,
              background: "none",
              border: "1px solid #2E2E2E",
              padding: "7px 18px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const navLinkStyle = {
  color: "#999",
  fontSize: "0.82rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  textDecoration: "none",
  transition: "color 0.2s",
  fontFamily: "'Inter', sans-serif",
};

export default Navbar;
