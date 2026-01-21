import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8001/items";

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchItems = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
  }, []);

  const addItem = async () => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Date.now(),
        name,
        price: Number(price),
      }),
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
    <div style={{ padding: 20 }}>
      <h2>FastAPI + React CRUD</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => deleteItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
