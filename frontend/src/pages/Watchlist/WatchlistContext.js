import React, { createContext, useState, useContext } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState({ movies: [], series: [] });

  const addToWatchlist = (item, type) => {
    const newItem = {
      ...item,
      status: 'Prévu', // Utiliser le status initial ici
      watchedEpisodes: 0,
      totalEpisodes: type === 'movie' ? 1 : item.totalEpisodes
    };

    if (type === 'movie') {
      if (!watchlist.movies.some(movie => movie.id === item.id)) {
        setWatchlist(prev => ({ ...prev, movies: [...prev.movies, newItem] }));
      } else {
        alert("Ce film est déjà dans votre Watchlist!");
      }
    } else { // pour les séries
      if (!watchlist.series.some(serie => serie.id === item.id)) {
        setWatchlist(prev => ({ ...prev, series: [...prev.series, newItem] }));
      } else {
        alert("Cette série est déjà dans votre Watchlist!");
      }
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

  const updateRating = (id, newRating) => {
    setWatchlist(prev => ({
      ...prev,
      movies: prev.movies.map(movie =>
        movie.id === id ? { ...movie, rating: newRating } : movie
      )
    }));
  };

  const updateWatchedEpisodes = (id, type, watchedEpisodes) => {
    setWatchlist(prev => {
      return {
        ...prev,
        movies: prev.movies.map(movie => {
          if (movie.id === id) {
            const updatedMovie = {
              ...movie,
              watchedEpisodes: parseInt(watchedEpisodes),
              status: parseInt(watchedEpisodes) === movie.totalEpisodes ? 'Terminé' : movie.status
            };
            return updatedMovie;
          }
          return movie;
        })
      };
    });
  };
  

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist,removeFromWatchlist, updateStatus, updateRating, updateWatchedEpisodes}}>
      {children}
    </WatchlistContext.Provider>
  );
};
