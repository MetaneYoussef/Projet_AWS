import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/SeriesHeader";
import Footer from "../../../components/Footer/Footer";
import SearchComponent from "../../../components/NavigationBar/SeriesSearch";
import SeriesCardSkeleton from "../../../components/SeriesCard/SeriesCardSkeleton";

const categories = ["Toutes les séries", "Tendances", "Les plus regardées", "Action", "Comédie", "Animation", "Émotion","Jeunesse", "Horreur", "Science-Fiction", "Suspense"];

function Series() {
  const { genre } = useParams();
  const [activeCategory, setActiveCategory] = useState(genre || "Tous les séries");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // Simuler un chargement
  }, [activeCategory]);

  // Met à jour l'URL sans recharger la page
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    navigate(`/series/${category}`); // Modifie l'URL pour refléter la catégorie sélectionnée
  };
  
    return (
      <div className="flex flex-col min-h-screen">
        <div className="bg-yellow-600">
          <Header />
        </div>
        <div className="flex-grow">
          <section className="bg-yellow-600">
            <div className="container mx-auto py-6">
              <div className="ml-24">
              <h1 className="text-white text-3xl font-bold">Séries</h1>
              <div className="flex overflow-x-auto py-4 space-x-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 ${activeCategory === category ? "bg-yellow-500" : "bg-yellow-600"}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {loading ? (
                // Dans le composant séries, à l'intérieur du rendu conditionnel {loading ? (...) : (...)}
                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0 p-4">
                  {[...Array(6)].map((_, index) => (
                    <SeriesCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="bg-yellow-900 py-2 pl-5">
                  {/* Afficher les séries ici après le chargement */}
                  <p className="text-white text-3xl font-bold">Séries de la catégorie : {activeCategory}</p>
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


export default Series;