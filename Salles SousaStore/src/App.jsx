// src/App.jsx
import React from "react";
import Router from "./Router";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Router />
    </CartProvider>
  );
}
