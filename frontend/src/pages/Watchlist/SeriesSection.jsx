import React, { useState } from 'react';
import WatchlistItem from './Items';

function SeriesSection() {
  const [showSeriesEnCours, setShowSeriesEnCours] = useState(false); // Ajout pour gérer l'affichage de la section séries "En cours"
  const [showSeriesTerminer, setShowSeriesTerminer] = useState(false); // Ajout pour gérer l'affichage de la section séries "Terminé"
  const [showSeriesEnPause, setShowSeriesEnPause] = useState(false); // Ajout pour gérer l'affichage de la section séries "En pause"
  const [showSeriesAbandon, setShowSeriesAbandon] = useState(false); // Ajout pour gérer l'affichage de la section séries "Abandon"
  const [showSeriesPrevu, setShowSeriesPrevu] = useState(false); // Ajout pour gérer l'affichage de la section séries "Prévu"

  const [series, setSeries] = useState({
    enCours: [
      { id: 1, title: "Breaking Bad", episodeInfo: "5/54 épisodes", poster: "https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg" },
      { id: 2, title: "Classroom Of The Elite : 3rd Season", episodeInfo: "9/12 épisodes", rating: 7, poster: "https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,width=480,height=720,fit=contain,quality=85/catalog/crunchyroll/8b35b4a6cffe66004f752aa147351cab.jpe" },
      { id: 3, title: "BodyGuard", episodeInfo: "10/30 épisodes", poster: "https://fr.web.img6.acsta.net/pictures/20/11/17/12/11/5304096.jpg" },
      { id: 4, title: "Power", episodeInfo: "8/10 épisodes", poster: "https://images.justwatch.com/poster/304057882/s332/saison-6" },
      { id: 5, title: "One Piece", episodeInfo: "900/1012 épisodes", rating: 10, poster: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/09/one-piece-9.jpg" },
      { id: 6, title: "Lupin", episodeInfo: "2/10 épisodes", rating: 9, poster: "https://upload.wikimedia.org/wikipedia/pt/1/16/Lupin_%28s%C3%A9rie_de_televis%C3%A3o%29.jpg" },
    ],
    terminee: [],
    enPause: [],
    abandonne: [],
    prevu: []
  });
  return (
    <section id="series" className="p-4">
      {/* Toggle pour la section "En cours" des séries */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-yellow-500 p-1 rounded-md pl-4" onClick={() => setShowSeriesEnCours(!showSeriesEnCours)}>
        <span className="mr-4 text-lg md:text-xl text-white font-bold">
          {showSeriesEnCours ? '▼' : '☰'}
        </span>
        En cours
      </h2>
      {showSeriesEnCours && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {series.enCours.map(serie => (
            <WatchlistItem key={serie.id} {...serie} />
          ))}
        </div>
      )}

      {/* Toggle pour la section "Terminé" des séries */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-yellow-500 p-1 rounded-md pl-4" onClick={() => setShowSeriesTerminer(!showSeriesTerminer)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showSeriesTerminer ? '▼' : '☰'}
        </span>
        Terminés
      </h2>
      {showSeriesTerminer && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {series.terminee.map(film => (
            <WatchlistItem key={film.id} {...film} />
          ))}
        </div>
      )}

      {/* Toggle pour la section "En Pause" des séries */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-yellow-500 p-1 rounded-md pl-4" onClick={() => setShowSeriesEnPause(!showSeriesEnPause)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showSeriesEnPause ? '▼' : '☰'}
        </span>
        En Pause
      </h2>
      {showSeriesEnPause && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {series.enPause.map(film => (
            <WatchlistItem key={film.id} {...film} />
          ))}
        </div>
      )}

      {/* Toggle pour la section "Abandon" des séries */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-yellow-500 p-1 rounded-md pl-4" onClick={() => setShowSeriesAbandon(!showSeriesAbandon)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showSeriesAbandon ? '▼' : '☰'}
        </span>
        Abandonnés
      </h2>
      {showSeriesAbandon && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {series.abandonne.map(film => (
            <WatchlistItem key={film.id} {...film} />
          ))}
        </div>
      )}

      {/* Toggle pour la section "Prévu" des séries */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-yellow-500 p-1 rounded-md pl-4" onClick={() => setShowSeriesPrevu(!showSeriesPrevu)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showSeriesPrevu ? '▼' : '☰'}
        </span>
        Prévus
      </h2>
      {showSeriesPrevu && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {series.prevu.map(film => (
            <WatchlistItem key={film.id} {...film} />
          ))}
        </div>
      )}
    </section>
    );
}

export default SeriesSection;