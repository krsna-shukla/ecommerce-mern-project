import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Home({ search }) {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
    alert("Please Login First");
    navigate("/login");
    return;
  }

      await API.post(
        "/cart",
        {
          product: productId,
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

  const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      {/* Banner */}
      <div className="pt-32 md:pt-24 px-6">
  <div className="relative">
    <img
      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop"
      alt="Sale Banner"
      className="w-full h-[350px] object-cover rounded-2xl"
    />

    <div className="absolute inset-0 bg-black/40 rounded-2xl flex flex-col justify-center pl-12">
      <h1 className="text-white text-5xl font-bold">
        Mega Sale 50% OFF
      </h1>

      <p className="text-white text-xl mt-3">
        Limited Time Offer
      </p>

      <button className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg w-fit">
        Shop Now
      </button>
    </div>
  </div>
</div>

{/* Categories */}
<div className="px-10 py-8">
  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
    Shop by Category
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

    <div
      onClick={() => setSelectedCategory("All")}
      className={`p-6 rounded-2xl shadow-md text-center cursor-pointer transition-all
      ${
        selectedCategory === "All"
          ? "bg-blue-100 ring-2 ring-blue-500"
          : "bg-white dark:bg-gray-800 dark:text-white hover:shadow-xl hover:-translate-y-2"
      }`}
    >
      <div className="text-5xl mb-2">🛍️</div>
      <h3 className="font-semibold">All</h3>
    </div>

    <div
      onClick={() => setSelectedCategory("Fashion")}
      className={`p-6 rounded-2xl shadow-md text-center cursor-pointer transition-all
      ${
        selectedCategory === "Fashion"
          ? "bg-blue-100 ring-2 ring-blue-500"
          : "bg-white dark:bg-gray-800 dark:text-white hover:shadow-xl hover:-translate-y-2"
      }`}
    >
      <div className="text-5xl mb-2">👕</div>
      <h3 className="font-semibold">Fashion</h3>
    </div>

    <div
      onClick={() => setSelectedCategory("Electronics")}
      className={`p-6 rounded-2xl shadow-md text-center cursor-pointer transition-all
      ${
        selectedCategory === "Electronics"
          ? "bg-blue-100 ring-2 ring-blue-500"
          : "bg-white dark:bg-gray-800 dark:text-white hover:shadow-xl hover:-translate-y-2"
      }`}
    >
      <div className="text-5xl mb-2">📱</div>
      <h3 className="font-semibold">Electronics</h3>
    </div>

    <div
      onClick={() => setSelectedCategory("Shoes")}
      className={`p-6 rounded-2xl shadow-md text-center cursor-pointer transition-all
      ${
        selectedCategory === "Shoes"
          ? "bg-blue-100 ring-2 ring-blue-500"
          : "bg-white dark:bg-gray-800 dark:text-white hover:shadow-xl hover:-translate-y-2"
      }`}
    >
      <div className="text-5xl mb-2">👟</div>
      <h3 className="font-semibold">Shoes</h3>
    </div>

    <div
      onClick={() => setSelectedCategory("Watches")}
      className={`p-6 rounded-2xl shadow-md text-center cursor-pointer transition-all
      ${
        selectedCategory === "Watches"
          ? "bg-blue-100 ring-2 ring-blue-500"
          : "bg-white dark:bg-gray-800 dark:text-white hover:shadow-xl hover:-translate-y-2"
      }`}
    >
      <div className="text-5xl mb-2">⌚</div>
      <h3 className="font-semibold">Watches</h3>
    </div>

    <div
      onClick={() => setSelectedCategory("Sports")}
      className={`p-6 rounded-2xl shadow-md text-center cursor-pointer transition-all
      ${
        selectedCategory === "Sports"
          ? "bg-blue-100 ring-2 ring-blue-500"
          : "bg-white dark:bg-gray-800 dark:text-white hover:shadow-xl hover:-translate-y-2"
      }`}
    >
      <div className="text-5xl mb-2">🏏</div>
      <h3 className="font-semibold">Sports</h3>
    </div>
  </div>
</div>

      {/* Heading */}
      <div className="px-16 mb-8">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  🔥 Trending Products
</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch gap-8 px-10 pb-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
  key={product._id}
  onClick={() => navigate(`/product/${product._id}`)}
  className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow-lg p-5 flex flex-col cursor-pointer hover:scale-105 transition-all duration-300"
>
              <img
  src={`https://ecommerce-mern-project-dimt.onrender.com${product.image}`}
  alt={product.name}
  className="w-full h-60 object-cover rounded-xl"
/>
              
              <div className="flex-grow">
  <h2 className="text-xl font-bold mt-4 text-gray-800 dark:text-white">
    {product.name}
  </h2>

  <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm line-clamp-2">
    {product.description}
  </p>

  <p className="text-3xl font-bold text-blue-600 mt-4">
    ₹ {product.price}
  </p>
</div>

<button
  onClick={(e) => {
    e.stopPropagation();
    addToCart(product._id);
  }}
  className="bg-black hover:bg-gray-800 text-white py-3 rounded-xl mt-5 w-full font-semibold"
>
  Add To Cart
</button>
            </div>
          ))
        ) : (
          <p className="text-center text-xl col-span-full text-gray-500 dark:text-gray-300">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
