import { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt, FaRocket, FaUserAstronaut } from "react-icons/fa";

const API = "http://127.0.0.1:8000/items";

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchItems = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Connection lost in space:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (!name || !price) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Date.now(), name, price: Number(price) }),
    });
    setName("");
    setPrice("");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchItems();
  };

    return (
      <div>
        <header className="app-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <FaRocket style={{ color: '#06b6d4', fontSize: '1.5rem' }} />
            <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem', letterSpacing: '-1px' }}>
              COSMOS <span style={{ color: '#06b6d4' }}>CRUD</span>
            </h1>
          </div>
        </header>

        <main className="main-content">
          <section className="input-card">
            <h2 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Deploy New Item</h2>
            <form onSubmit={addItem} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
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
              <button type="submit">
                <FaPlus size={14} /> Add to Cargo
              </button>
            </form>
          </section>

          <section>
            <div className="card-list">
              {items.length === 0 ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#64748b', padding: '2rem 0' }}>
                  No items found.
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="item-card">
                    <div className="icon"><FaRocket /></div>
                    <div className="name">{item.name}</div>
                    <div className="price">${Number(item.price).toLocaleString()}</div>
                    <button
                      className="delete-btn"
                      onClick={() => deleteItem(item.id)}
                    >
                      <FaTrashAlt style={{ marginRight: 4 }} /> Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>

        <footer className="footer">
          <div style={{ marginBottom: '1rem' }}>
            <FaRocket style={{ color: '#06b6d4', marginRight: 8 }} />
            <span style={{ fontWeight: 'bold' }}>COSMOS</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            A high-performance CRUD interface built with FastAPI and React, designed for explorers of the digital universe.
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <b>Quick Orbits:</b> Documentation | API Reference | Uptime Status
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <FaUserAstronaut style={{ color: '#06b6d4', marginRight: 8 }} /> Admin Station <span style={{ color: '#64748b', marginLeft: 8 }}>Connected via Warp</span>
          </div>
          <div>© 2024 TANEF SOURCE. All celestial rights reserved.</div>
        </footer>
      </div>
    );
  }