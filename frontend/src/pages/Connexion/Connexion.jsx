import React, { useState } from "react";
import { Link } from "react-router-dom";

function Connexion() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover" style={{ backgroundImage: "url('/images/BGConnexion.png')" }}></div>
      <div className="w-1/2 flex flex-col items-center justify-center" style={{ backgroundColor: "#5d5d5d" }}>
        <div className="relative text-center mb-5">
          <Link to="/">
            <img src={require("./RondSansFond.png")} alt="Votre logo" className="w-36 h-auto relative z-20" />
          </Link>
          {/* Ajustement du décalage du rond blanc */}
          <div className="w-32 h-32 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-[45%] -translate-y-1/2 shadow-xl z-5" style={{boxShadow: "0 0 10px 5px #fff"}}></div>
        </div>
        {/* Boîte de connexion avec ombrage personnalisé */}
        <div className="p-10 rounded-lg shadow-xl w-96" style={{ backgroundColor: "#404040", boxShadow: "0 0 15px 5px #fff" }}>
          <h2 className="text-white text-2xl font-bold mb-4">S'identifier</h2>
          <form className="flex flex-col">
            <label htmlFor="email" className="text-white mb-2 font-bold">Adresse e-mail</label>
            <input type="email" id="email" name="email" className="mb-4 p-2 rounded border border-gray-400" required />

            <label htmlFor="password" className="text-white mb-2 font-bold">Mot de passe</label>
            <input type="password" id="password" name="password" className="mb-4 p-2 rounded border border-gray-400" required />

            <button type="submit" className="bg-black text-white p-3 rounded-full cursor-pointer font-bold">S'identifier</button>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-white font-bold">Se souvenir de moi</label>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-white">Première visite sur What You Watched ?</p>
            <Link to="/inscription" className="text-white font-bold underline">Inscrivez-vous</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;