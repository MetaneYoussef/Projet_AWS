import React, { useState } from "react";
import films from "../MovieList/films"; // Assurez-vous que le chemin est correct

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setQuery(query);

    if (query) {
      const allFilms = Object.values(films).flat();
      const filtered = allFilms.filter((film) =>
        film.title.toLowerCase().includes(query)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleFilmClick = (film) => {
    alert(`Film sélectionné : ${film.title}`);
  };

  return (
    <div className="flex flex-col items-end mr-10 relative">
      <input
        type="text"
        placeholder="Rechercher..."
        value={query}
        onChange={handleSearch}
        className="p-1.5 w-68 bg-black text-white border-2 border-gray-500 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600 transition-colors duration-200 ease-in-out input-placeholder"
      />
      <div className="absolute mt-2 w-80 bg-black text-white rounded-lg shadow-lg overflow-hidden z-10 top-full">
        {query && results.length > 0 ? (
          results.map((film) => (
            <div
              key={film.id}
              className="px-4 py-2 hover:bg-white hover:text-black cursor-pointer transition-colors"
              onClick={() => handleFilmClick(film)}
            >
              {film.title}
            </div>
          ))
        ) : query && (
          <div className="px-4 py-2">
            Aucun film trouvé.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
