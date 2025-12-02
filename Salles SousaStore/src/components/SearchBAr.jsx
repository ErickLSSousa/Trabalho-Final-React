import { useState } from "react";

export default function SearchBAr({ onSearch }) {
  const [text, setText] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setText(value);
    onSearch(value); // envia o termo de busca para o componente pai
  }

  return (
    <div style={{ padding: "10px", background: "#fff" }}>
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={text}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />
    </div>
  );
}
