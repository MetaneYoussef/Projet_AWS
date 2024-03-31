import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/Header/QcmHeader";
import Footer from "../../components/Footer/Footer"
import WatchlistItem from './Items';

function Watchlist() {
  const [activeList, setActiveList] = useState('films');
  const [showFilmsEnCours, setShowFilmsEnCours] = useState(false); // Ajout pour gérer l'affichage de la section films "En cours"
  const [showSeriesEnCours, setShowSeriesEnCours] = useState(false); // Ajout pour gérer l'affichage de la section séries "En cours"
  const [showFilmsTerminer, setShowFilmsTerminer] = useState(false); // Ajout pour gérer l'affichage de la section films "En cours"
  const [showSeriesTerminer, setShowSeriesTerminer] = useState(false); // Ajout pour gérer l'affichage de la section séries "En cours"
  const [showFilmsEnPause, setShowFilmsEnPause] = useState(false); // Ajout pour gérer l'affichage de la section films "En cours"
  const [showSeriesEnPause, setShowSeriesEnPause] = useState(false); // Ajout pour gérer l'affichage de la section séries "En cours"
  const [showFilmsAbandon, setShowFilmsAbandon] = useState(false); // Ajout pour gérer l'affichage de la section films "En cours"
  const [showSeriesAbandon, setShowSeriesAbandon] = useState(false); // Ajout pour gérer l'affichage de la section séries "En cours"
  const [showFilmsPrevu, setShowFilmsPrevu] = useState(false); // Ajout pour gérer l'affichage de la section films "En cours"
  const [showSeriesPrevu, setShowSeriesPrevu] = useState(false); // Ajout pour gérer l'affichage de la section séries "En cours"

  const [films, setFilms] = useState({
    enCours: [
      { id: 1, title: "Inception", episodeInfo: "1/1 épisodes", rating: 5, poster: "https://media.senscritique.com/media/000012872126/0/inception.jpg" },
    ],
    terminee: [],
    enPause: [],
    abandonne: [],
    prevu: []
  });

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
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <div className='bg-black text-center py-4 font-bold text-2xl text-white'>
        <h1> MA WATCHLIST</h1>
      </div>
      <div className="flex justify-center border-2 border-black font-bold bg-black mb-4">
        <button
          className={` w-1/4 px-4 py-2 rounded-l-lg ${activeList === 'films' ? 'bg-red-700 text-white brightness-125' : 'bg-black text-white border-4 border-red-600'}`}
          onClick={() => setActiveList('films')}
        >
            FILMS
        </button>
        <button
          className={`w-1/4 px-4 py-2 rounded-r-lg ${activeList === 'series' ? 'bg-yellow-500 text-white border-4 border-yellow-500' : 'bg-black text-white border-4 border-yellow-500'}`}
          onClick={() => setActiveList('series')}
        >
          SERIES
        </button>
      </div>
      <main className="flex-grow">
          {activeList === 'films' ? (
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
                  Terminé
                </h2>
                {showFilmsTerminer && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {films.terminee.map(film => (
                      <WatchlistItem key={film.id} {...film} />
                    ))}
                  </div>
                )}
              </section>
          ) : (
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
            </section>
          )}
      </main>
      <div className='bg-white'>
        <Footer />
      </div>
    </div>
  );
}

export default Watchlist;