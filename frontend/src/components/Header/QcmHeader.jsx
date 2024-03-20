import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchComponent from "../NavigationBar/MovieSearch"; // Vérifiez le chemin pour correspondre à votre structure de projet

function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center border-b border-red-900 relative">
      <Link to="/" className="flex items-center ml-5">
        <img src={`${process.env.PUBLIC_URL}/images/WYW.png`} alt="Logo" className="h-10 mr-5"/>
      </Link>
        <nav className={`flex-grow mx-4 ${isSearchExpanded ? 'hidden' : ''}`}>
          <ul className="flex justify-normal space-x-8 ml-5">
            <li><Link to="/films" className="hover:text-red-600 font-bold">FILMS</Link></li>
            <li><Link to="/series" className="hover:text-yellow-600 font-bold">SÉRIES</Link></li>
            <li><Link to="/qcm" className="text-blue-500 hover:text-blue-600 font-bold">QCM</Link></li>
            <li><Link to="/evenement" className="hover:text-green-600 font-bold">ÉVÉNEMENTS</Link></li>
          </ul>
        </nav>

      {/* Intégration de la barre de recherche dans le Header */}
      <div className="flex items-center space-x-4">
        <Link to="/UserProfile" className="hover:text-yellow-200">Profil</Link>
        <Link to="/watchlist" className="hover:text-red-300">Ma Watchlist</Link>
        <Link to="/connexion" className="bg-white hover:bg-red-600 hover:text-white text-black font-bold py-2 px-4 rounded">Connexion</Link>
      </div>
    </header>
  );
}

export default Header;