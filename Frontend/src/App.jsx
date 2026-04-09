import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaRocket,
  FaUserAstronaut,
  FaEdit,
} from "react-icons/fa";

const API = "http://127.0.0.1:8000";

export default function App() {
  const [items, setItems] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    const res = await fetch(`${API}/items`);
    setItems(await res.json());
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
  }, []);

  // -------- IMAGE PREVIEW --------
  const handleImageChange = (file) => {
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  // -------- ADD / UPDATE --------
  const submitItem = async (e) => {
    e.preventDefault();
    if (!name || !price) return;

    let imagePath = null;

    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const res = await fetch(`${API}/upload-image`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      imagePath = data.image_path;
    }

    const payload = {
      name,
      price: Number(price),
      image_path: imagePath,
    };

    if (editingId) {
      await fetch(`${API}/items/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    fetchItems();
  };

  // -------- EDIT --------
  const editItem = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
    setImage(null);
    setImagePreview(item.image_path ? `${API}${item.image_path}` : null);
  };

  // -------- DELETE --------
  const deleteItem = async (id) => {
    await fetch(`${API}/items/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setImage(null);
    setImagePreview(null);
    setEditingId(null);
  };

  return (
    <div>
      <header className="app-header">
        <h1>
          <FaRocket color="#06b6d4" />
            {'\n'} Sample <span style={{ color: "#06b6d4" }}>CRUD </span>with FastApi api
          and React js Frontend
        </h1>
      </header>

      <main className="main-content">
        {/* -------- FORM -------- */}
        <section className="input-card">
          <h2>{editingId ? "Edit Item" : "Deploy New Item"}</h2>

          <form onSubmit={submitItem}>
            <input
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price ($)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />

            {/* IMAGE PREVIEW */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginTop: 8,
                }}
              />
            )}

            <button type="submit">
              {editingId ? <FaEdit /> : <FaPlus />}{" "}
              {editingId ? "Update Item" : "Add to Cargo"}
            </button>

            {editingId && (
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </form>
        </section>

        {/* -------- LIST -------- */}
        <section className="card-list">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              {item.image_path && (
                <img
                  src={`${API}${item.image_path}`}
                  alt={item.name}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              )}

              <div className="name">{item.name}</div>
              <div className="price">${item.price}</div>

              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => editItem(item)}>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => deleteItem(item.id)}>
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="footer">
        <FaUserAstronaut /> Crafted by Cherinet Habtamu to explore FastAPI with
        React.js
      </footer>
    </div>
  );
}
