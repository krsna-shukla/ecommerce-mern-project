import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ search, setSearch }) {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black dark:bg-gray-950 text-white z-50 shadow-lg">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">

        {/* Top Row */}
        <div className="flex items-center justify-between">

          <h1 className="text-3xl font-bold text-blue-400">
            ShopEasy
          </h1>

          <div className="flex items-center gap-4">

            {/* Dark Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-2xl"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Mobile Menu */}
            <button
              className="md:hidden text-4xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 pl-10 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
            />

            <span className="absolute left-3 top-3">
              🔍
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center gap-8 mt-4 text-lg">

          {role === "admin" && (
            <>
              <Link to="/admin">Dashboard</Link>
              <Link to="/admin-products">Products</Link>
              <Link to="/add-product">Add Product</Link>
              <Link to="/admin/orders">Orders</Link>
            </>
          )}

          {role !== "admin" && (
            <>
              <Link to="/">Home</Link>

              {token && <Link to="/cart">Cart</Link>}

              {token && (
                <Link to="/myorders">My Orders</Link>
              )}
            </>
          )}

          {!token && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {token && (
            <button
              onClick={() => {
                sessionStorage.clear();
                window.location.href = "/";
              }}
              className="text-red-400"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center gap-5 mt-5 pb-4 text-xl">

            {role === "admin" && (
              <>
                <Link to="/admin" onClick={closeMenu}>
                  Dashboard
                </Link>

                <Link
                  to="/admin-products"
                  onClick={closeMenu}
                >
                  Products
                </Link>

                <Link
                  to="/add-product"
                  onClick={closeMenu}
                >
                  Add Product
                </Link>

                <Link
                  to="/admin/orders"
                  onClick={closeMenu}
                >
                  Orders
                </Link>
              </>
            )}

            {role !== "admin" && (
              <>
                <Link to="/" onClick={closeMenu}>
                  Home
                </Link>

                {token && (
                  <Link to="/cart" onClick={closeMenu}>
                    Cart
                  </Link>
                )}

                {token && (
                  <Link
                    to="/myorders"
                    onClick={closeMenu}
                  >
                    My Orders
                  </Link>
                )}
              </>
            )}

            {!token && (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}

            {token && (
              <button
                onClick={() => {
                  sessionStorage.clear();
                  window.location.href = "/";
                }}
                className="text-red-400"
              >
                Logout
              </button>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
