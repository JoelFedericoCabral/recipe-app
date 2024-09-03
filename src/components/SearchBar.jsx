import React from "react";

/**
 * SearchBar - Componente para la barra de búsqueda de recetas.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.query - El texto actual en la barra de búsqueda.
 * @param {function} props.setQuery - La función para actualizar el texto de búsqueda.
 *
 * @returns {JSX.Element} El componente de la barra de búsqueda.
 */
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
