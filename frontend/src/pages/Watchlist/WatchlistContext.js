import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

 
export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState({ movies: [], series: [] });
  
    const addToWatchlist = async (item, type) => {
      const userId = localStorage.getItem("id"); // S'assurer que l'ID utilisateur est stocké dans le localStorage
      const newItem = {
        userId,
        mediaId: item.id,
        mediaType: type,
        status: 'Prévu', // Utiliser le status initial ici
        watchedEpisodes: 0,
        totalEpisodes: type === 'movie' ? 1 : item.totalEpisodes
      };
  
      try {
        const response = await axios.post("https://what-you-watched.vercel.app/api/watchlist/add", newItem);
        console.log('Item added to watchlist', response.data);
        // Mettre à jour l'état local après confirmation du serveur
        if (type === 'movie') {
          setWatchlist(prev => ({ ...prev, movies: [...prev.movies, response.data] }));
        } else {
          setWatchlist(prev => ({ ...prev, series: [...prev.series, response.data] }));
        }
      } catch (error) {
        console.error('Error adding item to watchlist', error);
        alert("Erreur lors de l'ajout à la Watchlist!");
      }
    };

  const removeFromWatchlist = (id, type) => {
    if (type === 'movie') {
        setWatchlist(prev => ({ ...prev, movies: prev.movies.filter(item => item.id !== id) }));
    } else {
        setWatchlist(prev => ({ ...prev, series: prev.series.filter(item => item.id !== id) }));
    }
  };

  const updateStatus = (id, type, newStatus) => {
    if (type === 'movie') {
        setWatchlist(prev => ({
            ...prev,
            movies: prev.movies.map(movie => movie.id === id ? { ...movie, status: newStatus } : movie)
        }));
    } else {
        setWatchlist(prev => ({
            ...prev,
            series: prev.series.map(serie => serie.id === id ? { ...serie, status: newStatus } : serie)
        }));
    }
  };

  const updateRating = (id, type, newRating) => {
    if (type === 'movie') {
    setWatchlist(prev => ({
        ...prev,
        movies: prev.movies.map(movie =>
          movie.id === id ? { ...movie, rating: newRating } : movie
        )
      }));
    } else {
      setWatchlist(prev => ({
        ...prev,
        series: prev.series.map(serie => 
          serie.id === id ? { ...serie, rating: newRating } : serie)
      }));
    };
  }   

  const updateWatchedEpisodes = (id, type, watchedEpisodes) => {
    setWatchlist(prev => {
      const newMovies = prev.movies.map(movie => {
        if (movie.id === id) {
          return { ...movie, watchedEpisodes: parseInt(watchedEpisodes) };
        }
        return movie;
      });
  
      const newSeries = prev.series.map(serie => {
        if (serie.id === id) {
          return { ...serie, watchedEpisodes: parseInt(watchedEpisodes) };
        }
        return serie;
      });
  
      return {
        ...prev,
        movies: newMovies,
        series: newSeries
      };
    });
  };
  

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist,removeFromWatchlist, updateStatus, updateRating, updateWatchedEpisodes}}>
      {children}
    </WatchlistContext.Provider>
  )
};
