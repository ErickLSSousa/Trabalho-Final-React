// src/pages/Admin.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function Admin() {
  return (
    <main className="container">
      <h1>Área Administrativa</h1>

      <nav className="admin-nav">
        <NavLink to="/admin" end>Listar</NavLink>
        <NavLink to="/admin/create">Criar</NavLink>
        <NavLink to="/admin/trash">Lixeira</NavLink>
      </nav>

      <Outlet />
    </main>
  );
}
