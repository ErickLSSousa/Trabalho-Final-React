import React, { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  if (!product) return null;

  const { addToCart } = useContext(CartContext);
  const safeImage = product.image || "https://via.placeholder.com/300x300.png?text=Sem+Imagem";

  return (
    <article className="product-card pro-card" aria-label={product.title}>
      <Link to={`/produto/${product.id}`}>
        <img src={safeImage} alt={product.title || "Produto"} className="thumb" />
      </Link>

      <h3 className="product-title">{product.title?.slice(0, 80) || "Produto sem nome"}</h3>
      <p className="price">R$ {Number(product.price || 0).toFixed(2)}</p>

      <button className="btn add-btn" onClick={() => addToCart(product)}>
        Adicionar ao Carrinho
      </button>
    </article>
  );
}

export default memo(ProductCard);
