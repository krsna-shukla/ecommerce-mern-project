import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/cart",
        {
          product: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart");
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  if (!product) {
    return (
      <h1 className="text-center pt-32 text-3xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="pt-28 px-10">

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-10 grid md:grid-cols-2 gap-10">

        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-full h-[450px] object-cover rounded-2xl"
        />

        <div>

          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            {product.description}
          </p>

          <h2 className="text-4xl text-blue-500 font-bold mt-8">
            ₹ {product.price}
          </h2>

          <button
            onClick={addToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl mt-8"
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;