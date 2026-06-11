import { useState } from "react";
import axios from "axios";

function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("category", category);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product Added");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-3 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded"
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border p-3 rounded"
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
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded"
        >
          Add Product
        </button>

      </form>
    </div>
  );
}

export default AddProduct;