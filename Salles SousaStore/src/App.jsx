// src/App.jsx
import React from "react";
import Router from "./Router";
import { CartProvider } from "./context/CartContext";
import MercadoMock from './mercadomock';

export default function App() {
  return (
   
    
   <CartProvider>
      <Router />
    </CartProvider>
  );
}
