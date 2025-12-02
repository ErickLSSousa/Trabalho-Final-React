import React, { useState } from "react";
import { api } from "../api/api";
import { useFetch } from "../hooks/useFetch";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { isDeleted } from "../storage/anyStorage";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const { data: products, loading, error } = useFetch(() => api.getProducts(), []);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
 
  if (loading) return <Loader />;
  if (error) return <div className="error">{error.message}</div>;

  const categories = [...new Set(products.map((p) => p.category))];

  let visibleProducts = products.filter((p) => !isDeleted(p.id));

  if (activeCategory !== "all") {
    visibleProducts = visibleProducts.filter((p) => p.category === activeCategory);
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
        {visibleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </main>
  );
}
