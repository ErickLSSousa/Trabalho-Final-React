import React, { useState } from "react";
import { userAuth } from "../api/userAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


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

   useEffect(() => {
        setMessage("");
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

        if (!username || username.trim().length < 3) {
            errs.username = "O nome de usuário deve ter ao menos 3 caracteres.";
        }
        if (!password || password.length < 6) {
            errs.password = "A senha deve conter ao menos 6 caracteres.";
        }
        if (!dob) {
            errs.dob = "Data de nascimento é obrigatória.";
        } else if (computeAge(dob) < 0) {
            errs.dob = "Data inválida.";
        }

        if (computeAge(dob) < 18) {
            errs.age = "Você precisa ser maior de 18 anos para acessar o site.";
        }

        setError(errs);
        return Object.keys(errs).length === 0;

        //função para validar os campos do formulário(Adoro If else)
    }

    
    function handleSubmit(e) {
        e.preventDefault();
        if (!validateFields()) {
            return;
        }

        setMessage("Login realizado com sucesso. Redirecionando...");
        if (typeof onLogin === "function") {
            onLogin({ username });
        }
        //função para lidar com o envio do formulário(ai bruneca ja to comentando tudo pra
        //ficar mais facil de entender)

    }


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

          <label htmlFor="dob" className="label">Data de nascimento
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
