import React from 'react';
import Header from '../../components/Header/MovieDetailHeader';
import Footer from '../../components/Footer/Footer';
import CustomScrollBar from '../../utiles/CustomScrollBar.css';

const Evenement = () => {
  const movie = {
    title: "Dune 2",
    poster: "https://i.ebayimg.com/images/g/3PQAAOSwGtRlzmu5/s-l1200.jpg",
    background: "https://fr.web.img4.acsta.net/pictures/24/01/26/10/18/5392835.jpg",
    rating: "8.2 ★★★★☆",
    genres: ["ACTION", "AVENTURE", "SCIENCE-FICTION"],
    synopsis: "Dans DUNE : DEUXIÈME PARTIE, Paul Atreides s’unit à Chani et aux Fremen pour mener la révolte contre ceux qui ont anéanti sa famille. Hanté par de sombres prémonitions, il se trouve confronté au plus grand des dilemmes : choisir entre l’amour de sa vie et le destin de l'univers.",
    watchlistCount: 14.602,
    commentCount: 217,

    cast: [
      {
        name: "Timothée Chalamet",
        character: "Paul Atreides",
        photo: "https://fr.web.img6.acsta.net/c_310_420/pictures/23/12/12/10/42/2152936.jpg", // Exemple d'URL, veuillez utiliser une URL valide
      },
      {
        name: "Zendaya",
        character: "Chani",
        photo: "https://assets.teenvogue.com/photos/659707ea9ac16dac4e4b4792/1:1/w_2556,h_2556,c_limit/GettyImages-1713365174.jpg", // Exemple d'URL, veuillez utiliser une URL valide
      },
      {
        name: "Rebecca Ferguson",
        character: "Lady Jessica",
        photo: "https://image.tmdb.org/t/p/w500/lJloTOheuQSirSLXNA3JHsrMNfH.jpg", // Exemple d'URL, veuillez utiliser une URL valide
      },
      {
        name: "Oscar Isaac",
        character: "Duke Leto Atreides",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Oscar_Isaac_by_Gage_Skidmore.jpg/719px-Oscar_Isaac_by_Gage_Skidmore.jpg"      },
      {
        name: "Josh Brolin",
        character: "Gurney Halleck",
        photo: "https://m.media-amazon.com/images/M/MV5BMTY1ODkwMjQxM15BMl5BanBnXkFtZTcwNzQxMDgyMg@@._V1_.jpg",
      },
      {
        name: "Jason Momoa",
        character: "Duncan Idaho",
        photo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Jason_Momoa_%2843055621224%29_%28cropped%29.jpg",
      },
      {
        name: "Stellan Skarsgård",
        character: "Baron Vladimir Harkonnen",
        photo: "https://m.media-amazon.com/images/M/MV5BMjEyMTk5OTk2OV5BMl5BanBnXkFtZTcwNjY3MjUxNw@@._V1_.jpg",
      },
      {
        name: "Dave Bautista",
        character: "Glossu Rabban",
        photo: "https://www.indiewire.com/wp-content/uploads/2021/08/dave-bautista.png",
      },
    ]
  };

  const comments = [
    {
      user: "FanDeDune",
      text: "Incroyable suite, les paysages sont à couper le souffle et le jeu d'acteur est top niveau !"
    },
    {
      user: "Cinephile75",
      text: "Un peu lent au démarrage mais une fois lancé, c'est un vrai chef-d'oeuvre."
    },
  ];
  

  return (
    <div>
      <div style={{ backgroundImage: `url(${movie.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Header />
        <div className="flex flex-col md:flex-row p-8 bg-black bg-opacity-70 text-white rounded-xl m-5 items-center md:items-start">
          <div className="md:w-1/4 flex flex-col items-center md:items-start">
            <img src={movie.poster} alt="Poster du film" className="w-64 h-96 rounded-lg shadow-lg mb-5"/>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0">Lancer la Bande Annonce</button>
          </div>
          <div className="md:ml-4 md:w-2/3">
            <div className="flex flex-col md:ml-4">
              <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
              <p className="mb-2">{movie.rating}</p>
              <p className="mb-2 text-xs">{movie.genres.join(", ")}</p>
              <br />
              <p className="mb-4 font-bold">SYNOPSIS :</p>
              <p className='w-3/4'>{movie.synopsis}</p>
            </div>
          </div>
          <div className="md:w-1/4 flex flex-col items-center md:items-start md:ml-8 mx-10 px-4">
            <div className="bg-black p-4 rounded-lg mb-4 text-center w-full">
              <p className='font-bold text-2xl antialiased'>{movie.watchlistCount}</p>
              <p>ont ajouté ce film à leur Watchlist</p>
            </div>
            <div className="bg-black p-4 rounded-lg mb-4 text-center w-full">
              <p className='font-bold text-2xl antialiased'>{movie.commentCount}</p>
              <p>commentaires</p>
            </div>
            <button className="bg-black hover:bg-red-900 hover:text-white text-red-600 border-2 border-red-400 font-bold py-2 px-4 rounded mb-4 w-full">+ Ajouter à la Watchlist</button>
            <button className="bg-black hover:bg-red-900 hover:text-white text-red-600 border-2 border-red-400 font-bold py-2 px-4 rounded w-full">Noter le film</button>
          </div>
        </div>
        <br />
      </div>

      <div className='bg-red-700 p-16'>
        <h1 className='text-white text-3xl mb-8 font-semibold'>Distribution</h1>
        {/* Exemple d'une liste horizontale pour la distribution (Utiliser Tailwind CSS pour le style) */}
        <div className="flex overflow-x-auto">
          {movie.cast?.map((actor, index) => (
            <div key={index} className="flex flex-col items-center mr-4" style={{ minWidth: '200px' }}> {/* Ajustement ici */}
              <img src={actor.photo} alt={actor.name} className="w-48 h-48 rounded-full object-cover"/>
              <p className="text-white mt-2 font-extrabold text-lg text-center">{actor.name}</p> {/* Centrez le texte ici */}
              <p className="text-white text-center font-semibold text-sm">{actor.character}</p> {/* Centrez le texte ici */}
            </div>
          ))}
        </div>
      </div>


      <div className='bg-red-700 p-16'>
        <h1 className='text-white text-3xl mb-4 font-semibold'>Les utilisateurs ont également regardé</h1>
        <div className="flex overflow-x-auto">
          {/* Supposons que vous avez un tableau 'similarMovies' dans 'movie' */}
          {movie.similarMovies?.map((movie, index) => (
            <div key={index} className="flex flex-col items-center mr-4">
              <img src={movie.poster} alt={movie.title} className="w-40 h-60 rounded-lg shadow-lg"/>
              <p className="text-white mt-2">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-red-700 p-16">
        <h1 className='text-white text-3xl mb-4 font-semibold'>Commentaires</h1>
        <div className="mb-8">
          <textarea
            className="w-full bg-red-900 text-white p-4 rounded-lg border-2 border-red-400"
            placeholder="Ajoutez votre commentaire..."
            rows="3"
          ></textarea>
          <button className="bg-black text-white hover:bg-white hover:text-red-700  font-bold py-2 px-4 rounded mt-4">Publier</button>
        </div>
        {comments.map((comment, index) => (
          <div key={index} className="bg-red-900 p-4 rounded-lg mb-4 border-2 border-black">
            <p className="text-red-200 font-bold mb-1">{comment.user}</p>
            <p className="text-white">{comment.text}</p>
          </div>
        ))}
        <button className="w-full bg-black text-white hover:bg-white hover:text-red-700 font-bold py-2 px-4 rounded">Voir tous les commentaires</button>
      </div>
      <Footer/>
    </div>
  );
}

export default Evenement;