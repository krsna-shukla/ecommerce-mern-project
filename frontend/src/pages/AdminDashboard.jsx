import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const productsRes = await API.get("/products");

      const ordersRes = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalPrice,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-8 lg:px-10 pt-44 lg:pt-28">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center lg:text-left mb-8">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-gray-500 text-lg">
            Total Products
          </h2>

          <p className="text-5xl font-bold text-blue-600 mt-4">
            {products.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-gray-500 text-lg">
            Total Orders
          </h2>

          <p className="text-5xl font-bold text-green-600 mt-4">
            {orders.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-gray-500 text-lg">
            Revenue
          </h2>

          <p className="text-4xl md:text-5xl font-bold text-red-500 mt-4 break-words">
            ₹ {totalRevenue}
          </p>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-4">
          Recent Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">
            No Orders Found
          </p>
        ) : (
          <div className="space-y-4">

            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="border rounded-xl p-4 flex flex-col md:flex-row md:justify-between gap-3"
              >
                <div>
                  <p className="font-semibold">
                    Order ID:
                  </p>

                  <p className="text-gray-500 text-sm break-all">
                    {order._id}
                  </p>
                </div>

                <div>
                  <p className="font-semibold">
                    Amount
                  </p>

                  <p className="text-blue-600 font-bold">
                    ₹ {order.totalPrice}
                  </p>
                </div>

                <div>
                  <p className="font-semibold">
                    Status
                  </p>

                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      order.status === "Shipped"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminDashboard;
