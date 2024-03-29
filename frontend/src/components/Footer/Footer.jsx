// Footer/index.js
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <><div>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Section Logo et Sélection de la langue */}
          <div className="flex flex-col items-center md:items-start">
            <img src={`${process.env.PUBLIC_URL}/images/RondAvecFond.png`} alt="Logo" className="h-28 mb-4" />
            <select className="bg-black text-white p-2 rounded cursor-pointer">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
          {/* Liens Entreprise */}
          <div className="flex flex-col items-center md:items-start">
            <p className="font-bold text-gray-500 text-xs mb-3">ENTREPRISE</p>
            <Link to="/A-Propos" className="mb-3 md:mb-3 md:mx-2 hover:underline">À propos</Link>
            <Link to="/Creators" className="mb-3 md:mb-3 md:mx-2 hover:underline">Créateurs</Link>
            <Link to="/privacy-policy" className="mb-3 md:mb-3 md:mx-2 hover:underline">Confidentialité</Link>
            <Link to="/FAQ" className="mb-2 md:mb-3 md:mx-2 hover:underline">FAQ</Link>
            <Link to="/CGU" className="mb-2 md:mb-3 md:mx-2 hover:underline">CGU</Link>
            </div>
          {/* Liens Utiles et Nous Suivre */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <p className="font-bold text-gray-500 text-xs mb-3">LIENS UTILES</p>
            <Link to="/A-Propos" className="mb-3 md:mb-3 md:mx-2 hover:underline">Support</Link>
            <Link to="/Creators" className="mb-3 md:mb-3 md:mx-2 hover:underline">Contact</Link>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <p className="font-bold text-gray-500 text-xs mb-3">NOUS SUIVRE</p>
            <Link to="Facebook" className="mb-3 md:mb-3 md:mx-2 hover:underline">Facebook</Link>
            <Link to="/Twitter" className="mb-3 md:mb-3 md:mx-2 hover:underline">Twitter</Link>
            <Link to="/Instragram" className="mb-3 md:mb-3 md:mx-2 hover:underline">Instagram</Link>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-black text-white text-center p-5">
        <p>&copy; {new Date().getFullYear()}, What You Watched. All rights reserved.</p>
      </footer>
    </>
  );
}
export default Footer;