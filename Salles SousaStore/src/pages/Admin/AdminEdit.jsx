import { api } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminEdit() {
  const { id } = useParams();
  const nav = useNavigate();

  const { data, loading } = useFetch(() => api.getProduct(id), [id]);
  const [form, setForm] = useState(null);

  
  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (loading || !form) return <p>Carregando...</p>;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await api.updateProduct(id, form);
    alert("Atualizado!");

    nav("/admin");
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Editar Produto</h2>

      {Object.keys(form).map((key) =>
        key === "id" ? null : (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
          />
        )
      )}

      <button className="btn">Salvar</button>
    </form>
  );
}
