import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-lg">

      <div className="max-w-7xl mx-auto px-4">

        {/* Top Row */}
        <div className="flex items-center justify-between h-16">

          <h1 className="text-3xl font-bold text-blue-400">
            ShopEasy
          </h1>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">

            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 pl-10 rounded text-black"
              />

              <span className="absolute left-3 top-2">
                🔍
              </span>
            </div>

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
                {token && <Link to="/myorders">My Orders</Link>}
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
                onClick={logout}
                className="text-red-400"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4">

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 pl-10 rounded text-black"
              />

              <span className="absolute left-3 top-3">
                🔍
              </span>
            </div>

            <div className="flex flex-col gap-3 text-center">

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
                  {token && <Link to="/myorders">My Orders</Link>}
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
                  onClick={logout}
                  className="text-red-400"
                >
                  Logout
                </button>
              )}

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
