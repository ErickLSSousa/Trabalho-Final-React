import React, { useState, useEffect } from "react";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");



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

        setErrors(errs);
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

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form} aria-label="Login form">
                <h1 style={styles.title}>Salles SousaStore</h1>

                <label htmlFor="username" style={styles.label}>Nome de usuário</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    aria-invalid={!!errors.username}
                    aria-describedby={errors.username ? "username-error" : undefined}
                />
                {errors.username && <div id="username-error" style={styles.error}>{errors.username}</div>}
                <label htmlFor="email" style={styles.label}>Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <div id="email-error" style={styles.error}>{errors.email}</div>}

                <label htmlFor="password" style={styles.label}>Senha</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                />
                {errors.password && <div id="password-error" style={styles.error}>{errors.password}</div>}

                <button
                    type="submit"
                    disabled={isMinor}
                    style={{ ...styles.button, ...(isMinor ? styles.buttonDisabled : {}) }}
                >
                    Entrar
                </button>

                {message && <div style={styles.info}>{message}</div>}
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
        padding: 16,
    },
    form: {
        maxWidth: 420,
        width: "100%",
        background: "#fff",
        borderRadius: 8,
        padding: 24,
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        boxSizing: "border-box",
        fontFamily: "sans-serif",
    },
    title: {
        margin: "0 0 16px 0",
        textAlign: "center",
        color: "#2b2b2b",
        fontSize: 22,
    },
    label: {
        display: "block",
        fontSize: 14,
        marginTop: 10,
        marginBottom: 6,
        color: "#333",
    },
    input: {
        width: "100%",
        padding: "8px 10px",
        fontSize: 14,
        borderRadius: 4,
        border: "1px solid #ccc",
        boxSizing: "border-box",
    },
    button: {
        marginTop: 16,
        width: "100%",
        padding: "10px 12px",
        background: "#0074D9",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        fontSize: 16,
        cursor: "pointer",
    },
    buttonDisabled: {
        background: "#b5cbe6",
        cursor: "not-allowed",
    },
    error: {
        color: "#d32f2f",
        fontSize: 13,
        marginTop: 6,
    },
    info: {
        marginTop: 12,
        fontSize: 14,
        color: "#0d6efd",
    }
};
