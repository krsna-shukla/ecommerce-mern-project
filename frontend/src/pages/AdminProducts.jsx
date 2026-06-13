import { useEffect, useState } from "react";
import API from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const BACKEND_URL =
    "https://ecommerce-mern-project-dimt.onrender.com";

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

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = sessionStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("❌ Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-32 px-6 md:px-10">

      {/* Heading */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Manage Products
        </h1>

        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
          Total Products: {products.length}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center text-xl text-gray-500">
          No Products Found
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">

          <table className="w-full">

            <thead className="bg-black text-white">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b text-center hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={`${BACKEND_URL}${product.image}`}
                      alt={product.name}
                      className="w-20 h-20 object-cover mx-auto rounded-lg"
                    />
                  </td>

                  <td className="p-4 font-semibold">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4 text-blue-600 font-bold">
                    ₹ {product.price}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        deleteProduct(product._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}

export default AdminProducts;
