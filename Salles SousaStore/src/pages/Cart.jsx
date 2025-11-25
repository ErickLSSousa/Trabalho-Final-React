// src/pages/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useContext(CartContext);

  return (
    <main className="container">
      <h1>Seu carrinho</h1>

      {!cart.length ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-info">
                  <strong>{item.title}</strong>
                  <div>R$ {Number(item.price).toFixed(2)}</div>
                  <div>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="danger" onClick={() => removeFromCart(item.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: R$ {Number(totalPrice).toFixed(2)}</h3>
            <button onClick={clearCart}>Limpar carrinho</button>
            <button onClick={() => alert("Checkout simulado")}>Finalizar compra</button>
          </div>
        </>
      )}
    </main>
  );
}
