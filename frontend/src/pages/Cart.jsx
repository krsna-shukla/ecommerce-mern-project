import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cart, setCart] = useState(null);

  const BACKEND_URL =
    "https://ecommerce-mern-project-dimt.onrender.com";

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.message);
    }
  };

  const updateQuantity = async (productId, action) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        "/cart/update",
        {
          productId,
          action,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete("/cart/remove", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/orders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Placed Successfully!");
      fetchCart();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10 pt-24">
      <h1 className="text-4xl font-bold text-center mb-10">
        My Cart
      </h1>

      {cart?.products?.length === 0 ? (
        <div className="text-center text-2xl text-gray-500">
          Cart is Empty
        </div>
      ) : (
        <div className="space-y-6">
          {cart?.products?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
            >
              <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
                <img
                  src={`${BACKEND_URL}${item.product.image}`}
                  alt={item.product.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />

                <div>
                  <h2 className="text-2xl font-bold">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-500">
                    ₹ {item.product.price}
                  </p>

                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          "decrease"
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      -
                    </button>

                    <span className="text-xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          "increase"
                        )
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-3 justify-center">
                <button
                  onClick={() =>
                    removeFromCart(item.product._id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                >
                  Remove
                </button>

                <button
                  onClick={placeOrder}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl"
                >
                  Place Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
