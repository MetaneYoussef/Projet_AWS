import React, { useState } from 'react';
import Header from '../../../components/Header/MovieHeader';
import Footer from '../../../components/Footer/Footer';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';


// Template pour de l'affichage des films en bannière
const MovieBanner = ({ movie }) => (
  <div className="inline-block cursor-pointer mr-4 mb-2 mt-3">
    <img src={movie.poster} alt={movie.title} className="rounded-lg shadow-lg w-[550px] h-[250px] object-cover" />
  </div>
);

// Template pour de l'affichage des genres
const GenreBanner = ({ genre }) => (
  <div className="inline-block cursor-pointer mr-4 mb-2 mt-3 bg-red-800 hover:bg-red-900 text-white">
    <img src={genre.image} alt={genre.name}className='rounded-lg shadow-lg w-[220px] h-[150px] object-cover border-2 border-white'/>
  </div>
);

// Composant pour afficher chaque film
const CategoryMovieCard = ({ movie }) => (
  <div className="inline-block cursor-pointer mr-4 mb-2 mt-3">
    <img src={movie.poster} alt={movie.title} className="rounded-lg shadow-lg w-[250px] h-[375px] object-cover" />
    <p className="text-white mt-2 text-center">{movie.title}</p>
  </div>
);

const ScrollButton = ({ direction, onClick }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer bg-black text-white text-sm font-extrabold opacity-50 hover:opacity-70 p-2 flex justify-center items-center ${
      direction === 'left' ? 'rounded-l-xs' : 'rounded-r-xs'
    }`}
    style={{ width: '35px', height: '40px' }}
  >
    {direction === 'left' ? '<' : '>'}
  </div>
);

const MovieHomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentGenreIndex, setCurrentGenreIndex] = useState(0);
  const [trendingIndex, setTrendingIndex] = useState(0);
  const moviesToShow = 2; // Nombre d'affiches à montrer à la fois

  const bannerWidth = 550; // Largeur de l'affiche
  const marginRight = 16; // Margin-right de chaque affiche
  const moveWidth = bannerWidth + marginRight; // Calcul de la distance de déplacement total par clic
  const moveWidth2 = 250 + 16; // Calcul de la distance de déplacement total par clic

  {/*BASE DE DONNEES FICTIVES POUR L'EXEMPLE*/}
  // Base de données des films
  const moviesscroll = [
    { title: "Dune : Part Two", poster: "https://quefairedesmomes.fr/wp-content/uploads/2023/12/dune-2.jpg" },
    { title: "Super Mario Bros. : Le Film", poster: "https://proxymedia.woopic.com/api/v1/images/331%2FSUPERMARIOBW0198474_BAN1_2424_NEWTV_UHD.jpg" },
    { title: "Spider-Man : Accross the Spider-Verse", poster: "https://www.murphysmultiverse.com/wp-content/uploads/2022/12/Across-the-Spider-Verse.jpg" },
    { title: "Barbie", poster: "https://images8.alphacoders.com/133/1331131.jpeg" },
    { title: "En Eaux Très Troubles", poster: "https://proxymedia.woopic.com/api/v1/images/331%2FENEAUXTRESTW0201687_BAN1_2424_NEWTV_UHD.jpg" },
    { title: "Oppenheimer", poster: "https://www.blibli.com/friends-backend/wp-content/uploads/2023/07/B700219-Cover-Sinopsis-Oppenheimer.jpg" },
    { title: "Demon Slayer : Le Film.", poster: "https://www.manga-news.com/public/2022/news_12/Demon_Slayer_village_des_forgerons_film_annonce.jpg" },
  ];

  // Base de données des genres
  const genres = [
    { name: "Tous Les Films", image: `${process.env.PUBLIC_URL}/images/Genres/TousLesFilms.png` },
    { name: "Classiques", image: `${process.env.PUBLIC_URL}/images/Genres/Classiques.png` },
    { name: "Action", image: `${process.env.PUBLIC_URL}/images/Genres/Action.png` },
    { name: "Comédie", image: `${process.env.PUBLIC_URL}/images/Genres/Comedie.png` },
    { name: "Science-Fiction", image: `${process.env.PUBLIC_URL}/images/Genres/S-FX.png` },
    { name: "Émotion", image: `${process.env.PUBLIC_URL}/images/Genres/Emotion.png` },
    { name: "Policier", image: `${process.env.PUBLIC_URL}/images/Genres/Policier.png` },
    { name: "Animation", image: `${process.env.PUBLIC_URL}/images/Genres/Animation.png` },
    { name: "Horreur", image: `${process.env.PUBLIC_URL}/images/Genres/Horreur.png` },
    { name: "Suspense", image: `${process.env.PUBLIC_URL}/images/Genres/Suspense.png` },
    { name: "Jeunesse", image: `${process.env.PUBLIC_URL}/images/Genres/Jeunesse.png` },
    // Plus de genres ici
  ];

  // Les films en Tendances
  const trendingMovies = [
    { title: "Dune : Part Two", poster: "https://quefairedesmomes.fr/wp-content/uploads/2023/12/dune-2.jpg" },
    { title: "Super Mario Bros. : Le Film", poster: "https://proxymedia.woopic.com/api/v1/images/331%2FSUPERMARIOBW0198474_BAN1_2424_NEWTV_UHD.jpg" },
    { title: "Spider-Man : Accross the Spider-Verse", poster: "https://www.murphysmultiverse.com/wp-content/uploads/2022/12/Across-the-Spider-Verse.jpg" },
    { title: "Barbie", poster: "https://images8.alphacoders.com/133/1331131.jpeg" },
    { title: "En Eaux Très Troubles", poster: "https://proxymedia.woopic.com/api/v1/images/331%2FENEAUXTRESTW0201687_BAN1_2424_NEWTV_UHD.jpg" },
    { title: "Oppenheimer", poster: "https://www.blibli.com/friends-backend/wp-content/uploads/2023/07/B700219-Cover-Sinopsis-Oppenheimer.jpg" },
    { title: "Demon Slayer : Le Film.", poster: "https://www.manga-news.com/public/2022/news_12/Demon_Slayer_village_des_forgerons_film_annonce.jpg" },
    { title: "Dune : Part Two", poster: "https://quefairedesmomes.fr/wp-content/uploads/2023/12/dune-2.jpg" },
    { title: "Super Mario Bros. : Le Film", poster: "https://proxymedia.woopic.com/api/v1/images/331%2FSUPERMARIOBW0198474_BAN1_2424_NEWTV_UHD.jpg" },
    { title: "Spider-Man : Accross the Spider-Verse", poster: "https://www.murphysmultiverse.com/wp-content/uploads/2022/12/Across-the-Spider-Verse.jpg" },
    { title: "Barbie", poster: "https://images8.alphacoders.com/133/1331131.jpeg" },
    { title: "En Eaux Très Troubles", poster: "https://proxymedia.woopic.com/api/v1/images/331%2FENEAUXTRESTW0201687_BAN1_2424_NEWTV_UHD.jpg" },
    { title: "Oppenheimer", poster: "https://www.blibli.com/friends-backend/wp-content/uploads/2023/07/B700219-Cover-Sinopsis-Oppenheimer.jpg" },
    { title: "Demon Slayer : Le Film.", poster: "https://www.manga-news.com/public/2022/news_12/Demon_Slayer_village_des_forgerons_film_annonce.jpg" },
  ]; 

  // Les films en Tendances
  const recentMovies = [];

  // Les films en Tendances
  const mostWatchedMovies = [];

  // Les films en Tendances
  const mostAddedMovies = [];

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
  // Scroll des genres
  const scrollGenres = (direction) => {

    if (direction === 'left') {
      setCurrentGenreIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (direction === 'right') {
      setCurrentGenreIndex(prevIndex => Math.min(prevIndex + 1, 1));
    }
  };

  // Fonction pour gérer le défilement des catégories
  const scrollCategory = (direction) => {
    const maxScrollCategory = trendingMovies.length - 5;

    if (direction === 'left') {
      setTrendingIndex((prevIndex) => Math.max(prevIndex - 5, 0));
    } else if (direction === 'right') {
      setTrendingIndex((prevIndex) => Math.min(prevIndex + 5, maxScrollCategory));
    }
  };

  {/*AFFICHAGE DE LA PAGE WEB*/}
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-red-700">
        <Header />
      </div>
      <div className="flex-grow bg-red-700">
        <section className="bg-red-700">
          <div className="container mx-auto py-6">
            <div className="ml-20">
              <h1 className="text-white text-3xl font-semibold mx-12 mb-8 mt-8">Films</h1>
              {/*LOGIQUE IMPLEMENTER POUR L'AFFICHAGE DE LA BANNIERE*/}
              <div className="flex items-center">
                  <FaArrowAltCircleLeft onClick={() => scrollMovies('left')} className="cursor-pointer text-white text-3xl" />
                  <div className="overflow-hidden w-full mx-5">
                    <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * moveWidth}px)` }}>
                      {moviesscroll.map((movie, index) => (
                        <MovieBanner key={index} movie={movie} />
                      ))}
                    </div>
                  </div>
                  <FaArrowAltCircleRight onClick={() => scrollMovies('right')} className="cursor-pointer text-white text-3xl" />
                </div>
            </div>
          </div>

          {/*LOGIQUE IMPLEMENTER POUR L'AFFICHAGE DES GENRES*/}
          <div className="container mx-auto">
            <div className="ml-20">
              <div className="flex items-center mb-8">
                <FaArrowAltCircleLeft onClick={() => scrollGenres('left')} className="cursor-pointer text-white text-xl" />
                <div className="overflow-hidden w-full mx-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${currentGenreIndex * 90}%)` }}>
                    {genres.map((genre, index) => (
                      <GenreBanner key={index} genre={genre} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollGenres('right')} className="cursor-pointer text-white text-xl" />
              </div>
            </div>
          </div>

          {/* Section "Les Tendances" */}
          <div className="relative mb-14">
            <h2 className="text-white text-2xl font-semibold mb-4 ml-28">Les Tendances</h2>
            <div className="flex items-center justify-between">
                <FaArrowAltCircleLeft onClick={() => scrollCategory('left')} className="absolute cursor-pointer text-black text-5xl left-0 z-10 ml-5 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                <div className="overflow-hidden w-full px-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${trendingIndex * moveWidth2}px)` }}>
                    {trendingMovies.map((movie, index) => (
                      <CategoryMovieCard key={index} movie={movie} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollCategory('right')} className="absolute cursor-pointer text-black text-5xl right-0 z-10 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Section "Les Tendances" */}
          <div className="relative mb-14">
            <h2 className="text-white text-2xl font-semibold mb-4 ml-28">Les Tendances</h2>
            <div className="flex items-center justify-between">
                <FaArrowAltCircleLeft onClick={() => scrollCategory('left')} className="absolute cursor-pointer text-black text-5xl left-0 z-10 ml-5 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                <div className="overflow-hidden w-full px-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${trendingIndex * moveWidth2}px)` }}>
                    {trendingMovies.map((movie, index) => (
                      <CategoryMovieCard key={index} movie={movie} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollCategory('right')} className="absolute cursor-pointer text-black text-5xl right-0 z-10 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Section "Les Tendances" */}
          <div className="relative mb-14">
            <h2 className="text-white text-2xl font-semibold mb-4 ml-28">Les Tendances</h2>
            <div className="flex items-center justify-between">
                <FaArrowAltCircleLeft onClick={() => scrollCategory('left')} className="absolute cursor-pointer text-black text-5xl left-0 z-10 ml-5 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                <div className="overflow-hidden w-full px-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${trendingIndex * moveWidth2}px)` }}>
                    {trendingMovies.map((movie, index) => (
                      <CategoryMovieCard key={index} movie={movie} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollCategory('right')} className="absolute cursor-pointer text-black text-5xl right-0 z-10 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Section "Les Tendances" */}
          <div className="relative mb-14">
            <h2 className="text-white text-2xl font-semibold mb-4 ml-28">Les Tendances</h2>
            <div className="flex items-center justify-between">
                <FaArrowAltCircleLeft onClick={() => scrollCategory('left')} className="absolute cursor-pointer text-black text-5xl left-0 z-10 ml-5 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                <div className="overflow-hidden w-full px-5">
                  <div className="whitespace-nowrap transition-transform duration-300" style={{ transform: `translateX(-${trendingIndex * moveWidth2}px)` }}>
                    {trendingMovies.map((movie, index) => (
                      <CategoryMovieCard key={index} movie={movie} />
                    ))}
                  </div>
                </div>
                <FaArrowAltCircleRight onClick={() => scrollCategory('right')} className="absolute cursor-pointer text-black text-5xl right-0 z-10 opacity-50 hover:opacity-70" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MovieHomePage;