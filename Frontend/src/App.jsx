import { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt, FaRocket, FaUserAstronaut } from "react-icons/fa";

const API = "http://127.0.0.1:8001/items";

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
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans relative overflow-hidden">
      
      {/* --- Cosmic Background Elements --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]"></div>
        {/* Simple Star Field Layer */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      {/* --- Header --- */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-xl shadow-lg shadow-cyan-500/20">
              <FaRocket className="text-white text-xl" />
            </div>
            <h1 className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              COSMOS <span className="text-cyan-400">CRUD</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition">Galaxy</a>
            <a href="#" className="hover:text-cyan-400 transition">Orbit</a>
            <a href="#" className="hover:text-cyan-400 transition">Mission Control</a>
          </nav>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-1 relative z-10 max-w-4xl w-full mx-auto p-6 mt-10">
        
        {/* Input Card */}
        <section className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl mb-12">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            Deploy New Item
          </h2>
          <form onSubmit={addItem} className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="Item Name"
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price ($)"
              className="md:w-32 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 active:scale-95"
            >
              <FaPlus size={14} /> Add to Cargo
            </button>
          </form>
        </section>

        {/* List Section */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-2xl font-bold">Space Inventory</h3>
            <span className="text-sm text-slate-500">{items.length} units detected</span>
          </div>

          <div className="grid gap-3">
            {items.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                <p className="text-slate-500">The sector is empty. Deploy your first item.</p>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id} 
                  className="group flex justify-between items-center bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 rounded-2xl p-4 transition-all hover:translate-x-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition">
                      #
                    </div>
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-cyan-400/80 font-mono">${Number(item.price).toLocaleString()}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="mt-20 border-t border-white/5 bg-black/60 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaRocket className="text-cyan-500" />
                <span className="font-black text-lg">COSMOS</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                A high-performance CRUD interface built with FastAPI and React, 
                designed for explorers of the digital universe.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-bold mb-4">Quick Orbits</h4>
              <ul className="text-slate-500 text-sm space-y-2">
                <li><a href="#" className="hover:text-cyan-400 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">API Reference</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Uptime Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Commander</h4>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                  <FaUserAstronaut />
                </div>
                <div>
                  <p className="text-sm font-bold">Admin Station</p>
                  <p className="text-xs text-slate-500">Connected via Warp</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-slate-600">
            © 2024 TANEF SOURCE. All celestial rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}