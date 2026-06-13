import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar({ search, setSearch }) {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-lg">

      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* Top Row */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-3xl font-bold text-blue-400">
            ShopEasy
          </h1>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

        {/* Search Bar */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-10 rounded-md bg-white text-black"
          />

          <span className="absolute left-3 top-3">
            🔍
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-wrap justify-center gap-6 mt-4 text-lg items-center">

          {role === "admin" && (
            <>
              <Link to="/admin" className="hover:text-blue-400">
                Dashboard
              </Link>

              <Link
                to="/admin-products"
                className="hover:text-blue-400"
              >
                Products
              </Link>

              <Link
                to="/add-product"
                className="hover:text-blue-400"
              >
                Add Product
              </Link>

              <Link
                to="/admin/orders"
                className="hover:text-blue-400"
              >
                Orders
              </Link>
            </>
          )}

          {role !== "admin" && (
            <>
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>

              {token && (
                <Link
                  to="/cart"
                  className="hover:text-blue-400"
                >
                  Cart
                </Link>
              )}

              {token && (
                <Link
                  to="/myorders"
                  className="hover:text-blue-400"
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
                className="hover:text-blue-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-blue-400"
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
              className="hover:text-red-400"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4 text-center bg-gray-900 rounded-lg p-4">

            {role === "admin" && (
              <>
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>

                <Link
                  to="/admin-products"
                  onClick={() => setMenuOpen(false)}
                >
                  Products
                </Link>

                <Link
                  to="/add-product"
                  onClick={() => setMenuOpen(false)}
                >
                  Add Product
                </Link>

                <Link
                  to="/admin/orders"
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                </Link>
              </>
            )}

            {role !== "admin" && (
              <>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>

                {token && (
                  <Link
                    to="/cart"
                    onClick={() => setMenuOpen(false)}
                  >
                    Cart
                  </Link>
                )}

                {token && (
                  <Link
                    to="/myorders"
                    onClick={() => setMenuOpen(false)}
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
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
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
