import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import WatchlistItem from './Items';
import { useAuth } from "../../context/AuthContext";

function SeriesSection() {
	const { user } = useAuth();
  const [series, setSeries] = useState({
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

    // Assurez-vous que vous avez les bonnes URL et méthodes pour récupérer les données
    const fetchWatchlistSeries = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/user/${user.id}/seriesWatchlist`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        // Supposons que la réponse a une structure correcte et contient des listes pour chaque catégorie
        setSeries({
          enCours: response.data.enCours || [],
          terminee: response.data.terminee || [],
          enPause: response.data.enPause || [],
          abandonne: response.data.abandonne || [],
          prevu: response.data.prevu || []
        });
      } catch (err) {
        setError('Erreur lors du chargement des séries de la Watchlist.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchWatchlistSeries();
  }, [user]); // Depend only on user, as token and id are properties of user

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

	return (
    <section id="series" className="p-4">
      {/* En cours */}
      <h2 className="toggle" onClick={() => setShowSeriesEnCours(!showSeriesEnCours)}>
        En cours
      </h2>
      {showSeriesEnCours && series.enCours.map(serie => (
        <WatchlistItem key={serie.id} {...serie} type="serie" />
      ))}

      {/* Terminées */}
      <h2 className="toggle" onClick={() => setShowSeriesTerminee(!showSeriesTerminee)}>
        Terminées
      </h2>
      {showSeriesTerminee && series.terminee.map(serie => (
        <WatchlistItem key={serie.id} {...serie} type="serie" />
      ))}

      {/* En Pause */}
      <h2 className="toggle" onClick={() => setShowSeriesEnPause(!showSeriesEnPause)}>
        En Pause
      </h2>
      {showSeriesEnPause && series.enPause.map(serie => (
        <WatchlistItem key={serie.id} {...serie} type="serie" />
      ))}

      {/* Abandonnées */}
      <h2 className="toggle" onClick={() => setShowSeriesAbandonne(!showSeriesAbandonne)}>
        Abandonnées
      </h2>
      {showSeriesAbandonne && series.abandonne.map(serie => (
        <WatchlistItem key={serie.id} {...serie} type="serie" />
      ))}

      {/* Prévues */}
      <h2 className="toggle" onClick={() => setShowSeriesPrevu(!showSeriesPrevu)}>
        Prévues
      </h2>
      {showSeriesPrevu && series.prevu.map(serie => (
        <WatchlistItem key={serie.id} {...serie} type="serie" />
      ))}
    </section>
  );}

export default SeriesSection;


