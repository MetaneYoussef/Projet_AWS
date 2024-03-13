import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importez useNavigate
import Header from "../../../components/Header/MovieHeader";
import Footer from "../../../components/Footer/Footer";
import MovieCardSkeleton from "../../../components/MovieCard/MovieCardSkeleton";
import filmsData from "../../../components/MovieList/films"; // Assurez-vous d'importer vos données de films correctement

const categories = Object.keys(filmsData);

function FilmsPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(false);
  const [displayedFilms, setDisplayedFilms] = useState([]);

  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

  const handleFilmClick = (film) => {
    // Utilisez navigate pour rediriger vers la page de détails du film
    navigate(`/movie-detail/${film.id}`); // Assurez-vous que le chemin correspond à vos routes configurées
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setLoading(true);
    // Simuler un chargement des données
    setTimeout(() => {
      setDisplayedFilms(filmsData[category]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    handleCategoryClick(activeCategory); // Chargez les films de la catégorie active au montage du composant
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-red-700">
        <Header />
      </div>
      <div className="flex-grow">
        <section className="bg-red-700">
          <div className="container mx-auto py-6">
            <div className="ml-20">
              <h1 className="text-white text-3xl font-bold ml-5">Films</h1>
              <div className="flex overflow-x-auto py-6 space-x-4 ml-5">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`text-white px-4 py-2 rounded-full hover:bg-red-500 ${activeCategory === category ? "bg-red-500" : "bg-red-800"}`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {loading ? (
                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 p-4">
                  {[...Array(6)].map((_, index) => (
                    <MovieCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 p-4">
                  {displayedFilms.map((film) => (
                    <div key={film.id} className="max-w-sm rounded overflow-hidden shadow-lg" onClick={() => handleFilmClick(film)}>
                      <img className="w-full" src={film.imageUrl} alt={film.title} />
                      <div className="bg-red-700 px-6 py-4">
                        <div className="text-white font-bold text-xl mb-2">{film.title}</div>
                        <p className="text-white text-sm">Rating: {film.rating}</p>
                        <p className="text-white text-sm">Release Date: {film.releaseDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default FilmsPage;
