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
        className="p-1.5 bg-black text-white border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-black-600 transition-all duration-500 ease-in-out w-full"
      />
      <div className={`absolute top-full mt-2 w-full bg-black text-white rounded-lg shadow-lg overflow-hidden ${query.length > 0 ? 'block' : 'hidden'}`}>
        {results.length > 0 ? (
          results.map((film) => (
            <div
              key={film.id}
              className="px-4 py-2 hover:bg-gray-300 hover:text-black  cursor-pointer transition-colors"
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