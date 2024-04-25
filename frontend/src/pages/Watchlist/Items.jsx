import React from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";

function WatchlistItem({ id, title, episodeInfo, rating, poster, type }) {
  const { user } = useAuth(); 

  const handleAddToWatchlist = async () => {
    const endpoint = type === 'film' ? `/api/filmsWatchlist` : `/api/seriesWatchlist`;
    const data = {
			tmdbId: id,
			userId: user.id,
			...(type === 'serie' ? { saison: episodeInfo.saison, episode: episodeInfo.episode } : {})
		};
		
    try {
      await axios.post(endpoint, data, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert(`Ajouté à la Watchlist de ${type}!`);
    } catch (error) {
      console.error('Erreur lors de l\'ajout à la Watchlist', error);
      alert("Erreur lors de l'ajout à la Watchlist.");
    }
  };

  return (
    <div className="bg-black text-white border-2 rounded-lg flex lg:mb-2">
      <img src={poster} alt="Poster" className="w-32 h-44 md:w-40 md:h-56 rounded-md mr-4"/>
      <div className="flex flex-col justify-between w-full">
        <div>
          <p className="text-lg md:text-xl font-bold mb-1 mt-2">{title}</p>
          <p className="text-sm">{episodeInfo}</p>
          <button onClick={handleAddToWatchlist} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Ajouter à la Watchlist
          </button>
        </div>
        <div>
          <p className="flex items-center -mt-12 text-lg">
            {rating ? (
              <>
                <span className="mr-1 md:-mt-1 text-2xl md:text-3xl text-yellow-500">★</span>
                {`${rating}/10`}
              </>
            ) : (
              <>
                <span className="mr-1 md:-mt-1 text-2xl md:text-3xl text-white">★</span>
                -
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WatchlistItem;
