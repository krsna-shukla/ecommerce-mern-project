import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const { data } = await API.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Orders:", data);
        setOrders(data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchOrders();
  }, []);

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
    <div className="max-w-6xl mx-auto p-10 pt-32 md:pt-24">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Admin Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-md p-6 bg-white"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-bold text-lg">
                  User: {order.user?.name}
                </h2>

                <p className="text-gray-600">
                  {order.user?.email}
                </p>
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded text-white ${
                    order.status === "Shipped"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {order.products.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b pb-2"
                >
                  <div>
                    <h3 className="font-semibold">
                      {item.product?.name || "Product Deleted"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold">
                    ₹ {item.product?.price || 0}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <h2 className="text-xl font-bold">
                Total: ₹ {order.totalPrice}
              </h2>

              {order.status !== "Shipped" && (
                <button
                  onClick={() => updateStatus(order._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
