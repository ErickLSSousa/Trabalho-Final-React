// src/pages/ProductDetails.jsx
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { useFetch } from "../hooks/useFetch";
import Loader from "../components/Loader";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(() => api.getProduct(id), [id]);
  const { addToCart } = useContext(CartContext);

  if (loading) return <Loader />;
  if (error) return <div className="error">Erro: {error.message}</div>;
  if (!product) return <div>Produto não encontrado.</div>;

  return (
    <main className="container product-details">
      <div className="details-grid">
        <img src={product.image} alt={product.title} className="big-thumb" />
        <div>
          <h2>{product.title}</h2>
          <p className="price">R$ {Number(product.price).toFixed(2)}</p>
          <p>{product.description}</p>
          <button onClick={() => addToCart(product, 1)}>Adicionar ao carrinho</button>
        </div>
      </div>
    </main>
  );
}
