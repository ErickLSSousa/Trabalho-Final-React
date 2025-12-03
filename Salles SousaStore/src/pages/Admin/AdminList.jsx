
import { api } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { addDeletedProduct } from "../../storage/anyStorage";

export default function AdminList() {
  const { data: products, loading, error } = useFetch(api.getProducts, []);

  async function handleDelete(id) {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    
    addDeletedProduct(id);

    alert("Movido para a lixeira.");
    window.location.reload();
  }

  return (
    <div>
      <h2>Produtos</h2>

      {loading && <p>Carregando...</p>}
      {error && <p className="error">Erro ao carregar produtos.</p>}

      <div className="admin-grid">
        {products?.map((p) => (
          <div key={p.id} className="admin-card">
            <img src={p.image} alt={p.title} />

            <div>
              <h3>{p.title}</h3>
              <p>R$ {p.price}</p>

              <div className="row">
                <Link to={`/admin/edit/${p.id}`} className="btn">Editar</Link>

                <button className="danger" onClick={() => handleDelete(p.id)}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
