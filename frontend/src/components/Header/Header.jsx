import React from "react";
import { Link } from "react-router-dom";
import SearchComponent from "../NavigationBar/SearchComponent";

function Header() {
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center border-b border-gray-700">
      <Link to="/" className="flex items-center ml-5">
        <img src={`${process.env.PUBLIC_URL}/images/WYW.png`} alt="Logo" className="h-10 mr-5"/>
      </Link>
      <nav className="flex-grow mx-4">
        <ul className="flex justify-normal space-x-8 ml-5">
          <li><Link to="/films" className="hover:text-red-600 font-bold">FILMS</Link></li>
          <li><Link to="/series" className="hover:text-yellow-400 font-bold">SÉRIES</Link></li>
          <li><Link to="/qcm" className="hover:text-blue-500 font-bold">QCM</Link></li>
          <li><Link to="/evenement" className="hover:text-green-500 font-bold">EVENEMENTS</Link></li>
        </ul>
      </nav>
      {/* Intégration de la barre de recherche dans le Header */}
      <div className="flex-grow">
        <SearchComponent />
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/UserProfile" className="hover:text-yellow-200">Profil</Link>
        <Link to="/watchlist" className="hover:text-yellow-200">Ma Watchlist</Link>
        <Link to="/connexion" className="border-2 bg-white text-black hover:bg-black hover:text-white hover:border-2 hover:border-white font-bold py-2 px-4 rounded">Connexion</Link>
      </div>
    </header>
  );
}

export default Header;
