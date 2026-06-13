import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const { data } = await API.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const updateStatus = async (id) => {
    try {
      const token = sessionStorage.getItem("token");

      await API.put(
        `/orders/${id}`,
        { status: "Shipped" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(
        orders.map((order) =>
          order._id === id
            ? { ...order, status: "Shipped" }
            : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-8 py-6 pt-40 lg:pt-28">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Admin Orders
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-lg p-5 md:p-6"
          >

            {/* User Info */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5">

              <div>
                <h2 className="font-bold text-xl">
                  User: {order.user?.name}
                </h2>

                <p className="text-gray-500 break-all">
                  {order.user?.email}
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-lg text-white text-center w-fit ${
                  order.status === "Shipped"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                {order.status}
              </span>

            </div>

            {/* Products */}
            <div className="space-y-3">

              {order.products.map((item) => (
                <div
                  key={item._id}
                  className="border-b pb-3 flex justify-between items-center gap-4"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {item.product?.name || "Product Deleted"}
                    </h3>

                    <p className="text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-blue-600 whitespace-nowrap">
                    ₹ {item.product?.price || 0}
                  </p>
                </div>
              ))}

            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-5">

              <h2 className="text-2xl font-bold">
                Total: ₹ {order.totalPrice}
              </h2>

              {order.status !== "Shipped" && (
                <button
                  onClick={() => updateStatus(order._id)}
                  className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl"
                >
                  Mark Shipped
                </button>
              )}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default AdminOrders;
