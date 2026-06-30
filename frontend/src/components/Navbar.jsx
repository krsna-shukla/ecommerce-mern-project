import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ search, setSearch }) {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [navigate]);

  const links = role === "admin"
    ? [
        { to: "/admin", label: "Dashboard" },
        { to: "/admin-products", label: "Products" },
        { to: "/add-product", label: "Add Product" },
        { to: "/admin/orders", label: "Orders" },
      ]
    : [
        { to: "/", label: "Home" },
        ...(token ? [{ to: "/cart", label: "Cart" }] : []),
        ...(token ? [{ to: "/wishlist", label: "♥ Wishlist", gold: true }] : []),
        ...(token ? [{ to: "/myorders", label: "My Orders" }] : []),
      ];

  return (
    <>
      <nav className="navbar-main" style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50,
        background: "#1A1A1A",
        borderBottom: "1px solid #2E2E2E",
        height: "64px",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        gap: "1.5rem",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.5)" : "none",
        boxSizing: "border-box",
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#D4A843", letterSpacing: "0.03em" }}>
            ShopEasy
          </span>
        </Link>

        {/* Search Bar - hidden on mobile, shown in drawer instead */}
        <div className="navbar-search-desktop" style={{ flex: 1, maxWidth: "420px", display: "flex", alignItems: "center", background: "#252525", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "7px 14px", gap: "8px" }}>
          <span style={{ color: "#666", fontSize: "0.9rem" }}>🔍</span>
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ background: "none", border: "none", color: "#FAFAF8", fontSize: "0.85rem", outline: "none", width: "100%" }} />
        </div>

        {/* Desktop Nav Links */}
        <div className="navbar-links-desktop" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1.75rem" }}>
          {links.map(({ to, label, gold }) => (
            <Link key={to} to={to} style={gold ? { ...navLinkStyle, color: "#D4A843" } : navLinkStyle}>{label}</Link>
          ))}

          {!token && (
            <>
              <Link to="/login" style={navLinkStyle}>Login</Link>
              <Link to="/register" style={{ ...navLinkStyle, background: "#D4A843", color: "#0F0F0F", padding: "8px 20px", borderRadius: "4px", fontWeight: "600" }}>Register</Link>
            </>
          )}

          {token && (
            <button onClick={() => { sessionStorage.clear(); window.location.href = "/login"; }}
              style={{ ...navLinkStyle, background: "none", border: "1px solid #2E2E2E", padding: "7px 18px", borderRadius: "4px", cursor: "pointer" }}>
              Logout
            </button>
          )}
        </div>

        {/* Mobile: search icon + hamburger */}
        <div className="navbar-mobile-controls" style={{ marginLeft: "auto", display: "none", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", color: "#FAFAF8", fontSize: "1.4rem", cursor: "pointer", padding: "4px 8px" }}
            aria-label="Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className="navbar-mobile-drawer"
        style={{
          display: "none",
          position: "fixed",
          top: "64px",
          left: 0,
          width: "100%",
          maxHeight: menuOpen ? "calc(100vh - 64px)" : "0",
          overflow: "hidden",
          background: "#1A1A1A",
          borderBottom: menuOpen ? "1px solid #2E2E2E" : "none",
          zIndex: 49,
          transition: "max-height 0.25s ease",
        }}
      >
        <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Search inside drawer */}
          <div style={{ display: "flex", alignItems: "center", background: "#252525", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "10px 14px", gap: "8px" }}>
            <span style={{ color: "#666", fontSize: "0.9rem" }}>🔍</span>
            <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ background: "none", border: "none", color: "#FAFAF8", fontSize: "0.9rem", outline: "none", width: "100%" }} />
          </div>

          {links.map(({ to, label, gold }) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}
              style={{ ...mobileLinkStyle, color: gold ? "#D4A843" : "#FAFAF8" }}>
              {label}
            </Link>
          ))}

          {!token && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} style={mobileLinkStyle}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}
                style={{ ...mobileLinkStyle, background: "#D4A843", color: "#0F0F0F", textAlign: "center", borderRadius: "6px", fontWeight: 600 }}>
                Register
              </Link>
            </>
          )}

          {token && (
            <button onClick={() => { sessionStorage.clear(); window.location.href = "/login"; }}
              style={{ ...mobileLinkStyle, background: "none", border: "1px solid #2E2E2E", borderRadius: "6px", cursor: "pointer", textAlign: "left" }}>
              Logout
            </button>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .navbar-search-desktop { display: none !important; }
          .navbar-links-desktop { display: none !important; }
          .navbar-mobile-controls { display: flex !important; }
          .navbar-mobile-drawer { display: block !important; }
          .navbar-main { padding: 0 1rem !important; }
        }
      `}</style>
    </>
  );
}

const navLinkStyle = { color: "#999", fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" };
const mobileLinkStyle = { color: "#FAFAF8", fontSize: "0.95rem", textDecoration: "none", padding: "10px 14px", fontFamily: "'Inter', sans-serif" };

export default Navbar;
