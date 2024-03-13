import React from "react";

const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col items-start space-y-2"> {/* Réduire l'espace vertical */}
      <div className="w-52 h-72 bg-gray-300 rounded-lg"></div> {/* Rendre l'affiche plus large */}
      <div className="w-48 h-6 bg-gray-200 rounded"></div> {/* Ajuster la largeur du titre pour correspondre à la nouvelle largeur des affiches */}
      <div className="w-44 h-5 bg-gray-200 rounded"></div> {/* Ajuster les détails */}
      <div className="w-32 h-5 bg-gray-200 rounded"></div> {/* Ajuster le genre */}
    </div>
  );
};

export default MovieCardSkeleton;