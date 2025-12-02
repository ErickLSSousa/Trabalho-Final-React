import React, { useState } from "react";
import { api } from "../api/api";
import { useFetch } from "../hooks/useFetch";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { isDeleted } from "../storage/anyStorage";
import CategoryFilter from "../components/CategoryFilter";
import { useSearch } from "../context/SearchContext";   // <<< IMPORTANTE

export default function Home() {
  const { data: products, loading, error } = useFetch(() => api.getProducts(), []);
  const [activeCategory, setActiveCategory] = useState("all");

  // 🔥 Usa o valor digitado na barra de pesquisa global
  const { search } = useSearch();

  if (loading) return <Loader />;
  if (error) return <div className="error">{error.message}</div>;

  const categories = [...new Set(products.map((p) => p.category))];

  // Começa com todos os produtos não deletados
  let visibleProducts = products.filter((p) => !isDeleted(p.id));

  // Filtro de categoria
  if (activeCategory !== "all") {
    visibleProducts = visibleProducts.filter((p) => p.category === activeCategory);
  }

  // 🔥 Filtro da barra de pesquisa
  if (search.trim() !== "") {
    visibleProducts = visibleProducts.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <main className="container">
      <h1>Produtos</h1>

      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      <section className="grid">
        {visibleProducts.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          visibleProducts.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </section>
    </main>
  );
}
