import React, { useState, useEffect } from "react";
import api from '../../Services/CallApi';  // Vérifie que le chemin vers ton fichier API est correct

const SearchComponentMobile = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 2) {
        setIsLoading(true);
        try {
          const response = await api.searchMulti(query);
          setResults(response.data.results);
        } catch (error) {
          console.error('Erreur lors de la recherche:', error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex flex-col items-center relative">
      <input
        type="text"
        placeholder="Recherchez..."
        aria-label="Recherchez des films ou des séries"
        value={query}
        onChange={handleSearch}
        className="p-1.5 bg-black text-white border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-black-600 transition-all duration-500 ease-in-out w-full"
      />
      <div className={`absolute top-full mt-2 w-full bg-black text-white rounded-lg shadow-lg overflow-hidden ${results.length > 0 || isLoading ? 'block' : 'hidden'}`}>
        {isLoading ? (
          <div className="p-2 text-center">Chargement...</div>
        ) : (
          results.map(item => (
            <div key={item.id} className="text-center flex flex-col items-center">
              <img 
                src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/images/default_poster.jpg"} 
                alt={item.title || item.name} 
                className="w-full h-auto object-cover"
              />
              <h3 className="text-white text-xs sm:text-sm md:text-base mt-2">{item.title || item.name}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchComponentMobile;
