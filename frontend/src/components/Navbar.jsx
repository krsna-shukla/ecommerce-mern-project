import { Link } from "react-router-dom";

function Navbar({ search, setSearch }) {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-lg">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">

        {/* Desktop */}
        <div className="hidden md:flex items-center">

          <h1 className="text-3xl font-bold text-blue-400">
            ShopEasy
          </h1>

          <div className="relative flex-1 mx-10">
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

          <div className="flex gap-6 text-lg items-center">

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
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-4">

          <h1 className="text-4xl font-bold text-blue-400 text-center">
            ShopEasy
          </h1>

          <div className="relative">
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

          <div className="flex flex-wrap justify-center gap-5 text-lg">

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
                  <Link to="/myorders">
                    My Orders
                  </Link>
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

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
