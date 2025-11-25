import React, { useState } from "react";
import { userAuth } from "../api/userAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (pass !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await userAuth.signup({ name, email, password: pass });
      alert("Conta criada! Faça login.");
      nav("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="container login-page">
      <div className="login-card">
        <h2 className="login-brand">Criar Conta</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="label">
            Nome
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label className="label">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className="label">
            Senha
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          </label>

          <label className="label">
            Confirmar senha
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </label>

          <button className="btn" type="submit">Cadastrar</button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </main>
  );
}
