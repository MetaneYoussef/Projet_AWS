import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/QcmHeader';
import Footer from '../../components/Footer/Footer';
import Recommendations from './Recommendations';


const movies = [
  { title: "Dune : Deuxieme Partie", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F290272%2Fposters%2F65ede951e6a8d.jpg&w=256&q=75" },
  { title: "Young Royals Forever", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F354720%2Fposters%2F65ef716807dd3.jpg&w=256&q=75" },
  { title: "Wonka", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F95846%2Fposters%2F65413559d33c6.jpg&w=256&q=75" },
  { title: "Argylle", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F201128%2Fposters%2F657b05825690c.jpg&w=256&q=75" },
  { title: "Tout sauf toi", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F350029%2Fposters%2F65626bc121c15.jpg&w=256&q=75" },
  { title: "Irish Wish", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F345244%2Fposters%2F65d127c49c91e.jpg&w=256&q=75" },
  { title: "Lala Land", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F139%2Fposters%2F637096fb47a60.jpg&w=256&q=75" },  
  { title: "Kung Fu Panda 4", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F339249%2Fposters%2F657c591bc45d2.jpg&w=256&q=75" },
]; 

const series = [];

const RecommendationsPage = () => {
  const { type } = useParams(); // Récupère 'films' ou 'series' de l'URL

  // Utilisez `useEffect` pour définir le type de contenu basé sur l'URL
  useEffect(() => {
    setContentType(type);
  }, [type]);

  const [contentType, setContentType] = useState(type); // Initialiser avec le type de l'URL

  // Sélectionnez les données appropriées basées sur le type de contenu
  const items = contentType === 'films' ? movies : series;

  return (
    <div>
      <Header />
      <Recommendations items={items} type={contentType} />
      <Footer />
    </div>
  );
};

export default RecommendationsPage;



/** import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/QcmHeader';
import Footer from '../../components/Footer/Footer';
import Recommendations from './Recommendations';

const RecommendationsPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // URL de votre API
      const url = 'URL_DE_VOTRE_API';
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Mettre à jour l'état avec les films récupérés
        setMovies(data.movies); // Assurez-vous que le format correspond à ce que votre composant attend
      } catch (error) {
        console.error("Erreur lors de la récupération des films:", error);
      }
    };
    
    fetchMovies();
  }, []); // Le tableau vide indique que l'effet ne dépend d'aucune variable d'état et ne s'exécute qu'une fois au montage du composant

  return (
    <div>
      <Header />
      <Recommendations movies={movies} />
      <Footer />
    </div>
  );
};

export default RecommendationsPage;
 */