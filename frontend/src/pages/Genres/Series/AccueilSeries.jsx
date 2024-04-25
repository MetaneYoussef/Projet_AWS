import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../../../components/Header/SeriesHeader';
import Footer from '../../../components/Footer/Footer';
import Slider from '../../../components/Bannieres/SliderSeries';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import Affichage from './Categories/Affichage';


// Template pour de l'affichage des Series en bannière
const SeriesBanner = ({ Series }) => {
  // Création de l'URL de manière dynamique basée sur le titre du film
  const seriesDetailUrl = `/series/detail/${Series.title.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')  // Remplace tout ce qui n'est pas alphanumérique par un tiret
    .replace(/-+/g, '-')}`;      // Remplace les séquences de tirets par un seul tiret

  return (
    <div className="inline-block cursor-pointer mr-4 mb-2 mt-3">
      <Link to={seriesDetailUrl}>
        <img src={Series.poster} alt={Series.title} className="rounded-lg shadow-lg w-[650px] h-[350px] object-cover" />
      </Link>
    </div>
  );
  };

// Pour chaque genre, utilisez Link pour naviguer
const GenreBanner = ({ genre }) => (
  <Link to={`/series/${genre.name}`} className="inline-block cursor-pointer mr-4 mb-2 mt-3 bg-yellow-500 text-white">
    <img src={genre.image} alt={genre.name} className='rounded-lg shadow-xl w-[220px] h-[150px] object-cover border-2 border-white hover:brightness-75'/>
  </Link>
);


const SeriesHomePage = () => {
  // Index pour le défilement des catégories
  const [currentGenreIndex, setCurrentGenreIndex] = useState(0);

  // Constantes pour la taille des affiches (nécessaires aux défilemens des catégories)
  const moveWidth3 = 5*(220 + 16); // Calcul de la distance de déplacement total par clic (CATEGORIE)

  // Base de données des genres
  const genres = [
    { name: "Toutes les séries", image: `${process.env.PUBLIC_URL}/images/Genres/Series/ToutesLesSeries.jpg` },
    { name: "Classiques", image: `${process.env.PUBLIC_URL}/images/Genres/Series/Classiques.png` },
    { name: "Action", image: `${process.env.PUBLIC_URL}/images/Genres/Series/Action.png` },
    { name: "Comédie", image: `${process.env.PUBLIC_URL}/images/Genres/Series/Comedie.png` },
    { name: "Science-Fiction", image: `${process.env.PUBLIC_URL}/images/Genres/Series/S-FX.jpg` },
    { name: "Émotion", image: `${process.env.PUBLIC_URL}/images/Genres/Series/Emotion.png` },
    { name: "Policier", image: `${process.env.PUBLIC_URL}/images/Genres/Series/Policier.png` },
    { name: "Animation", image: `${process.env.PUBLIC_URL}/images/Genres/Series/Animation.png` },
    { name: "Horreur", image: `${process.env.PUBLIC_URL}/images/Genres/Series/Horreur.png` },
    { name: "Suspense", image: `${process.env.PUBLIC_URL}/images/Genres/Series/Suspense.png` },
    { name: "Jeunesse", image: `${process.env.PUBLIC_URL}/images/Genres/Series/Jeunesse.png` },
  ];

  // Scroll des genres
  const scrollGenres = (direction) => {

    const maxScroll = genres.length*(1/(genres.length/2));

    if (direction === 'left') {
      setCurrentGenreIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (direction === 'right') {
      setCurrentGenreIndex(prevIndex => Math.min(prevIndex + 1, maxScroll));
    }
  }

  {/*AFFICHAGE DE LA PAGE WEB*/}
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-yellow-600">
        <Header />
      </div>
      <div className="flex-grow bg-yellow-600">
        <section className="bg-yellow-600">
          <div className='mb-6'>
            <h1 className="text-white text-3xl font-semibold mx-12 mb-2 mt-8 ml-20">Series</h1>
            {/*LOGIQUE IMPLEMENTER POUR L'AFFICHAGE DE LA BANNIERE*/}
            <Slider />
          </div>
          {/*LOGIQUE IMPLEMENTER POUR L'AFFICHAGE DES GENRES*/}
          <div className="container mx-auto">
            <div>
              <div className="flex items-center mb-8">
                <FaArrowAltCircleLeft onClick={() => scrollGenres('left')} className="cursor-pointer text-white text-xl ml-8 hover:brightness-75" />
                <div className="overflow-hidden w-full mx-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${currentGenreIndex * moveWidth3}px)` }}>
                    {genres.map((genre, index) => (
                      <GenreBanner key={index} genre={genre} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollGenres('right')} className="cursor-pointer text-white text-xl mr-5 hover:brightness-75" />
              </div>
            </div>
          </div>
          <Affichage />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SeriesHomePage;