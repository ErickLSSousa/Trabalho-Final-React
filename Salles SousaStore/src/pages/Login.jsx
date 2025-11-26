import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const nav = useNavigate();

    function validateFields() {
        const errs = {};

        if (!username || username.trim().length < 3) {
            errs.username = "O nome de usuário deve ter ao menos 3 caracteres.";
        }

        if (!email || !email.includes("@")) {
            errs.email = "Digite um email válido.";
        }

        if (!password || password.length < 6) {
            errs.password = "A senha deve conter ao menos 6 caracteres.";
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validateFields()) return;

        setMessage("Login realizado com sucesso! Redirecionando...");

        if (typeof onLogin === "function") {
            onLogin({ username });
        }

        // redireciona imediatamente
        nav("/");
    }

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h1 style={styles.title}>Salles SousaStore</h1>

                <label style={styles.label}>Nome de usuário</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                {errors.username && <p style={styles.error}>{errors.username}</p>}

                <label style={styles.label}>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                {errors.email && <p style={styles.error}>{errors.email}</p>}

                <label style={styles.label}>Senha</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                {errors.password && <p style={styles.error}>{errors.password}</p>}

                <button type="submit" style={styles.button}>Entrar</button>

                {message && <p style={styles.info}>{message}</p>}
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
    },
    form: {
        width: "100%",
        maxWidth: 420,
        background: "#fff",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
    },
    title: {
        textAlign: "center",
        marginBottom: 20,
    },
    label: {
        marginTop: 10,
        display: "block",
    },
    input: {
        width: "100%",
        padding: 8,
        marginTop: 4,
        borderRadius: 4,
        border: "1px solid #ccc",
    },
    button: {
        marginTop: 20,
        width: "100%",
        padding: 10,
        background: "#0074D9",
        color: "#fff",
        border: "none",
        borderRadius: 4,
    },
    error: {
        color: "red",
        fontSize: 13,
        marginTop: 4,
    },
    info: {
        marginTop: 12,
        color: "#0074D9",
    },
};
