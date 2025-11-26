import React from "react";
import { userAuth } from "../api/userAuth";

export default function Profile() {
  const user = userAuth.getLogged();

  if (!user) {
    return (
      <main className="container">
        <h1>Você não está logado</h1>
        <h3>Nome: {user.name}</h3> 
        <a href="/login">Fazer login</a>
      </main>
    );
  }
}
