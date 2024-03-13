import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/MovieHeader";
import Footer from "../../../components/Footer/Footer";
import SearchComponent from "../../../components/NavigationBar/MovieSearch";
import MovieCardSkeleton from "../../../components/MovieCard/MovieCardSkeleton";
// Import Section and films when you're ready to use them

// Simuler des données de catégories pour l'exemple
const categories = ["Toutes les films", "Actuellement au cinéma", "Les plus regardés", "Les plus ajoutés", "Drame", "Comédie", "Romance", "Horreur", "Fantastique", "Animation"];

function FilmsPage() {
  const [activeCategory, setActiveCategory] = useState("Toutes les films");
  const [loading, setLoading] = useState(false);
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // Ici, vous chargeriez les Films correspondant à la catégorie sélectionnée
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // Simuler un chargement
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-red-700">
        <Header />
      </div>
      <div className="flex-grow">
        <section className="bg-red-700">
          <div className="container mx-auto py-6">
            <div className="ml-14">
            <h1 className="text-white text-3xl font-semibold">Films</h1>
            <div className="flex overflow-x-auto py-4 space-x-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`text-white px-4 py-2 rounded-full hover:bg-red-500 ${activeCategory === category ? "bg-red-500" : "bg-red-800"}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            {loading ? (
              // Dans le composant Movie, à l'intérieur du rendu conditionnel {loading ? (...) : (...)}
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0 p-4">
                {[...Array(6)].map((_, index) => (
                  <MovieCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div>
                {/* Afficher les Films ici après le chargement */}
                Films de la catégorie {activeCategory}
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