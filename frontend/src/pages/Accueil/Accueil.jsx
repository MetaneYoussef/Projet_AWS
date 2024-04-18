import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../../styles.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import Bienvenue from './Bienvenue';
import Slider from './Slider';
import Categories from './Categories';

// Template pour de l'affichage des films en bannière
const MovieBanner = ({ movie }) => {
  // Création de l'URL de manière dynamique basée sur le titre du film
  const movieDetailUrl = `/films/detail/${movie.title.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')  // Remplace tout ce qui n'est pas alphanumérique par un tiret
    .replace(/-+/g, '-')}`;      // Remplace les séquences de tirets par un seul tiret

  return (
    <div className="inline-block cursor-pointer mr-4 mb-2">
      <Link to={movieDetailUrl}>
        <img src={movie.poster} alt={movie.title} className="rounded-lg shadow-lg w-full lg:w-[800px] lg:h-[400px] object-cover" />
      </Link>
    </div>
  );
};


// Pour chaque genre, utilisez Link pour naviguer
const GenreBanner = ({ genre }) => (
  <Link to={`/${genre.name}`} className="inline-block cursor-pointer mr-4 mb-2 mt-3 rounded-xl bg-gray-800 hover:bg-white text-white relative">
    <img src={genre.image} alt={genre.name} className=' brightness-50 rounded-lg shadow-lg w-[220px] h-[150px] object-cover border-2 border-white hover:brightness-75'/>
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-white text-2xl">{genre.name}</p>
    </div>
  </Link>
);

// Template pour de l'affichage des films dans les catégories
const CategoryMovieCard = ({ movie }) => (
  <div className="inline-block cursor-pointer mr-4 mb-2 mt-3" style={{ maxWidth: '200px' }}>
    <img src={movie.poster} alt={movie.title} className="rounded-lg shadow-lg w-[200px] h-[325px] object-cover" />
    <p className="text-white mt-2 text-center break-words line-clamp-2 font-semibold" style={{ maxWidth: '200px' }}>{movie.title}</p>
  </div>
);

function Accueil() {
  const moviesscroll = [
    { title: "Dune : Part Two", poster: "https://dunenewsnet.com/wp-content/uploads/2024/01/Dune-Part-Two-Movie-Posters-final-feature-816x459.jpg" },
    { title: "Spider-Man : Accross the Spider-Verse", poster: "https://www.murphysmultiverse.com/wp-content/uploads/2022/12/Across-the-Spider-Verse.jpg" },
    { title: "Super Mario Bros. : Le Film", poster: "https://proxymedia.woopic.com/api/v1/images/331%2FSUPERMARIOBW0198474_BAN1_2424_NEWTV_UHD.jpg" },
    { title: "Barbie", poster: "https://images8.alphacoders.com/133/1331131.jpeg" },
    { title: "En Eaux Très Troubles", poster: "https://proxymedia.woopic.com/api/v1/images/331%2FENEAUXTRESTW0201687_BAN1_2424_NEWTV_UHD.jpg" },
    { title: "Oppenheimer", poster: "https://www.blibli.com/friends-backend/wp-content/uploads/2023/07/B700219-Cover-Sinopsis-Oppenheimer.jpg" },
    { title: "Demon Slayer : Le Film.", poster: "https://www.manga-news.com/public/2022/news_12/Demon_Slayer_village_des_forgerons_film_annonce.jpg" },
  ];

  // Base de données des genres
  const genres = [
    { name: "Tous les films", image:"https://www.borneonews.co.id/images/upload/2021/07/31/1627691695-20191226-alexander-arnold-liverpool.jpg" },
    { name: "Classiques", image:  "https://www.oncuisine.fr/images/recettes/sauce-big-mac.gif"},
    { name: "Action", image: "https://images-3.rakuten.tv/storage/snapshot/shot/1d6c33e4-e71f-4338-94f9-88b86900a911-snapshot-1590662744-width936-quality90.jpeg" },
    { name: "Comédie", image: "https://www.programme-tv.net/imgre/fit/~1~tel~2023~08~02~509b09f4-c91d-426f-a656-68f52680f232.jpeg/1200x600/crop-from/top/quality/80/case-depart-ces-scenes-inspirees-de-l-epoque-coloniale-particulierement-difficiles-a-jouer-pour-thomas-ngijol-et-fabrice-eboue.jpg" },
    { name: "Science-Fiction", image: "https://leclaireur.fnac.com/wp-content/uploads/2023/12/iron-man.jpg" },
    { name: "Émotion", image: "https://centredelattentionsuisse.ch/wp-content/uploads/2017/02/Emotions-vice-versa.jpg" },
    { name: "Policier", image: "https://i.f1g.fr/media/cms/orig/2020/09/02/04a003d94a549d900c75d6b7d325279771f3a020944d55bdf29b2cbae95e27a8.jpeg" },
    { name: "Animation", image: "https://images.rtl.fr/~c/1200v800/rtl/www/1245070-muphasa-et-simba-dans-le-roi-lion.jpg" },
    { name: "Horreur", image: "https://www.micromania.fr/on/demandware.static/-/Sites-Micromania-Library/default/dw924fcce3/fanzone/dossier/ca/ca-clown.jpg" },
    { name: "Suspense", image: "https://media.vanityfair.fr/photos/6127abf261d8f6d5e24e60dd/16:9/w_2560%2Cc_limit/Netflix%2520:%2520courtesy%2520Everett%2520Collection4.jpg" },
    { name: "Jeunesse", image: "https://static.bandainamcoent.eu/high/paw-patrol/paw-patrol-world/00-page-setup/PPW-mobile-header.jpg" },
  ];

  // Les films en Tendances
  const trendingMovies = [
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

  // Les films en Tendances
  const recentMovies = [
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

  // Les films les plus regardés
  const mostWatchedMovies = [
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

  // Les films les plus ajoutés
  const mostAddedMovies = [
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
  
  // Index pour le défilement des catégories
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [recentIndex, setRecentIndex] = useState(0);
  const [watchedIndex, setWatchedIndex] = useState(0);
  const [addedIndex, setAddedIndex] = useState(0);

  // Constantes pour la taille des affiches (nécessaires aux défilemens des catégories)
  const moviesToShow = 1; // Nombre d'affiches à montrer à la fois
  const bannerWidth = 800; // Largeur de l'affiche
  const marginRight = 16; // Margin-right de chaque affiche
  const moveWidth = bannerWidth + marginRight; // Calcul de la distance de déplacement total par clic (BANNIERE)
  const moveWidth2 = 200 + 16; // Calcul de la distance de déplacement total par clic (CATEGORIE)

  {/*LOGIQUE DU DEFILEMENT*/}
  // Scroll des films en bannière
  const scrollMovies = (direction) => {
    // Nombre total d'affiches qui peuvent être déplacées en tenant compte des affiches visibles à l'écran
    const maxScrollableMovies = moviesscroll.length - (moviesToShow);
  
    if (direction === 'left') {
      setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (direction === 'right') {
      setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxScrollableMovies));
    }
  };
  
  // Fonction pour gérer le défilement des différentes catégories
  const scrollCategory = (category, direction) => {
    const maxScroll = trendingMovies.length - 6; // Assume toutes les catégories ont la même longueur

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

    return (
      <div className="flex flex-col min-h-screen">
      <div>
        <Header />
        <Bienvenue />
      </div>
      <div className="bg-gradient-to-b from-black to-indigo-950 border-t-2 border-gray-600">         
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-0 mt-4 ml-6 sm:ml-16">Nouveautés</h1>
        <Slider />
      </div>
      <div className="flex-grow bg-gradient-to-b from-indigo-950 to-blue-800">
        <section className="bg-gradient-to-b from-indigo-950 to-blue-800 mt-6">          
          {/* Section "Les Tendances" */}
          <div className="relative mb-14">
            <h2 className="text-white text-2xl font-bold mb-4 ml-6 sm:ml-20 mt-4">Séries Tendances</h2>
            <div className="flex items-center justify-between">
                <FaArrowAltCircleLeft onClick={() => scrollCategory('trending','left')} className="absolute cursor-pointer text-black text-5xl left-0 z-10 ml-2 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                <div className="overflow-hidden w-full px-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${trendingIndex * moveWidth2}px)` }}>
                    {trendingMovies.map((movie, index) => (
                      <CategoryMovieCard key={index} movie={movie} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollCategory('trending','right')} className="absolute cursor-pointer text-black text-5xl right-0 z-10 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Section "Les Dernières Sorties" */}
          <div className="relative mb-14">
            <h2 className="text-white text-2xl font-bold mb-4 ml-6 sm:ml-20">Films tendances</h2>
            <div className="flex items-center justify-between">
                <FaArrowAltCircleLeft onClick={() => scrollCategory('recent','left')} className="absolute cursor-pointer text-black text-5xl left-0 z-10 ml-2 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                <div className="overflow-hidden w-full px-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${recentIndex * moveWidth2}px)` }}>
                    {recentMovies.map((movie, index) => (
                      <CategoryMovieCard key={index} movie={movie} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollCategory('recent','right')} className="absolute cursor-pointer text-black text-5xl right-0 z-10 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Section "Les Plus Regardés" */}
          <div className="relative mb-14">
            <h2 className="text-white text-2xl font-bold mb-4 ml-6 sm:ml-20 mt-2">Séries Les Plus Regardés</h2>
            <div className="flex items-center justify-between">
                <FaArrowAltCircleLeft onClick={() => scrollCategory('watched','left')} className="absolute cursor-pointer text-black text-5xl left-0 z-10 ml-2 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                <div className="overflow-hidden w-full px-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${watchedIndex * moveWidth2}px)` }}>
                    {mostWatchedMovies.map((movie, index) => (
                      <CategoryMovieCard key={index} movie={movie} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollCategory('watched','right')} className="absolute cursor-pointer text-black text-5xl right-0 z-10 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Section "Les Plus Ajoutés" */}
          <div className="relative mb-14">
            <h2 className="text-white text-2xl font-bold mb-4 ml-6 sm:ml-20">Séries les Plus Ajoutés</h2>
            <div className="flex items-center justify-between">
                <FaArrowAltCircleLeft onClick={() => scrollCategory('added','left')} className="absolute cursor-pointer text-black text-5xl left-0 z-10 ml-2 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                <div className="overflow-hidden w-full px-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${addedIndex * moveWidth2}px)` }}>
                    {mostAddedMovies.map((movie, index) => (
                      <CategoryMovieCard key={index} movie={movie} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollCategory('added','right')} className="absolute cursor-pointer text-black text-5xl right-0 z-10 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-500 border-t-2">
        <div className="text-white text-4xl font-bold mt-10 mb-4 ml-6 sm:ml-20"> Parcourir par genre
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10 mb-8 text-center justify-center">
            {genres.map((genre, index) => (
            <GenreBanner key={index} genre={genre} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
  export default Accueil;