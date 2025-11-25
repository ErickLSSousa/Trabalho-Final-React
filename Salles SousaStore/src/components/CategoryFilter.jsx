import React from "react";
import { categoryMap } from "../utils/categoryMap";

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="category-filter">
      <button
        className={active === "all" ? "active" : ""}
        onClick={() => onChange("all")}
      >
        Todos
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          className={active === cat ? "active" : ""}
          onClick={() => onChange(cat)}
        >
          {categoryMap[cat] || cat}
        </button>
      ))}
    </div>
  );
}
