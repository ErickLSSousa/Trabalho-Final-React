// src/App.jsx
import React from "react";
import Router from "./Router";
import { CartProvider } from "./context/CartContext";
import { div } from "framer-motion/client";

export default function App() {
  return (
   <div>

   <CartProvider>
      <Router />
    </CartProvider>
   </div>
 );
}
