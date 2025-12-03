import React from "react";
import Router from "./Router";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { div } from "framer-motion/client";

export default function App() {
  return (
   

    
   <CartProvider>
      <SearchProvider>
       <Router />
      </SearchProvider >
    </CartProvider>
   
 );
}
