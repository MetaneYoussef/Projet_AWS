import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/SeriesHeader";
import Footer from "../../../components/Footer/Footer";
import SearchComponent from "../../../components/NavigationBar/SeriesSearch";
import SeriesCardSkeleton from "../../../components/SeriesCard/SeriesCardSkeleton";

const categories = ["Toutes les séries", "Tendances", "Les plus regardées", "Les plus ajoutées", "Drame", "Comédie", "Romance", "Horreur", "Fantastique", "Animation"];

function Series() {
  const [activeCategory, setActiveCategory] = useState("Toutes les séries");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // Simuler un chargement
  }, [activeCategory]);

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
                  className={`text-white px-4 py-2 rounded-full hover:bg-yellow-500 ${activeCategory === category ? "bg-yellow-500" : "bg-yellow-700"}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            {loading ? (
              // Dans le composant Series, à l'intérieur du rendu conditionnel {loading ? (...) : (...)}
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0 p-4">
                {[...Array(6)].map((_, index) => (
                  <SeriesCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div>
                {/* Afficher les séries ici après le chargement */}
                Séries de la catégorie {activeCategory}
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