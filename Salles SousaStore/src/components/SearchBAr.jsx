import { useSearch } from "../context/SearchContext";
import { Search } from "lucide-react";

export default function SearchBar() {
  const { search, setSearch } = useSearch();

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center border rounded-md bg-white shadow-sm overflow-hidden">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 outline-none"
          placeholder="Buscar produtos..."
        />
        <button className="px-4 py-2 border-l flex items-center gap-2">
          <Search size={16} />
          Buscar
        </button>
      </div>
    </div>
  );
}
