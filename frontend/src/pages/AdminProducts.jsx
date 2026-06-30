import { useEffect, useState } from "react";
import API from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const BACKEND_URL = "https://ecommerce-mern-project-dimt.onrender.com";

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) { console.log(error); }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const token = sessionStorage.getItem("token");
      await API.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchProducts();
    } catch (error) { console.log(error); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0F0F", color: "#FAFAF8", paddingTop: "64px" }}>
      <div className="page-header" style={{ padding: "2.5rem 2rem 0", borderBottom: "1px solid #2E2E2E", marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "0.5rem" }}>Manage Products</h1>
          <p style={{ color: "#666", fontSize: "0.85rem", paddingBottom: "1.5rem" }}>Add, edit or remove products</p>
        </div>
        <span style={{ background: "#D4A843", color: "#0F0F0F", fontSize: "0.78rem", fontWeight: 700, padding: "7px 18px", borderRadius: "4px", letterSpacing: "0.06em", marginBottom: "1.5rem" }}>
          {products.length} Products
        </span>
      </div>

      <div className="page-content" style={{ padding: "0 2rem 4rem" }}>
        {products.length === 0 ? (
          <div style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", padding: "3rem", textAlign: "center", color: "#666" }}>No products found</div>
        ) : (
          <div className="admin-table-wrap" style={{ background: "#1A1A1A", border: "1px solid #2E2E2E", borderRadius: "8px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#252525", borderBottom: "1px solid #2E2E2E" }}>
                  {["Image", "Product", "Category", "Price", "Action"].map((h) => (
                    <th key={h} style={{ padding: "1rem", textAlign: "center", fontSize: "0.72rem", color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={product._id} style={{ borderBottom: i < products.length - 1 ? "1px solid #2E2E2E" : "none", transition: "background 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#252525"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "1rem", textAlign: "center" }}>
                      <img src={product.image?.startsWith("http") ? product.image : `${BACKEND_URL}${product.image}`} alt={product.name} style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "6px", margin: "0 auto" }} />
                    </td>
                    <td style={{ padding: "1rem", textAlign: "center", fontSize: "0.88rem", fontWeight: 500 }}>{product.name}</td>
                    <td style={{ padding: "1rem", textAlign: "center" }}>
                      <span style={{ background: "#252525", border: "1px solid #2E2E2E", color: "#999", fontSize: "0.72rem", padding: "4px 12px", borderRadius: "3px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{product.category}</span>
                    </td>
                    <td style={{ padding: "1rem", textAlign: "center", color: "#D4A843", fontWeight: 600 }}>₹ {product.price}</td>
                    <td style={{ padding: "1rem", textAlign: "center" }}>
                      <button onClick={() => deleteProduct(product._id)}
                        style={{ background: "rgba(155,34,38,0.15)", border: "1px solid rgba(155,34,38,0.4)", color: "#e74c3c", padding: "7px 16px", borderRadius: "4px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 500 }}>
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
    </div>
  );
}

export default AdminProducts;
