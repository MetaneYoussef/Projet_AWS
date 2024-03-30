import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/Header/QcmHeader";
import Footer from "../../components/Footer/Footer"
import WatchlistItem from './Sections/EnCours';

function Watchlist() {
    const [activeList, setActiveList] = useState('films'); // 'films' or 'series'
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
        { id: 1, title: "Breaking Bad", episodeInfo: "5/54 épisodes", rating: 5, poster: "https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg" },
      ],
      terminee: [],
      enPause: [],
      abandonne: [],
      prevu: []
    });
    

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className='bg-black text-center py-2 font-semibold text-2xl text-white'>
              <h1> MA WATCHLIST</h1>
            </div>
            <div className="flex justify-center border-2 border-black font-bold bg-black mb-4">
                <button
                    className={` w-1/4 px-4 py-2 rounded-l-lg ${activeList === 'films' ? 'bg-black text-white border-4 border-red-600' : 'bg-red-700 text-white brightness-125'}`}
                    onClick={() => setActiveList('films')}
                >
                    FILMS
                </button>
                <button
                    className={`w-1/4 px-4 py-2 rounded-r-lg ${activeList === 'series' ? 'bg-black text-white border-4 border-yellow-500 ' : 'bg-yellow-500 text-white border-4 border-yellow-500'}`}
                    onClick={() => setActiveList('series')}
                >
                    SERIES
                </button>
            </div>
            <main className="flex-grow">
                {activeList === 'films' ? (
                    <section id="films" className="p-4">
                        <h2 className="text-xl font-bold mb-4">En cours</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {films.enCours.map(films => (
                                <WatchlistItem key={films.id} {...films} />
                            ))}
                        </div>
                    </section>
                ) : (
                    <section id="series" className="p-4">
                        <h2 className="text-xl font-bold mb-4">En cours</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {series.enCours.map(series => (
                                <WatchlistItem key={series.id} {...series} />
                            ))}
                        </div>
                    </section>
                )}
            </main>
            <div>
              <Footer />
            </div>
        </div>
    );
}

export default Watchlist;