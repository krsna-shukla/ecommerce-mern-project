import { useEffect, useState } from "react";
import API from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);

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
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-10">
      <h1 className="text-4xl font-bold mb-8">
        Manage Products
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden">

          <thead className="bg-black text-white">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b text-center"
              >
                <td className="p-4">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="w-20 h-20 object-cover mx-auto rounded"
                  />
                </td>

                <td className="p-4 font-semibold">
                  {product.name}
                </td>

                <td className="p-4 text-blue-600 font-bold">
                  ₹ {product.price}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminProducts;