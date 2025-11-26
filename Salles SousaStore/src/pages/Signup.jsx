import React, { useState } from "react";
import { userAuth } from "../api/userAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isMinor, setIsMinor] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [dob, setDob] = useState("");

   useEffect(() => {
        
        if (!dob) {
            setIsMinor(false);
            return;
        }
        const age = computeAge(dob);
        setIsMinor(age < 18);
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
        //função para calcular idade a partir da data de nascimento:)
    }


    function validateFields() {
      const errs = {};
    
      if (!name || name.trim().length < 3) {
        errs.name = "O nome deve ter ao menos 3 caracteres.";
      }
    
      if (!pass || pass.length < 6) {
        errs.pass = "A senha deve conter ao menos 6 caracteres.";
      }
    
      if (!dob) {
        errs.dob = "Data de nascimento é obrigatória.";
      }
    
      if (computeAge(dob) < 18) {
        errs.age = "Você precisa ser maior de 18 anos.";
      }
    
      setError(errs);
      return Object.keys(errs).length === 0;
    }
    

        //função para validar os campos do formulário(Adoro If else)
    


  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!validateFields()) return;

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

          <label htmlFor="dob">Data de nascimento
          <input
            id="dob"
            name="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          </label>
          {(error?.dob || isMinor) && <div id="dob-error" style={styles.error}>{error.dob ?? "Usuários menores de 18 anos não podem acessar o site."}</div>}

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
