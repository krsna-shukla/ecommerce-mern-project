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
      const token = localStorage.getItem("token");

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
    <div className="min-h-screen bg-gray-100 p-10 pt-28">
      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-gray-500">
            Total Products
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            {products.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-gray-500">
            Total Orders
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {orders.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-gray-500">
            Revenue
          </h2>

          <p className="text-4xl font-bold text-red-500 mt-3">
            ₹ {totalRevenue}
          </p>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;