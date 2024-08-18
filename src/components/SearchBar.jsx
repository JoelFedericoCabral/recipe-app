import React from 'react';

function SearchBar({ query, setQuery }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar recetas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
