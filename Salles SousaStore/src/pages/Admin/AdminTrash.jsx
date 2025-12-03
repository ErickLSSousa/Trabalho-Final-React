import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { getDeletedProducts, restoreProduct } from "../../storage/anyStorage";

export default function AdminTrash() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const all = await api.getProducts();
    const deleted = getDeletedProducts();
    const filtered = all.filter((p) => deleted.includes(p.id));

    setItems(filtered);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function handleRestore(id) {
    restoreProduct(id);
    alert("Restaurado!");
    load();
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Lixeira</h2>

      {items.length === 0 && <p>Nenhum item na lixeira.</p>}

      <div className="admin-grid">
        {items.map((p) => (
          <div key={p.id} className="admin-card">
            <img src={p.image} />

            <div>
              <h3>{p.title}</h3>
              <p>R$ {p.price}</p>

              <div className="row">
                <button
                  className="btn"
                  style={{ background: "green" }}
                  onClick={() => handleRestore(p.id)}
                >
                  Restaurar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
