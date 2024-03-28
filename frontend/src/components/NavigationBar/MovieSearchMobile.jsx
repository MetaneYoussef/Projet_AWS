import React, { useState } from "react";
import films from "../MovieList/films"; // Assurez-vous que le chemin est correct

const SearchComponentMobile = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setQuery(query);

    if (query.length > 0) {
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
    <div className="flex flex-col items-center relative">
      <input
        type="text"
        placeholder="Recherchez..."
        value={query}
        onChange={handleSearch}
        className="p-1.5 bg-red-700 text-white border-2 border-red-900 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600 w-68"
      />
      <div className={`absolute top-full mt-2 w-full bg-red-900 text-white rounded-lg shadow-lg overflow-hidden ${query.length > 0 ? 'block' : 'hidden'}`}>
        {results.length > 0 ? (
          results.map((film) => (
            <div
              key={film.id}
              className="px-4 py-2 hover:bg-red-400 hover:text-red-700 cursor-pointer transition-colors"
              onClick={() => handleFilmClick(film)}
            >
              {film.title}
            </div>
          ))
        ) : (
          <div className="px-4 py-2">
            Aucun film trouvé.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponentMobile;