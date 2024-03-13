const films = {
  aLaUne: [
    {
      id: 1,
      title: "Inception",
      imageUrl: "https://i.ebayimg.com/images/g/4ssAAOSwvoZeQvPh/s-l1600.jpg",
      synopsis: "Un voleur, qui s'infiltre dans les rêves des autres, reçoit la tâche de planter une idée dans l'esprit d'un homme d'affaires.",
      rating: "★★★★☆",
      releaseDate: "2010",
    },
    {
      id: 2,
      title: "Avatar",
      imageUrl: "https://images.affiches-et-posters.com//albums/3/47832/medium/poster-film-avatar.jpg",
      synopsis: "Un soldat paraplégique est envoyé sur la planète Pandora, où il forme une connexion inattendue avec les habitants locaux, les Na'vi.",
      rating: "★★★★★",
      releaseDate: "2009",
    },
    // Plus de films "À la une"
  ],
  Watchlist: [
    {
      id: 3,
      title: "One Piece",
      imageUrl: "https://fr.web.img3.acsta.net/c_310_420/pictures/19/08/09/14/53/1842996.jpg",
      synopsis: "Luffy et son équipage naviguent à travers les océans à la recherche du trésor ultime, le One Piece, pour devenir le prochain Roi des Pirates.",
      rating: "★★★★☆",
      releaseDate: "1999", // Date du début de l'animation
    },
    {
      id: 4,
      title: "Breaking Bad",
      imageUrl: "https://images.affiches-et-posters.com//albums/3/5539/medium/affiche-serie-breaking-bad-3509.jpg",
      synopsis: "Un professeur de chimie devenu fabricant de méthamphétamine pour sécuriser l'avenir financier de sa famille après avoir été diagnostiqué avec un cancer.",
      rating: "★★★★★",
      releaseDate: "2008",
    },
    // Plus de films pour la catégorie 1
  ],
  Classiques: [
    {
      id: 5,
      title: "Titanic",
      imageUrl: "https://images.affiches-et-posters.com//albums/3/4499/medium/affiche-film-titanic-2314.jpg",
      synopsis: "Une romance tragique se déroule à bord du RMS Titanic entre une passagère de première classe et un pauvre artiste, sur le malheureux voyage inaugural du navire.",
      rating: "★★★★☆",
      releaseDate: "1997",
    },
    // J'ai remarqué des duplicatas pour Dragon Ball avec le même ID et la même image. Vous pouvez ajouter des informations uniques pour chaque entrée ou ajuster selon les besoins réels.
    {
      id: 6,
      title: "Dragon Ball",
      imageUrl: "https://www.yourdecoration.fr/cdn/shop/products/abystyle-abydco494-dragon-ball-cell-saga-poster-38x52cm_9a894b9e-96ef-4614-bbea-4a4582b8218b_500x.jpg?v=1698259886",
      synopsis: "Goku et ses amis défendent la Terre contre une variété de vilains, allant de guerriers intergalactiques à des créatures démoniaques quasi indestructibles.",
      rating: "★★★★☆",
      releaseDate: "1986", // Date de début du manga
    },
    // Plus de films pour la catégorie 2
  ],
  // Ajoutez d'autres catégories si nécessaire
};

export default films;
