import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../../components/Header/SeriesHeader";
import Footer from "../../../../components/Footer/Footer";

function SeriesDetails() {
  const { seriesId } = useParams();
  const [series, setSeries] = useState(null);
  const [comments, setComments] = useState([]);
  const api_key = "433cffe8b54a391f4a13ca5bc5baa0d0";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const seriesData = await Promise.all([
          fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${api_key}&language=fr-FR`).then(res => res.json()),
          fetch(`https://api.themoviedb.org/3/tv/${seriesId}/credits?api_key=${api_key}`).then(res => res.json()),
          fetch(`https://api.themoviedb.org/3/tv/${seriesId}/similar?api_key=${api_key}&language=fr-FR`).then(res => res.json())
        ]);
        const [seriesInfo, castInfo, similarInfo] = seriesData;

        setSeries({
          title: seriesInfo.name,
          poster: `https://image.tmdb.org/t/p/w500${seriesInfo.poster_path}`,
          background: `https://image.tmdb.org/t/p/original${seriesInfo.backdrop_path}`,
          rating: `${seriesInfo.vote_average} ★★★★☆`,
          genres: seriesInfo.genres.map(genre => genre.name),
          synopsis: seriesInfo.overview,
          watchlistCount: seriesInfo.popularity,
          commentCount: seriesInfo.vote_count,
          cast: castInfo.cast.map(actor => ({
            name: actor.name,
            character: actor.character,
            photo: `https://image.tmdb.org/t/p/w500${actor.profile_path}`
          })),
          similarSeries: similarInfo.results.map(similar => ({
            id: similar.id,
            title: similar.name,
            poster: `https://image.tmdb.org/t/p/w500${similar.poster_path}`
          }))
        });
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la série", error);
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };
    fetchData();
  }, [seriesId, api_key]);

  if (loading) return <div className="flex bg-yellow-500 h-full py-1/2 text-2xl text-white font-bold justify-center">Chargement...</div>;
  if (error) return <div className="bg-yellow-500 text-white text-xl p-3">Erreur: {error}</div>;
  if (!series) return <div className="bg-yellow-500 text-white text-xl p-3">Aucune donnée disponible</div>;


  return (
    <div>
      <div style={{ backgroundImage: `url(${series.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Header />
        <div className="flex flex-col md:flex-row p-8 bg-black bg-opacity-70 text-white rounded-xl m-5 items-center md:items-start">
          <div className="md:w-1/4 flex flex-col items-center md:items-start">
            <img src={series.poster} alt="Poster du film" className="w-64 h-96 rounded-lg shadow-lg mb-5"/>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0">Lancer la Bande Annonce</button>
          </div>
          <div className="md:ml-4 md:w-2/3">
            <div className="flex flex-col md:ml-4">
              <h2 className="text-4xl font-bold mb-2">{series.title}</h2>
              <p className="mb-2">{series.rating}</p>
              <p className="mb-2 text-xs">{series.genres.join(", ")}</p>
              <br />
              <p className="mb-4 font-bold">SYNOPSIS :</p>
              <p className='w-3/4'>{series.synopsis}</p>
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
            <button className="bg-black hover:bg-yellow-700 hover:text-white text-yellow-600 border-2 border-yellow-400 font-bold py-2 px-4 rounded mb-4 w-full">+ Ajouter à la Watchlist</button>
            <button className="bg-black hover:bg-yellow-700 hover:text-white text-yellow-600 border-2 border-yellow-400 font-bold py-2 px-4 rounded w-full">Noter le film</button>
          </div>
        </div>
        <br />
      </div>

      {/* Section Episodes */}
      <div className='bg-yellow-600 p-16'>
          <h1 className='text-white text-3xl mb-8 font-semibold'>Épisodes</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {series.episodes.map((episode, index) => (
              <div key={index} className="bg-yellow-900 rounded-lg p-4 shadow-lg shadow-black">
                <h2 className="text-white font-bold">{`S${episode.season}E${episode.episode} - ${episode.title}`}</h2>
                <p className="text-white">{episode.synopsis}</p>
              </div>
            ))}
          </div>
        </div>

      {/* Distribution Section */}
      <div className='bg-yellow-600 p-16'>
        <h1 className='text-white text-3xl mb-8 font-semibold'>Distribution</h1>
        {/* Exemple d'une liste horizontale pour la distribution (Utiliser Tailwind CSS pour le style) */}
        <div className="flex overflow-x-auto">
          {series.cast?.map((actor, index) => (
            <div key={index} className="flex flex-col items-center mr-4" style={{ minWidth: '200px' }}> {/* Ajustement ici */}
              <img src={actor.photo} alt={actor.name} className="w-48 h-48 rounded-full object-cover"/>
              <p className="text-white mt-2 font-extrabold text-lg text-center">{actor.name}</p> {/* Centrez le texte ici */}
              <p className="text-white text-center font-semibold text-sm">{actor.character}</p> {/* Centrez le texte ici */}
            </div>
          ))}
        </div>
      </div>

      {/* Recommandations Section */}
      <div className='bg-yellow-600 p-16'>
        <h1 className='text-white text-3xl mb-4 font-semibold'>Les utilisateurs ont également regardé</h1>
        <div className="flex overflow-x-auto">
          {/* Supposons que vous avez un tableau 'similarseriess' dans 'series' */}
          {series.similarseries?.map((series, index) => (
            <div key={index} className="flex flex-col items-center mr-4">
              <img src={series.poster} alt={series.title} className="w-40 h-60 rounded-lg shadow-lg"/>
              <p className="text-white mt-2">{series.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-yellow-600 p-16">
        <h1 className='text-white text-3xl mb-4 font-semibold'>Commentaires</h1>
        <div className="mb-8">
          <textarea
            className="w-full bg-yellow-900 text-white p-4 rounded-lg border-2 border-yellow-400"
            placeholder="Ajoutez votre commentaire..."
            rows="3"
          ></textarea>
          <button className="bg-black text-white hover:bg-white hover:text-yellow-700  font-bold py-2 px-4 rounded mt-4">Publier</button>
        </div>
        {comments.map((comment, index) => (
          <div key={index} className="bg-yellow-900 p-4 rounded-lg mb-4 border-2 border-black">
            <p className="text-yellow-200 font-bold mb-1">{comment.user}</p>
            <p className="text-white">{comment.text}</p>
          </div>
        ))}
        <button className="w-full bg-black text-white hover:bg-white hover:text-yellow-700 font-bold py-2 px-4 rounded">Voir tous les commentaires</button>
      </div>
      <Footer/>
    </div>
  );
}

export default SeriesDetails;