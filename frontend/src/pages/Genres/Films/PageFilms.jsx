import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/MovieHeader";
import Footer from "../../../components/Footer/Footer";
import MovieCardSkeleton from "../../../components/MovieCard/MovieCardSkeleton";
import MovieList from "./MovieList";


const categories = ["Tous les films", "Classiques", "Les plus ajoutés", "Action", "Comédie", "Animation", "Émotion","Jeunesse", "Horreur", "Science-Fiction", "Suspense"];

function FilmsPage2() {
  const { genre } = useParams();
  const [activeCategory, setActiveCategory] = useState(genre || "Tous les films");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // Simuler un chargement
  }, [activeCategory]);

  // Met à jour l'URL sans recharger la page
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    navigate(`/films/${category}`); // Modifie l'URL pour refléter la catégorie sélectionnée
  };
  
    return (
      <div className="flex flex-col min-h-screen">
        <div className="bg-red-700">
          <Header />
        </div>
        <div className="flex-grow">
          <section className="bg-red-700">
            <div className="container mx-auto py-6">
              <div className="ml-16">
              <h1 className="text-white text-3xl font-bold">Films</h1>
              <div className="flex overflow-x-auto py-4 space-x-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-500 ${activeCategory === category ? "bg-red-500" : "bg-red-700"}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {loading ? (
                // Dans le composant Films, à l'intérieur du rendu conditionnel {loading ? (...) : (...)}
                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0 p-4">
                  {[...Array(6)].map((_, index) => (
                    <MovieCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="">
                  {/* Afficher les Films ici après le chargement */}
                  <p className="bg-red-900 py-2 pl-5 text-white text-3xl font-bold">Films de la catégorie : {activeCategory}</p>
                  <MovieList/>
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

export default FilmsPage2;