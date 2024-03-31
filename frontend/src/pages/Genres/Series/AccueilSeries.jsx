import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../../../components/Header/SeriesHeader';
import Footer from '../../../components/Footer/Footer';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';


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

// Template pour de l'affichage des Series dans les catégories
const CategorySeriesCard = ({ Series }) => (
  <div className="inline-block cursor-pointer mr-4 mb-2 mt-3" style={{ maxWidth: '200px' }}>
    <img src={Series.poster} alt={Series.title} className="rounded-lg shadow-lg w-[200px] h-[325px] object-cover" />
    <p className="text-white mt-2 text-center break-words line-clamp-2 font-semibold" style={{ maxWidth: '200px' }}>{Series.title}</p>
  </div>
);


const SeriesHomePage = () => {
  // Index pour le défilement des catégories
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentGenreIndex, setCurrentGenreIndex] = useState(0);
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [recentIndex, setRecentIndex] = useState(0);
  const [watchedIndex, setWatchedIndex] = useState(0);
  const [addedIndex, setAddedIndex] = useState(0);

  // Constantes pour la taille des affiches (nécessaires aux défilemens des catégories)
  const SeriessToShow = 2; // Nombre d'affiches à montrer à la fois
  const bannerWidth = 650; // Largeur de l'affiche
  const marginRight = 16; // Margin-right de chaque affiche
  const moveWidth = bannerWidth + marginRight; // Calcul de la distance de déplacement total par clic
  const moveWidth2 = 200 + 16; // Calcul de la distance de déplacement total par clic
  const moveWidth3 = 5*(220 + 16); // Calcul de la distance de déplacement total par clic (CATEGORIE)

  {/*BASE DE DONNEES FICTIVES POUR L'EXEMPLE*/}
  // Base de données des Series
  const Seriesscroll = [
    { title: "SnowFall", poster: "https://lubieenserie.fr/wp-content/uploads/2017/11/snowfall-avis-srie.jpg" },
    { title: "Solo Leveling", poster: "https://images6.alphacoders.com/132/1320541.png" },
    { title: "Shogun", poster: "https://tv-fanatic-res.cloudinary.com/iu/s--rDpVwGrk--/f_auto,q_auto/v1707763870/shogun-poster" },
    { title: "YOU.", poster: "https://trendy.letudiant.fr/wp-content/uploads/trendy/2023/02/1673430273043_widget_netflix_you_s4_png-729x410.jpeg" },
    { title: "Lupin", poster: "https://bocir-prod-bucket.s3.amazonaws.com/medias/Vsj0LZpM34/image/AAAABQhFFW_tbpg3RISB2IOFXruk5DQxejckJecw5HZycFnZodxl67TekY2mcBdZv8zTlLpiZE1LvILSAQAVRD9jRvjz5Fft3BcSRMah_BtkiDPj_pKvEL_uoW7U0aEJEeotY3JELw1696596437779.jpg" },
    { title: "Power", poster: "https://m.media-amazon.com/images/S/pv-target-images/3917978093e5d3b7835b7c3de422748814f4ef364efa1a1b7b0998a872d1ae85.jpg" },
    { title: "Vikings", poster: "https://media.distractify.com/brand-img/xjOFShg0-/0x0/vikings-season-6-promo-2-1622915370289.jpg" },
    { title: "Peaky Blinders", poster: "https://m.media-amazon.com/images/I/71mXmB41psS._AC_UF894,1000_QL80_.jpg" },
    { title: "Game Of Thrones", poster: "https://wallpapers.com/images/hd/ned-stark-of-game-of-thrones-yny5e9tb3tvw8r3m.jpg" },
    { title: "Top Boy", poster: "https://tvseriesfinale.com/wp-content/uploads/2022/07/AAAABW5YUQjmJLiA4ex-tAX5aGI8IvNl.jpg" },
  ];

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

  // Les series en Tendances
  const trendingSeriess = [
    { title: "Dune : Deuxieme Partie", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F290272%2Fposters%2F65ede951e6a8d.jpg&w=256&q=75" },
    { title: "Lala Land", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F139%2Fposters%2F637096fb47a60.jpg&w=256&q=75" },
    { title: "Wonka", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F95846%2Fposters%2F65413559d33c6.jpg&w=256&q=75" },
    { title: "Argylle", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F201128%2Fposters%2F657b05825690c.jpg&w=256&q=75" },
    { title: "Tout sauf toi", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F350029%2Fposters%2F65626bc121c15.jpg&w=256&q=75" },
    { title: "Irish Wish", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F345244%2Fposters%2F65d127c49c91e.jpg&w=256&q=75" },
    { title: "Kung Fu Panda 4", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F339249%2Fposters%2F657c591bc45d2.jpg&w=256&q=75" },
    { title: "Young Royals Forever", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F354720%2Fposters%2F65ef716807dd3.jpg&w=256&q=75" },
    { title: "La Demoiselle et le dragon", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F343452%2Fposters%2F654ffba6d7afe.jpg&w=256&q=75" },
    { title: "The Beachnickers 2", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F347084%2Fposters%2F65ea1ff282fb0.jpg&w=256&q=75" },
    { title: "Le Cercle des neiges", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F349161%2Fposters%2F657766deedfb7.jpg&w=256&q=75" },
    { title: "Spaceman", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F159539%2Fposters%2F6584fab26f25a.jpg&w=256&q=75" },
    { title: "Le Coeur au vol", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F354100%2Fposters%2F65f45b6ddc581.jpg&w=256&q=75" },
    { title: "Ricky Stanicky", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F352452%2Fposters%2F65b53ccf06063.jpg&w=256&q=75" },
  ]; 

  // Les series en Tendances
  const recentSeriess = [
    { title: "Harry Potter et la chambre des secrets", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F63%2Fposters%2F5ef25ed160dbc_t.jpg&w=384&q=75" },
    { title: "Titanic", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F231%2Fposters%2F642d748b22859_t.jpg&w=384&q=75" },
    { title: "Harry Potter et le Prisonnier d'Azkaban", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F154%2Fposters%2F65a8ffe8a3d1e_t.jpg&w=384&q=75" },
    { title: "Avengers : Endgame", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F148%2Fposters%2F5f00f27f737d4_t.jpg&w=384&q=75" },
    { title: "La Reine des neiges", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F89%2Fposters%2F65328dcb6b620_t.jpg&w=384&q=75" },
    { title: "Deadpool", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F115%2Fposters%2F62092205_t.jpg&w=384&q=75" },
    { title: "Le Roi Lion", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F5024%2Fposters%2F64c7f1837bf6e_t.jpg&w=384&q=75" },
    { title: "Black Panther", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F48%2Fposters%2F62042594_t.jpg&w=384&q=75" },
    { title: "Spider-Man : Homecoming", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F68%2Fposters%2F62042575_t.jpg&w=384&q=75" },
    { title: "Shrek", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F325%2Fposters%2F5f35604d9bfa7_t.jpg&w=384&q=75" },
    { title: "Captain Marvel", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F10%2Fposters%2F65fa10ec410d2_t.jpg&w=384&q=75" },
    { title: "Avatar", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F165%2Fposters%2F64d4c92685cf7_t.jpg&w=384&q=75" },
    { title: "Ratatouille", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F534%2Fposters%2F2195292_t.jpg&w=384&q=75" },
    { title: "Les Gardiens de la Galaxie", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F26%2Fposters%2F5e9cafc74b5a1_t.jpg&w=384&q=75" },
  ];

  // Les series les plus regardés
  const mostWatchedSeriess = [
    { title: "Dune : Deuxieme Partie", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F290272%2Fposters%2F65ede951e6a8d.jpg&w=256&q=75" },
    { title: "Lala Land", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F139%2Fposters%2F637096fb47a60.jpg&w=256&q=75" },
    { title: "Wonka", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F95846%2Fposters%2F65413559d33c6.jpg&w=256&q=75" },
    { title: "Argylle", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F201128%2Fposters%2F657b05825690c.jpg&w=256&q=75" },
    { title: "Tout sauf toi", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F350029%2Fposters%2F65626bc121c15.jpg&w=256&q=75" },
    { title: "Irish Wish", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F345244%2Fposters%2F65d127c49c91e.jpg&w=256&q=75" },
    { title: "Kung Fu Panda 4", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F339249%2Fposters%2F657c591bc45d2.jpg&w=256&q=75" },
    { title: "Young Royals Forever", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F354720%2Fposters%2F65ef716807dd3.jpg&w=256&q=75" },
    { title: "La Demoiselle et le dragon", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F343452%2Fposters%2F654ffba6d7afe.jpg&w=256&q=75" },
    { title: "The Beachnickers 2", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F347084%2Fposters%2F65ea1ff282fb0.jpg&w=256&q=75" },
    { title: "Le Cercle des neiges", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F349161%2Fposters%2F657766deedfb7.jpg&w=256&q=75" },
    { title: "Spaceman", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F159539%2Fposters%2F6584fab26f25a.jpg&w=256&q=75" },
    { title: "Le Coeur au vol", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F354100%2Fposters%2F65f45b6ddc581.jpg&w=256&q=75" },
    { title: "Ricky Stanicky", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F352452%2Fposters%2F65b53ccf06063.jpg&w=256&q=75" },
  ];

  // Les series les plus ajoutés
  const mostAddedSeriess = [
    { title: "Harry Potter et la chambre des secrets", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F63%2Fposters%2F5ef25ed160dbc_t.jpg&w=384&q=75" },
    { title: "Titanic", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F231%2Fposters%2F642d748b22859_t.jpg&w=384&q=75" },
    { title: "Harry Potter et le Prisonnier d'Azkaban", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F154%2Fposters%2F65a8ffe8a3d1e_t.jpg&w=384&q=75" },
    { title: "Avengers : Endgame", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F148%2Fposters%2F5f00f27f737d4_t.jpg&w=384&q=75" },
    { title: "La Reine des neiges", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F89%2Fposters%2F65328dcb6b620_t.jpg&w=384&q=75" },
    { title: "Deadpool", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F115%2Fposters%2F62092205_t.jpg&w=384&q=75" },
    { title: "Le Roi Lion", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F5024%2Fposters%2F64c7f1837bf6e_t.jpg&w=384&q=75" },
    { title: "Black Panther", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F48%2Fposters%2F62042594_t.jpg&w=384&q=75" },
    { title: "Spider-Man : Homecoming", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F68%2Fposters%2F62042575_t.jpg&w=384&q=75" },
    { title: "Shrek", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F325%2Fposters%2F5f35604d9bfa7_t.jpg&w=384&q=75" },
    { title: "Captain Marvel", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F10%2Fposters%2F65fa10ec410d2_t.jpg&w=384&q=75" },
    { title: "Avatar", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fv4%2Fmovie%2F165%2Fposters%2F64d4c92685cf7_t.jpg&w=384&q=75" },
    { title: "Ratatouille", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F534%2Fposters%2F2195292_t.jpg&w=384&q=75" },
    { title: "Les Gardiens de la Galaxie", poster: "https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fmovies%2F26%2Fposters%2F5e9cafc74b5a1_t.jpg&w=384&q=75" },
  ];

  {/*LOGIQUE DU DEFILEMENT*/}
  // Scroll des Series en bannière
  const scrollSeriess = (direction) => {
    // Nombre total d'affiches qui peuvent être déplacées en tenant compte des affiches visibles à l'écran
    const maxScrollableSeriess = Seriesscroll.length - (SeriessToShow);
  
    if (direction === 'left') {
      setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (direction === 'right') {
      setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxScrollableSeriess));
    }
  };
  
  // Scroll des genres
  const scrollGenres = (direction) => {

    const maxScroll = genres.length*(1/(genres.length/2));

    if (direction === 'left') {
      setCurrentGenreIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (direction === 'right') {
      setCurrentGenreIndex(prevIndex => Math.min(prevIndex + 1, maxScroll));
    }
  }

  // Fonction pour gérer le défilement des différentes catégories
  const scrollCategory = (category, direction) => {
    const maxScroll = trendingSeriess.length - 6; // Assume toutes les catégories ont la même longueur

    if (direction === 'left') {
      if (category === 'trending') {
        setTrendingIndex(prevIndex => Math.max(prevIndex - 6, 0));
      } else if (category === 'recent') {
        setRecentIndex(prevIndex => Math.max(prevIndex - 6, 0));
      } else if (category === 'watched') {
        setWatchedIndex(prevIndex => Math.max(prevIndex - 6, 0));
      } else if (category === 'added') {
        setAddedIndex(prevIndex => Math.max(prevIndex - 6, 0));
      }
    } else if (direction === 'right') {
      if (category === 'trending') {
        setTrendingIndex(prevIndex => Math.min(prevIndex + 6, maxScroll));
      } else if (category === 'recent') {
        setRecentIndex(prevIndex => Math.min(prevIndex + 6, maxScroll));
      } else if (category === 'watched') {
        setWatchedIndex(prevIndex => Math.min(prevIndex + 6, maxScroll));
      } else if (category === 'added') {
        setAddedIndex(prevIndex => Math.min(prevIndex + 6, maxScroll));
      }
    }
  };


  {/*AFFICHAGE DE LA PAGE WEB*/}
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-yellow-600">
        <Header />
      </div>
      <div className="flex-grow bg-yellow-600">
        <section className="bg-yellow-600">
          <div className="container mx-auto py-6">
            <div>
              <h1 className="text-white text-3xl font-semibold mx-12 mb-8 mt-8 ml-20">Series</h1>
              {/*LOGIQUE IMPLEMENTER POUR L'AFFICHAGE DE LA BANNIERE*/}
              <div className="flex items-center">
                  <FaArrowAltCircleLeft onClick={() => scrollSeriess('left')} className="cursor-pointer text-white text-3xl ml-5 hover:brightness-75" />
                  <div className="overflow-hidden w-full mx-5">
                    <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * moveWidth}px)` }}>
                      {Seriesscroll.map((Series, index) => (
                        <SeriesBanner key={index} Series={Series} />
                      ))}
                    </div>
                  </div>
                  <FaArrowAltCircleRight onClick={() => scrollSeriess('right')} className="cursor-pointer text-white text-3xl mr-5 hover:brightness-75" />
                </div>
            </div>
          </div>

          {/*LOGIQUE IMPLEMENTER POUR L'AFFICHAGE DES GENRES*/}
          <div className="constainer mx-auto">
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

          {/* Section "Les Tendances" */}
          <div className="relative mb-14">
            <h2 className="text-white text-2xl font-bold mb-4 ml-20 mt-4">Les Tendances</h2>
            <div className="flex items-center justify-between">
                <FaArrowAltCircleLeft onClick={() => scrollCategory('trending','left')} className="absolute cursor-pointer text-black text-5xl left-0 z-10 ml-2 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                <div className="overflow-hidden w-full px-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${trendingIndex * moveWidth2}px)` }}>
                    {trendingSeriess.map((Series, index) => (
                      <CategorySeriesCard key={index} Series={Series} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollCategory('trending','right')} className="absolute cursor-pointer text-black text-5xl right-0 z-10 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Section "Les Dernières Sorties" */}
          <div className="relative mb-14">
            <h2 className="text-white text-2xl font-bold mb-4 ml-20">Les Dernières Sorties</h2>
            <div className="flex items-center justify-between">
                <FaArrowAltCircleLeft onClick={() => scrollCategory('recent','left')} className="absolute cursor-pointer text-black text-5xl left-0 z-10 ml-2 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                <div className="overflow-hidden w-full px-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${recentIndex * moveWidth2}px)` }}>
                    {recentSeriess.map((Series, index) => (
                      <CategorySeriesCard key={index} Series={Series} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollCategory('recent','right')} className="absolute cursor-pointer text-black text-5xl right-0 z-10 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Section "Les Plus Regardés" */}
          <div className="relative mb-14">
            <h2 className="text-white text-2xl font-bold mb-4 ml-20 mt-2">Les Plus Regardés</h2>
            <div className="flex items-center justify-between">
                <FaArrowAltCircleLeft onClick={() => scrollCategory('watched','left')} className="absolute cursor-pointer text-black text-5xl left-0 z-10 ml-2 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                <div className="overflow-hidden w-full px-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${watchedIndex * moveWidth2}px)` }}>
                    {mostWatchedSeriess.map((Series, index) => (
                      <CategorySeriesCard key={index} Series={Series} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollCategory('watched','right')} className="absolute cursor-pointer text-black text-5xl right-0 z-10 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Section "Les Plus Ajoutés" */}
          <div className="relative mb-14">
            <h2 className="text-white text-2xl font-bold mb-4 ml-20">Les Plus Ajoutés</h2>
            <div className="flex items-center justify-between">
                <FaArrowAltCircleLeft onClick={() => scrollCategory('added','left')} className="absolute cursor-pointer text-black text-5xl left-0 z-10 ml-2 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                <div className="overflow-hidden w-full px-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${addedIndex * moveWidth2}px)` }}>
                    {mostAddedSeriess.map((Series, index) => (
                      <CategorySeriesCard key={index} Series={Series} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollCategory('added','right')} className="absolute cursor-pointer text-black text-5xl right-0 z-10 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SeriesHomePage;