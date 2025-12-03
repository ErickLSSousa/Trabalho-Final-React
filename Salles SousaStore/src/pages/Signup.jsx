import React, { useState, useEffect } from "react";
import { userAuth } from "../api/userAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isMinor, setIsMinor] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [dob, setDob] = useState("");

  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (!dob) {
      setIsMinor(false);
      return;
    }
    const age = computeAge(dob);
    setIsMinor(age < 16);
  }, [dob]);

  function computeAge(isoDateString) {
    const today = new Date();
    const birth = new Date(isoDateString);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  function validateFields() {
    const errs = {};

    if (!name || name.trim().length < 3) {
      errs.name = "O nome de usuário deve ter ao menos 3 caracteres.";
    }
    if (!pass || pass.length < 6) {
      errs.password = "A senha deve conter ao menos 6 caracteres.";
    }
    if (!dob) {
      errs.dob = "Data de nascimento é obrigatória.";
    } else if (computeAge(dob) < 0) {
      errs.dob = "Data inválida.";
    }

    if (computeAge(dob) < 16) {
      errs.age = "Você precisa ser maior de 16 anos para acessar o site.";
    }
    if (pass !== confirm) {
      errs.password = "As senhas não coincidem.";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!validateFields()) return;

    setIsSubmitting(true);

    try {
      await userAuth.signup({ name, email, password: pass, confirm: confirm });

      setMessage("Conta criada com sucesso!");
      setShowSuccessCard(true);

    } catch (err) {
      setError(err?.message ?? "Erro ao criar conta.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCloseSuccess() {
    setShowSuccessCard(false); 
  }

  const successStyles = {
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: 16,
    },
    card: {
      background: "#fff",
      borderRadius: 8,
      padding: 24,
      maxWidth: 420,
      width: "100%",
      boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
      textAlign: "center",
    },
    title: { margin: 0, fontSize: 20, color: "#2b2b2b" },
    text: { marginTop: 12, color: "#333" },
    actions: {
      display: "flex",
      gap: 8,
      marginTop: 18,
      justifyContent: "center",
    },
    btnPrimary: {
      background: "#0074D9",
      color: "#fff",
      border: "none",
      padding: "10px 14px",
      borderRadius: 6,
      cursor: "pointer",
    },
    btnSecondary: {
      background: "#f2f2f2",
      color: "#333",
      border: "none",
      padding: "10px 14px",
      borderRadius: 6,
      cursor: "pointer",
    },
  };


  return (
    <main className="container login-page">
      <div className="login-card">
        <h2 className="login-brand">Criar Conta</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="label">
            Nome
            <input value={name} onChange={(e) => setName(e.target.value)} />
            {fieldErrors.name && <div className="error">{fieldErrors.name}</div>}
          </label>

          <label className="label">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className="label">
            Data de nascimento
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            {fieldErrors.dob && <div className="error">{fieldErrors.dob}</div>}
            {fieldErrors.age && <div className="error">{fieldErrors.age}</div>}
          </label>

          <label className="label">
            Senha
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </label>

          <label className="label">
            Confirmar senha
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>

          <button className="btn" type="submit">
            Cadastrar
          </button>

          {error && <p className="error">{error}</p>}
        </form>
      </div>

      {showSuccessCard && (
        <div style={successStyles.overlay}>
          <div style={successStyles.card}>
            <h3 style={successStyles.title}>Conta criada com sucesso!</h3>
            <p style={successStyles.text}>Seu cadastro foi concluído.</p>

            <div style={successStyles.actions}>
              <button
                style={successStyles.btnPrimary}
                onClick={handleCloseSuccess}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
