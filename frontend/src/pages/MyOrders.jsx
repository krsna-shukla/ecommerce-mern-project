import { useEffect, useState } from "react";
import API from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const { data } = await API.get("/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 pt-32 md:pt-24">
      <h1 className="text-4xl font-bold text-center mb-8">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold mb-2">
              Order ID: {order._id}
            </h2>

            <p className="text-green-600 font-semibold mb-3">
              Status: {order.status}
            </p>

            <div className="space-y-4">
              {order.products.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div>
                    <h3 className="font-bold">
                      {item.product.name}
                    </h3>

                    <p>Qty: {item.quantity}</p>
                  </div>

                  <p className="font-bold text-blue-600">
                    ₹ {item.product.price}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="text-right text-2xl font-bold mt-4">
              Total: ₹ {order.totalPrice}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
