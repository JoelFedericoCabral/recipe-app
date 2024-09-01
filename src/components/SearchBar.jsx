import React from 'react';

function SearchBar({ query, setQuery }) {
  return (
    <div className="flex justify-center mt-8">
      <input
        type="text"
        placeholder="Buscar recetas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-xl px-5 py-3 text-lg border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
    </div>
  );
}

export default SearchBar;
