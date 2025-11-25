// src/context/CartContext.jsx
import React, { createContext, useEffect, useMemo, useReducer } from "react";

export const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((p) => p.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((p) =>
            p.id === action.payload.id
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }

    case "UPDATE":
      return {
        ...state,
        items: state.items
          .map((p) =>
            p.id === action.payload.id ? { ...p, quantity: action.payload.quantity } : p
          )
          .filter((p) => p.quantity > 0),
      };

    case "REMOVE":
      return { ...state, items: state.items.filter((p) => p.id !== action.payload) };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    items: JSON.parse(localStorage.getItem("cart_v2") || "[]"),
  });

  useEffect(() => {
    localStorage.setItem("cart_v2", JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = useMemo(() => state.items.reduce((s, i) => s + i.quantity, 0), [state.items]);
  const totalPrice = useMemo(() => state.items.reduce((s, i) => s + i.quantity * i.price, 0), [state.items]);

  const value = {
    cart: state.items,
    totalItems,
    totalPrice,
    addToCart: (p) => dispatch({ type: "ADD", payload: p }),
    updateQuantity: (id, qty) => dispatch({ type: "UPDATE", payload: { id, quantity: qty } }),
    removeFromCart: (id) => dispatch({ type: "REMOVE", payload: id }),
    clearCart: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
