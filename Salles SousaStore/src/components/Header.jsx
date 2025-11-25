import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../api/userAuth";

export default function Header() {
  const [user, setUser] = useState(userAuth.getLogged());
  const nav = useNavigate();

  function logout() {
    userAuth.logout();
    setUser(null);
    nav("/");
  }

  useEffect(() => {
    setUser(userAuth.getLogged());
  }, []);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">ErickCommerce</Link>

        <div className="nav-right">
          <Link to="/carrinho">Carrinho</Link>

          {!user ? (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/signup">Criar conta</Link>
            </>
          ) : (
            <>
              <Link to="/perfil">Olá, {user.name}</Link>
              <button onClick={logout} className="linklike">Sair</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
