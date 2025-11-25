import React from "react";
import { userAuth } from "../api/userAuth";

export default function Profile() {
  const user = userAuth.getLogged();

  return (
    <main className="container">
      <h1>Meu Perfil</h1>

      <div className="admin-card" style={{ maxWidth: 350 }}>
        <h3>Nome: {user.name}</h3>
        <p>Email: {user.email}</p>
      </div>
    </main>
  );
}
