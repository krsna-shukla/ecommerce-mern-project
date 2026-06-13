import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


function Navbar({ search, setSearch }) {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

const [darkMode, setDarkMode] = useState(
  sessionStorage.getItem("theme") === "dark"
);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  sessionStorage.setItem("theme", darkMode ? "dark" : "light");
}, [darkMode]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black dark:bg-gray-950 text-white px-4 md:px-8 py-4 flex flex-col md:flex-row items-center z-50 shadow-lg gap-4">

      {/* Logo */}
      <h1 className="text-3xl font-bold text-blue-400">
        ShopEasy
      </h1>

      {/* Search Bar */}
      <div className="relative w-full md:flex-1 md:mx-10">
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

      {/* Navigation */}
      <div className="flex flex-wrap justify-center gap-4 text-sm md:text-lg items-center">

        {/* ADMIN NAVBAR */}
        {role === "admin" && (
          <>
            <Link
              to="/admin"
              className="hover:text-blue-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/admin-products"
              className="hover:text-blue-400 transition"
            >
              Products
            </Link>

            <Link
              to="/add-product"
              className="hover:text-blue-400 transition"
            >
              Add Product
            </Link>

            <Link
              to="/admin/orders"
              className="hover:text-blue-400 transition"
            >
              Orders
            </Link>
          </>
        )}

        {/* USER NAVBAR */}
        {role !== "admin" && (
          <>
            <Link
              to="/"
              className="hover:text-blue-400 transition"
            >
              Home
            </Link>

            {token && (
              <Link
                to="/cart"
                className="hover:text-blue-400 transition"
              >
                Cart
              </Link>
            )}

            {token && (
              <Link
                to="/myorders"
                className="hover:text-blue-400 transition"
              >
                My Orders
              </Link>
            )}
          </>
        )}

        {/* LOGIN / REGISTER */}
        {!token && (
          <>
            <Link
              to="/login"
              className="hover:text-blue-400 transition"
            >
              Login
            </Link>

<Link
  to="/register"
  className="hover:text-blue-400 transition"
>
  Register
</Link>

<button
  onClick={() => setDarkMode(!darkMode)}
  className="text-xl hover:text-yellow-400 transition"
>
  {darkMode ? "☀️" : "🌙"}
</button>
          </>
        )}

        {/* LOGOUT */}
        {token && (
          <button
  onClick={() => {
    sessionStorage.clear();
    window.location.href = "/login";
  }}
  className="hover:text-red-400 transition"
>
  Logout
</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
