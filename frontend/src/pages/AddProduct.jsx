import { useState } from "react";
import API from "../services/api";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("category", category);
      const token = sessionStorage.getItem("token");
      await API.post("/products", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setName(""); setPrice(""); setDescription(""); setCategory(""); setImage(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", color: "#FAFAF8", paddingTop: "64px", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 1rem 2rem" }}>
      <div className="form-card" style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "12px", padding: "2.5rem", width: "100%", maxWidth: "520px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Add Product</h1>
        <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "2rem" }}>Fill in the details to list a new product</p>

        {success && (
          <div style={{ background: "rgba(45,106,79,.25)", border: "1px solid rgba(45,106,79,.4)", color: "#6fcf97", padding: "10px 14px", borderRadius: "6px", fontSize: "0.82rem", marginBottom: "1.25rem" }}>
            ✦ Product added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {[
            { label: "Product Name", type: "text", placeholder: "Product Name", value: name, set: setName },
            { label: "Price (₹)", type: "number", placeholder: "Price", value: price, set: setPrice },
          ].map(({ label, type, placeholder, value, set }) => (
            <div key={label}>
              <label style={labelStyle}>{label}</label>
              <input type={type} placeholder={placeholder} value={value} onChange={(e) => set(e.target.value)} required style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = "#D4A843"}
                onBlur={(e) => e.target.style.borderColor = "#2E2E2E"} />
            </div>
          ))}

          <div>
            <label style={labelStyle}>Description</label>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) => e.target.style.borderColor = "#D4A843"}
              onBlur={(e) => e.target.style.borderColor = "#2E2E2E"} />
          </div>

          <div>
            <label style={labelStyle}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required style={{ ...inputStyle, cursor: "pointer" }}
              onFocus={(e) => e.target.style.borderColor = "#D4A843"}
              onBlur={(e) => e.target.style.borderColor = "#2E2E2E"}>
              <option value="">Select Category</option>
              {["Fashion", "Electronics", "Shoes", "Watches", "Sports"].map((c) => (
                <option key={c} value={c} style={{ background: "#1A1A1A" }}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Product Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required
              style={{ ...inputStyle, cursor: "pointer" }} />
          </div>

          <button type="submit" disabled={loading} style={{ background: "#D4A843", color: "#0F0F0F", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "0.25rem" }}>
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

const labelStyle = { fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" };
const inputStyle = { background: "#252525", border: "1px solid #2E2E2E", color: "#FAFAF8", padding: "10px 14px", borderRadius: "6px", fontSize: "0.85rem", outline: "none", width: "100%", transition: "border-color 0.2s", fontFamily: "'Inter', sans-serif" };

export default AddProduct;
