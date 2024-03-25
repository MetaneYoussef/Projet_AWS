import React, { useState } from "react";
import { Link } from "react-router-dom";

function Connexion() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState(""); // Ajouté pour l'email
  const [password, setPassword] = useState(""); // Ajouté pour le mot de passe

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  // Gère le changement dans le champ d'email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Gère le changement dans le champ de mot de passe
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div className="flex h-screen">
        <div className="w-1/2 bg-cover brightness-50" style={{ backgroundImage: "url('/images/SignUp_Background.png')" }}></div>
        <div className="w-1/2 flex flex-col items-center justify-center bg-neutral-900">
          <div className="relative text-center mb-8">
            <Link to="/">
              <img src={require("./RondSansFond.png")} alt="Votre logo" className="w-36 h-auto relative z-20" />
            </Link>
            {/* Ajustement du décalage du rond blanc */}
            <div className="w-32 h-32 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-[45%] -translate-y-1/2 shadow-xl z-5" style={{boxShadow: "0 0 10px 5px #fff"}}></div>
          </div>
          {/* Boîte de connexion avec ombrage personnalisé */}
          <div className="p-10 rounded-lg shadow-xl w-96 bg-neutral-800" style={{ boxShadow: "0 0 15px 5px #fff" }}>
            <p class="mb-8 text-2xl font-bold leading-5 text-white">S'identifier</p>
            
            <button class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="h-[18px] w-[18px]" />
              Continuer avec Google
            </button>

            <div class="flex w-full items-center gap-2 py-6 text-sm text-white font-semibold">
                <div class="h-px w-full bg-white"></div>
                OR
                <div class="h-px w-full bg-white"></div>
            </div>


            <form class="w-full">
              <p className="text-white font-semibold mb-4">Adresse Email</p>
              <label for="email" class="sr-only">Email Address</label>
              <input 
                name="email" 
                type="email" 
                autocomplete="email" 
                required=""
                class="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Adresse Email" 
                value={email}
                onChange={handleEmailChange}
              />
              <p className="text-white font-semibold my-4">Mot de passe</p>
              <label for="password" class="sr-only">Password</label>
              <input 
                name="password" 
                type="password" 
                autocomplete="current-password" 
                required=""
                class="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-gray-800 focus:ring-offset-1"
                placeholder="Mot de passe" 
                value={password}
                onChange={handlePasswordChange}
              />
            </form>

            <div className="mt-4 text-start">
              <p className="text-white text-sm">Première visite sur What You Watched ?
              <Link to="/inscription" className="text-white text-sm font-bold underline">Inscrivez-vous</Link>
              </p>
            </div>

            <div className="flex flex-auto items-center mt-4">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-white font-semibold">Se souvenir de moi</label>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default Connexion;