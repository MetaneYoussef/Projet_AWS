import React, { useState, useRef } from "react";
import MovieCard from "../MovieCard/FilmsItem";
import "../../styles.css";

const Section = ({ titre, films }) => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const filmsContainerRef = useRef(null);

  return (
    <div style={{ position: "relative", marginBottom: "40px" }}>
      <h2 style={{ color: "white", marginBottom: "20px", textAlign: "center" }}>
        {titre}
      </h2>

      <button
        onClick={() =>
          filmsContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
        }
        className="btn-navigation btn-left"
      >
        {"<"}
      </button>

      <div
        ref={filmsContainerRef}
        style={{
          display: "flex",
          overflowX: "auto",
          backgroundColor: "black",
        }}
      >
        {films.map((film) => (
          <MovieCard
            key={film.id}
            film={film}
            onClick={() => setSelectedFilm(film)}
          />
        ))}
      </div>

      <button
        onClick={() =>
          filmsContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
        }
        className="btn-navigation btn-right"
      >
        {">"}
      </button>

      {selectedFilm && (
        <div style={{ color: "white", marginTop: "20px", textAlign: "center" }}>
          Film sélectionné : {selectedFilm.title}
        </div>
      )}
    </div>
  );
};

export default Section;
