import React, { useState } from 'react';
import films from './films'; // Votre structure de données films est importée ici
import { Link } from 'react-router-dom'; // Importez Link de react-router-dom si vous utilisez React Router


const FilmsPage = () => {
  const [selectedFilm, setSelectedFilm] = useState(null);

  const selectFilm = (film) => {
    setSelectedFilm(film);
  };

  const closeDetails = () => {
    setSelectedFilm(null); // Fonction pour fermer le panneau de détails
  };

  // Transformer l'objet films en un tableau pour itérer facilement sur chaque catégorie
  const filmCategories = Object.entries(films);

  return (
    <div>
      {/* Logo qui renvoie à la page d'accueil */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <Link to="/"> {/* Use Link component with the destination path */}
            <img src={require("./RondSansFond.png")} alt="Votre logo" style={{ width: '140px', height: 'auto', zIndex: 1, position: 'relative' }} />
          </Link>
      </div>
      
      {filmCategories.map(([categoryName, filmsInCategory]) => (
        <div key={categoryName}>
          <h1>{categoryName}</h1>
          <div className="film-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '20px' }}>
            {filmsInCategory.map((film) => (
              <div key={film.id} className="film-item" onClick={() => selectFilm(film)} style={{cursor: 'pointer', flex: '0 1 200px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <img src={film.imageUrl} alt={film.title} style={{ width: '100px', height: '150px' }} />
                <h2 style={{ width: '100%' }}>{film.title}</h2>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedFilm && (
        <div className="film-details" style={{ position: 'absolute', top: '10%', left: '25%', right: '25%', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', zIndex: 1000 }}>
          <button onClick={closeDetails} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', border: 'none', background: 'transparent', fontSize: '24px', fontWeight: 'bold', color: 'black' }}>&times;</button>
          <img src={selectedFilm.imageUrl} alt={selectedFilm.title} style={{ width: '200px', height: '300px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
          <h2 style={{ textAlign: 'center' }}>{selectedFilm.title}</h2>
          <p><strong>Titre:</strong> {selectedFilm.title}</p>
          <p><strong>Synopsis:</strong> {selectedFilm.synopsis}</p>          
          <p><strong>Réalisateur:</strong> {selectedFilm.director}</p>
        </div>
      )}
    </div>
  );
};

export default FilmsPage;
