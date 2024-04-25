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
  const [showFilmsEnCours, setShowFilmsEnCours] = useState(true);
  const [showFilmsTerminee, setShowFilmsTerminee] = useState(false);
  const [showFilmsEnPause, setShowFilmsEnPause] = useState(false);
  const [showFilmsAbandonne, setShowFilmsAbandonne] = useState(false);
  const [showFilmsPrevu, setShowFilmsPrevu] = useState(false);

  useEffect(() => {
    if (!user) {
      setError('Vous devez être connecté pour voir votre watchlist.');
      setLoading(false);
      return;
    }

    const fetchWatchlistFilms = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/user/${user.id}/filmsWatchlist`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setFilms({
          enCours: response.data.enCours || [],
          terminee: response.data.terminee || [],
          enPause: response.data.enPause || [],
          abandonne: response.data.abandonne || [],
          prevu: response.data.prevu || []
        });
      } catch (err) {
        setError('Erreur lors du chargement des films de la Watchlist.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchWatchlistFilms();
  }, [user]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section id="films" className="p-4">
      {/* En cours */}
      <h2 className="toggle" onClick={() => setShowFilmsEnCours(!showFilmsEnCours)}>
        En cours
      </h2>
      {showFilmsEnCours && films.enCours.map(film => (
        <WatchlistItem key={film.id} {...film} type="film" />
      ))}

      {/* Terminées */}
      <h2 className="toggle" onClick={() => setShowFilmsTerminee(!showFilmsTerminee)}>
        Terminées
      </h2>
      {showFilmsTerminee && films.terminee.map(film => (
        <WatchlistItem key={film.id} {...film} type="film" />
      ))}

      {/* En Pause */}
      <h2 className="toggle" onClick={() => setShowFilmsEnPause(!showFilmsEnPause)}>
        En Pause
      </h2>
      {showFilmsEnPause && films.enPause.map(film => (
        <WatchlistItem key={film.id} {...film} type="film" />
      ))}

      {/* Abandonnées */}
      <h2 className="toggle" onClick={() => setShowFilmsAbandonne(!showFilmsAbandonne)}>
        Abandonnées
      </h2>
      {showFilmsAbandonne && films.abandonne.map(film => (
        <WatchlistItem key={film.id} {...film} type="film" />
      ))}

      {/* Prévues */}
      <h2 className="toggle" onClick={() => setShowFilmsPrevu(!showFilmsPrevu)}>
        Prévues
      </h2>
      {showFilmsPrevu && films.prevu.map(film => (
        <WatchlistItem key={film.id} {...film} type="film" />
      ))}
    </section>
  );
}

export default FilmsSection;
