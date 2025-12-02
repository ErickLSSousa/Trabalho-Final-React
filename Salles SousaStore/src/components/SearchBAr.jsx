import { useSearch } from "../context/SearchContext";
import { Search } from "lucide-react";

export default function SearchBar() {
  const { search, setSearch } = useSearch();

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center border rounded-md bg-white shadow-sm overflow-hidden">
        <Search size={16} className="ml-3 text-gray-500" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 outline-none"
          placeholder="Buscar produtos..."
        />
      </div>
    </div>
  );
}
