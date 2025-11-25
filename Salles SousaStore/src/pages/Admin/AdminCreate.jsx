// src/pages/Admin/AdminCreate.jsx
import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminCreate() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await api.createProduct(form);
    alert("Produto criado!");

    nav("/admin");
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Novo Produto</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          value={form[key]}
          onChange={handleChange}
        />
      ))}

      <button className="btn">Salvar</button>
    </form>
  );
}
