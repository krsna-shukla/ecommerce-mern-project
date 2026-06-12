import { useState } from "react";
import API from "../services/api";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("category", category);

      const token = localStorage.getItem("token");

      await API.post(
        "/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Product Added Successfully");

      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage(null);

    } catch (error) {
      console.log(error);
      alert("❌ Failed To Add Product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center pt-24 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            className="w-full border p-3 rounded-lg"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Select Category</option>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Electronics</option>
            <option value="Shoes">Shoes</option>
            <option value="Watches">Watches</option>
            <option value="Sports">Sports</option>
          </select>

          <input
            type="file"
            accept="image/*"
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
