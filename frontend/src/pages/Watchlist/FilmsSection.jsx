import React, { useState } from 'react';
import WatchlistItem from './Items';

function FilmsSection() {
  const [showFilmsEnCours, setShowFilmsEnCours] = useState(false); // Ajout pour gérer l'affichage de la section films "En cours"
  const [showFilmsTerminer, setShowFilmsTerminer] = useState(false); // Ajout pour gérer l'affichage de la section films "Terminé"
  const [showFilmsEnPause, setShowFilmsEnPause] = useState(false); // Ajout pour gérer l'affichage de la section films "En pause"
  const [showFilmsAbandon, setShowFilmsAbandon] = useState(false); // Ajout pour gérer l'affichage de la section films "Abandon"
  const [showFilmsPrevu, setShowFilmsPrevu] = useState(false); // Ajout pour gérer l'affichage de la section films "Prévu"

  const [films, setFilms] = useState({
    enCours: [
      { id: 1, title: "Inception", episodeInfo: "1/1 épisodes", rating: 5, poster: "https://media.senscritique.com/media/000012872126/0/inception.jpg" },
    ],
    terminee: [],
    enPause: [],
    abandonne: [],
    prevu: []
  });

  return (
    <section id="films" className="p-4">
      {/* Toggle pour la section "En cours" des films */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-red-700 p-1 rounded-md pl-4" onClick={() => setShowFilmsEnCours(!showFilmsEnCours)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showFilmsEnCours ? '▼' : '☰'}
        </span>
        En cours
      </h2>
      {showFilmsEnCours && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {films.enCours.map(film => (
            <WatchlistItem key={film.id} {...film} />
          ))}
        </div>
      )}

      {/* Toggle pour la section "Terminé" des films */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-red-700 p-1 rounded-md pl-4" onClick={() => setShowFilmsTerminer(!showFilmsTerminer)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showFilmsTerminer ? '▼' : '☰'}
        </span>
        Terminés
      </h2>
      {showFilmsTerminer && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {films.terminee.map(film => (
            <WatchlistItem key={film.id} {...film} />
          ))}
        </div>
      )}

      {/* Toggle pour la section "En Pause" des films */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-red-700 p-1 rounded-md pl-4" onClick={() => setShowFilmsEnPause(!showFilmsEnPause)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showFilmsEnPause ? '▼' : '☰'}
        </span>
        En Pause
      </h2>
      {showFilmsEnPause && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {films.enPause.map(film => (
            <WatchlistItem key={film.id} {...film} />
          ))}
        </div>
      )}

      {/* Toggle pour la section "Abandon" des films */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-red-700 p-1 rounded-md pl-4" onClick={() => setShowFilmsAbandon(!showFilmsAbandon)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showFilmsAbandon ? '▼' : '☰'}
        </span>
        Abandonnés
      </h2>
      {showFilmsAbandon && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {films.abandonne.map(film => (
            <WatchlistItem key={film.id} {...film} />
          ))}
        </div>
      )}

      {/* Toggle pour la section "Prévu" des films */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-red-700 p-1 rounded-md pl-4" onClick={() => setShowFilmsPrevu(!showFilmsPrevu)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showFilmsPrevu ? '▼' : '☰'}
        </span>
        Prévus
      </h2>
      {showFilmsPrevu && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {films.prevu.map(film => (
            <WatchlistItem key={film.id} {...film} />
          ))}
        </div>
      )}                                
    </section>
  );
}

export default FilmsSection;