import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../../../components/Header/SeriesHeader";
import Footer from "../../../../components/Footer/Footer";

function SeriesDetails() {
  const { seriesId } = useParams();
  const [series, setSeries] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1); // État pour gérer la saison sélectionnée
  const [comments, setComments] = useState([]);  // Si les commentaires sont chargés dynamiquement
  const [newComment, setNewComment] = useState("");  // Gérer la saisie d'un nouveau commentaire
  const api_key = "433cffe8b54a391f4a13ca5bc5baa0d0"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching data for series details including seasons and episodes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const detailsUrl = `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${api_key}&language=fr-FR&append_to_response=credits,videos,similar,season/${selectedSeason}`;
        const response = await fetch(detailsUrl);
        const data = await response.json();
        if (data) {
          setSeries({
            name: data.name,
            poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            background: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
            rating: `${data.vote_average} ★★★★☆`,
            genres: data.genres.map(genre => genre.name),
            synopsis: data.overview,
            watchlistCount: data.popularity,
            commentCount: data.vote_count,
            seasons: data.seasons,
            episodes: data[`season/${selectedSeason}`].episodes,
            cast: data.credits.cast,
            similarSeries: data.similar.results,
          });
          setLoading(false);
        } else {
          setError("Aucune donnée disponible pour cette série");
          setLoading(false);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la série", error);
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };
    fetchData();
  }, [seriesId, api_key, selectedSeason]); 

  useEffect(() => {
    async function fetchCast() {
      const castUrl = `https://api.themoviedb.org/3/tv/${seriesId}/credits?api_key=${api_key}`;
      const response = await fetch(castUrl);
      const data = await response.json();
      setSeries(prev => ({
        ...prev,
        cast: data.cast.map(actor => ({
          name: actor.name,
          character: actor.character,
          photo: `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        }))
      }));
    }
  
    if (seriesId) {
      fetchCast();
    }
  }, [seriesId]);

  useEffect(() => {
    async function fetchSimilarSeries() {
      const similarUrl = `https://api.themoviedb.org/3/tv/${seriesId}/similar?api_key=${api_key}&language=en-US`;
      const response = await fetch(similarUrl);
      const data = await response.json();
      setSeries(prev => ({
        ...prev,
        similarSeries: data.results.map(series => ({
          id: series.id,
          name: series.name,
          poster: `https://image.tmdb.org/t/p/w500${series.poster_path}`
        }))
      }));
    }
  
    if (seriesId) {
      fetchSimilarSeries();
    }
  }, [seriesId]);


  const handlePostComment = () => {
    if (newComment.trim()) {
      setComments(prevComments => [...prevComments, { user: "Utilisateur", text: newComment }]);
      setNewComment("");  // Réinitialiser l'entrée de texte après l'envoi
    }
  };
  
  useEffect(() => {
    const fetchTrailer = async () => {
      const trailerUrl = `https://api.themoviedb.org/3/tv/${seriesId}/videos?api_key=${api_key}&language=en-US`;
      const response = await fetch(trailerUrl);
      const data = await response.json();
      const trailers = data.results.filter(video => video.type === 'Trailer');
      if (trailers.length > 0) {
        setSeries(prev => ({ ...prev, trailer: `https://www.youtube.com/watch?v=${trailers[0].key}` }));
      }
    };
  
    if (seriesId) {
      fetchTrailer();
    }
  }, [seriesId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!series) return <div>No data available.</div>;

  return (
    <div>
      <div style={{ backgroundImage: `url(${series.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Header />
        <div className="flex flex-col md:flex-row p-8 bg-black bg-opacity-70 text-white rounded-xl m-5 items-center md:items-start">
          <div className="md:w-1/4 flex flex-col items-center md:items-start">
            <img src={series.poster} alt="Poster du film" className="w-64 md:w-52 lg:w-64 h-96 md:h-72 lg:h-96 rounded-lg shadow-lg mb-5"/>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded md:ml-4 mb-3"
              onClick={() => window.open(series.trailer, '_blank')}>
              Lancer la Bande Annonce
            </button>
          </div>
          <div className="md:ml-4 md:w-2/3">
            <div className="flex flex-col md:ml-4">
              <h2 className="text-4xl font-bold mb-2 text-center md:text-start">{series.name}</h2>
              <p className="mb-2 text-center md:text-start">{series.rating}</p>
              <p className="mb-2 text-sm md:text-xs text-center md:text-start">{series.genres.join(", ")}</p>
              <br />
              <p className="flex mb-4 text-xl font-bold justify-center md:justify-start">SYNOPSIS :</p>
              <p className='mb-8 w-full text-justify'>{series.synopsis}</p>
            </div>
          </div>
          <div className="md:w-1/4 flex flex-col items-center md:items-start md:ml-8 mx-10 px-4">
            <div className="bg-black p-4 rounded-lg mb-4 text-center w-full">
              <p className='font-bold text-2xl antialiased'>{series.watchlistCount}</p>
              <p>ont ajouté ce film à leur Watchlist</p>
            </div>
            <div className="bg-black p-4 rounded-lg mb-4 text-center w-full">
              <p className='font-bold text-2xl antialiased'>{series.commentCount}</p>
              <p>commentaires</p>
            </div>
            <button className="bg-black hover:bg-yellow-900 hover:text-white text-yellow-600 border-2 border-yellow-400 font-bold py-2 px-4 rounded mb-4 w-full">+ Ajouter à la Watchlist</button>
            <button className="bg-black hover:bg-yellow-900 hover:text-white text-yellow-600 border-2 border-yellow-400 font-bold py-2 px-4 rounded w-full">Noter le film</button>
          </div>
        </div>
        <br />
      </div>

      {/* Episode Switcher */}
      <div className='flex overflow-x-auto scroll-smooth bg-yellow-500 p-4 text-white'>
        {series.seasons.map((season, index) => (
          <button key={index} onClick={() => setSelectedSeason(season.season_number)} 
                className={`mx-2 px-6 py-1 rounded-xl ${selectedSeason === season.season_number ? 'bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'}`}>
            Saison {season.season_number}
          </button>
        ))}
      </div>

      {/* Episodes List */}
      <div className='bg-yellow-600 p-16'>
        <h1 className='text-white text-3xl mb-4'>Episodes</h1>
        <div className="overflow-y-auto scroll-smooth grid grid-cols-1 md:grid-cols-2 gap-4">
          {series.episodes.map((episode, index) => (
            <div key={index} className="bg-yellow-950 p-4 rounded-lg">
              <h2 className="text-white font-bold">{`Episode ${episode.episode_number}: ${episode.name}`}</h2>
              <p className="text-white">{episode.overview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Affichage de la distribution */}
      <div className='bg-yellow-600 p-16'>
        <h1 className='text-white text-3xl mb-8 font-semibold'>Distribution</h1>
        <div className="flex overflow-x-auto">
          {series.cast?.map((actor, index) => (
            <div key={index} className="flex flex-col items-center mr-4" style={{ minWidth: '200px' }}>
              <img src={actor.photo} alt={actor.name} className="w-48 h-48 rounded-full object-cover"/>
              <p className="text-white mt-2 font-extrabold text-lg text-center">{actor.name}</p>
              <p className="text-white text-center font-semibold text-sm">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Affichage des séries similaires */}
      <div className='bg-yellow-600 p-16'>
        <h1 className='text-white text-3xl mb-4 font-semibold'>Les utilisateurs ont également regardé</h1>
        <div className="flex overflow-x-auto">
          {series.similarSeries?.map((similarSeries, index) => (
            <Link key={index} to={`/series/details/${similarSeries.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}/${similarSeries.id}`}>
              <div className="inline-block min-w-40 mr-4">
                <img src={similarSeries.poster} alt={similarSeries.name} className="w-40 h-60 rounded-lg shadow-lg"/>
                <p className="text-white mt-2">{similarSeries.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Section Commentaires */}
      <div className="bg-yellow-700 p-16">
      <h1 className='text-white text-3xl mb-4 font-semibold'>Commentaires</h1>
      <div className="mb-8">
        <textarea
          className="w-full bg-yellow-900 text-white p-4 rounded-lg border-2 border-yellow-400"
          placeholder="Ajoutez votre commentaire..."
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="bg-black text-white hover:bg-white hover:text-yellow-700 font-bold py-2 px-4 rounded mt-4"
          onClick={handlePostComment}
        >
          Publier
        </button>
      </div>
      {comments.map((comment, index) => (
        <div key={index} className="bg-yellow-900 p-4 rounded-lg mb-4 border-2 border-black">
          <p className="text-yellow-200 font-bold mb-1">{comment.user}</p>
          <p className="text-white">{comment.text}</p>
        </div>
      ))}
      <button className="w-full bg-black text-white hover:bg-white hover:text-yellow-700 font-bold py-2 px-4 rounded">
        Voir tous les commentaires
      </button>
    </div>
      <Footer />
    </div>
  );
}

export default SeriesDetails;
