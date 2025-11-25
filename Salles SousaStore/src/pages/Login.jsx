import React, { useState, useEffect } from "react";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [errors, setErrors] = useState({});
    const [isMinor, setIsMinor] = useState(false);
    const [message, setMessage] = useState("");

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

        setErrors(errs);
        return Object.keys(errs).length === 0;
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

                <label htmlFor="dob" style={styles.label}>Data de nascimento</label>
                <input
                    id="dob"
                    name="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    style={styles.input}
                    aria-invalid={!!errors.dob || isMinor}
                    aria-describedby={(errors.dob || isMinor) ? "dob-error" : undefined}
                />
                {(errors.dob || isMinor) && <div id="dob-error" style={styles.error}>{errors.dob ?? "Usuários menores de 18 anos não podem acessar o site."}</div>}

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
