import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../../../components/Header/MovieHeader";
import Footer from "../../../../components/Footer/Footer";
import { useWatchlist } from "../../../Watchlist/WatchlistContext";

function MovieDetails() {
  const { movieId } = useParams();  // Assurez-vous que le nom du paramètre correspond à celui défini dans vos routes
  const { addToWatchlist, watchlist } = useWatchlist(); // Utilisez addToWatchlist du contexte
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);  // Si les commentaires sont chargés dynamiquement
  const [newComment, setNewComment] = useState("");  // Gérer la saisie d'un nouveau commentaire
  const api_key = "433cffe8b54a391f4a13ca5bc5baa0d0"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=fr-FR`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data) { // Assurez-vous que data contient les données nécessaires
          setMovie({
            title: data.title,
            poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            background: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
            rating: `${data.vote_average} ★★★★☆`,
            genres: data.genres.map(genre => genre.name),
            synopsis: data.overview,
            watchlistCount: data.popularity,
            commentCount: data.vote_count,
            cast: [],
            similarMovies: []
          });
          setLoading(false);
        } else {
          setError("Aucune donnée disponible pour ce film");
          setLoading(false);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du film", error);
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId, api_key]);
  
  useEffect(() => {
    async function fetchCast() {
      const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`;
      const response = await fetch(castUrl);
      const data = await response.json();
      setMovie(prev => ({
        ...prev,
        cast: data.cast.map(actor => ({
          name: actor.name,
          character: actor.character,
          photo: `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        }))
      }));
    }
  
    if (movieId) {
      fetchCast();
    }
  }, [movieId]);

  useEffect(() => {
    async function fetchSimilarMovies() {
      const similarUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${api_key}&language=en-US`;
      const response = await fetch(similarUrl);
      const data = await response.json();
      setMovie(prev => ({
        ...prev,
        similarMovies: data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }))
      }));
    }
  
    if (movieId) {
      fetchSimilarMovies();
    }
  }, [movieId]);

  const handlePostComment = () => {
    if (newComment.trim()) {
      setComments(prevComments => [...prevComments, { user: "Utilisateur", text: newComment }]);
      setNewComment("");  // Réinitialiser l'entrée de texte après l'envoi
    }
  };
  
  useEffect(() => {
    const fetchTrailer = async () => {
      const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}&language=fr-FR`;
      const response = await fetch(trailerUrl);
      const data = await response.json();
      const trailers = data.results.filter(video => video.type === 'Trailer');
      if (trailers.length > 0) {
        setMovie(prev => ({ ...prev, trailer: `https://www.youtube.com/watch?v=${trailers[0].key}` }));
      }
    };
  
    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);

  const handleAddToWatchlistClick = () => {
    if (movie) {
      addToWatchlist({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        type: 'films' // Assurez-vous que le type est correct selon votre contexte
      });
    }
  };
  
  

  if (loading) return <div className="flex bg-red-600 h-full py-1/2 text-2xl text-white font-bold justify-center" >.........</div>;
  if (error) return <div className="bg-red-600">Erreur: {error}</div>;


  return (
    <div>
      <div style={{ backgroundImage: `url(${movie.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Header />
        <div className="flex flex-col md:flex-row p-8 bg-black bg-opacity-70 text-white rounded-xl m-5 items-center md:items-start">
          <div className="md:w-1/4 flex flex-col items-center md:items-start">
            <img src={movie.poster} alt="Poster du film" className="w-64 md:w-52 lg:w-64 h-96 md:h-72 lg:h-96 rounded-lg shadow-lg mb-5"/>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md:ml-4 mb-3"
              onClick={() => window.open(movie.trailer, '_blank')}>
              Lancer la Bande Annonce
            </button>
          </div>
          <div className="md:ml-4 md:w-2/3">
            <div className="flex flex-col md:ml-4">
              <h2 className="text-4xl font-bold mb-2 text-center md:text-start">{movie.title}</h2>
              <p className="mb-2 text-center md:text-start">{movie.rating}</p>
              <p className="mb-2 text-sm md:text-xs text-center md:text-start">{movie.genres.join(", ")}</p>
              <br />
              <p className="flex mb-4 text-xl font-bold justify-center md:justify-start">SYNOPSIS :</p>
              <p className='mb-8 w-full text-justify'>{movie.synopsis}</p>
            </div>
          </div>
          <div className="md:w-1/4 flex flex-col items-center md:items-start md:ml-8 mx-10 px-4">
            <div className="bg-black p-4 rounded-lg mb-4 text-center w-full">
              <p className='font-bold text-2xl antialiased'>{movie.watchlistCount}</p>
              <p>ont ajouté ce film à leur Watchlist</p>
            </div>
            <div className="bg-black p-4 rounded-lg mb-4 text-center w-full">
              <p className='font-bold text-2xl antialiased'>{movie.commentCount}</p>
              <p>commentaires</p>
            </div>
            <button className="bg-black hover:bg-red-900 hover:text-white text-red-600 border-2 border-red-400 font-bold py-2 px-4 rounded mb-4 w-full">+ Ajouter à la Watchlist</button>
            <button className="bg-black hover:bg-red-900 hover:text-white text-red-600 border-2 border-red-400 font-bold py-2 px-4 rounded w-full">Noter le film</button>
          </div>
        </div>
        <br />
      </div>

      {/*Affichage de la distribution*/}
      <div className='bg-red-700 -mb-10 md:mb-0 p-16'>
        <h1 className='text-white text-3xl mb-8 font-semibold'>Distribution</h1>
        <div className="flex overflow-x-auto">
          {movie.cast?.map((actor, index) => (
            <div key={index} className="flex flex-col items-center mr-4" style={{ minWidth: '200px' }}>
              <img src={actor.photo} alt={actor.name} className="w-48 h-48 rounded-full object-cover"/>
              <p className="text-white mt-2 font-extrabold text-lg text-center">{actor.name}</p>
              <p className="text-white text-center font-semibold text-sm">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/*Affichage des films similaires*/}
      <div className='bg-red-700 -mb-10 md:mb-0 p-16'>
        <h1 className='text-white text-3xl mb-4 font-semibold'>Les utilisateurs ont également regardé</h1>
        <div className="flex overflow-x-auto">
          {movie.similarMovies?.map((simMovie, index) => (
            <Link key={index} to={`films/details/${simMovie.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}}/${simMovie.id}`}>
              <div className="inline-block min-w-40 mr-4">
                <img src={simMovie.poster} alt={simMovie.title} className="w-40 h-60 rounded-lg shadow-lg"/>
                <p className="text-white mt-2">{simMovie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Zone de commentaires */}
      <div className="bg-red-700 p-16">
      <h1 className='text-white text-3xl mb-4 font-semibold'>Commentaires</h1>
      <div className="mb-8">
        <textarea
          className="w-full bg-red-900 text-white p-4 rounded-lg border-2 border-red-400"
          placeholder="Ajoutez votre commentaire..."
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          className="bg-black text-white hover:bg-white hover:text-red-700 font-bold py-2 px-4 rounded mt-4"
          onClick={handlePostComment}
        >
          Publier
        </button>
      </div>
      {comments.map((comment, index) => (
        <div key={index} className="bg-red-900 p-4 rounded-lg mb-4 border-2 border-black">
          <p className="text-red-200 font-bold mb-1">{comment.user}</p>
          <p className="text-white">{comment.text}</p>
        </div>
      ))}
      <button className="w-full bg-black text-white hover:bg-white hover:text-red-700 font-bold py-2 px-4 rounded">
        Voir tous les commentaires
      </button>
    </div>
      <Footer/>
    </div>
  );
}

export default MovieDetails;

