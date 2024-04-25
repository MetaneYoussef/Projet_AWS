import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WatchlistItem from './Items';
import { useAuth } from "../../context/AuthContext";

function FilmsSection() {
	const { user } = useAuth();
	const [films, setFilms] = useState({
    enCours: [],
    terminee: [],
    enPause: [],
    abandonne: [],
    prevu: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setError('Vous devez être connecté pour voir votre watchlist.');
      setLoading(false);
      return;
    }

    const fetchWatchlistFilms = async () => {
      try {
        const response = await axios.get(`/api/user/${user.id}/filmsWatchlist`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setFilms(prevFilms => ({
          ...prevFilms,
          enCours: response.data // Cette partie dépend de la structure de votre réponse API
        }));
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des films de la Watchlist', error);
        setError('Erreur lors du chargement des films.');
        setLoading(false);
      }
    };

    fetchWatchlistFilms();
  }, [user]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section id="films" className="p-4">
      <h2 className="toggle" onClick={() => setShowFilmsEnCours(!showFilmsEnCours)}>
        En cours
      </h2>
      {showFilmsEnCours && films.enCours.map(film => (
        <WatchlistItem key={film.id} {...film} type="film" />
      ))}
      {/* Implémentez les autres sections telles que Terminée, En Pause, etc., selon vos besoins */}
    </section>
  );
}

export default FilmsSection;
