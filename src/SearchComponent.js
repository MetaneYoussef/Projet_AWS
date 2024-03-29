import React, { useState } from "react";
import films from "./films"; // Assurez-vous que le chemin est correct

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
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <input
        type="text"
        placeholder="Recherchez un film..."
        value={query}
        onChange={handleSearch}
        style={{
          padding: "10px",
          width: "300px",
          background: "black",
          color: "white",
          border: "2px solid white",
          borderRadius: "5px",
          textAlign: "center",
        }}
      />
      <div style={{ marginTop: "20px" }}>
        {query &&
          results.map((film) => (
            <div
              key={film.id}
              style={{ color: "white", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleFilmClick(film)}
            >
              {film.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchComponent;
