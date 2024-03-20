import React from 'react';
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div>
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 relative bg-cover bg-center" style={{ backgroundImage: 'url("/images/SignUp_Background.png")' }}>
      {/* Couche d'assombrissement */}
      
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Bouton "Accéder au site" en haut à gauche */}
      <a href="/" className="absolute top-5 left-5 z-20 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Accéder au site
      </a>

      {/* Bouton "Connexion" en haut à droite */}
      <a href="/Connexion" className="absolute top-5 right-5 z-20 bg-black hover:bg-gray text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Connexion
      </a>

 
      <a href="/" className="absolute top-5">
        <img src="/images/WYW.png" alt="Logo1" className="mb-7 w-25 h-25" />
      </a>


      {/* Contenu principal */}
      <div className="relative z-10">
        <a href="/">
          <img src="/images/RondAvecFond.png" alt="Logo" className="mt-24 mb-7 w-52 h-52 " />
        </a>

        
      </div>
        <p className="relative text-white font-bold text-center text-5xl mt-10">
          N'oubliez plus jamais ce que vous aimez regarder !
        </p>

        <p className="relative text-white text-center mt-2 mb-10 text-3xl">
          Accumulez vos séries et films préférés sans jamais en perdre le fil.
        </p>
        <hr className="w-full border-1 border-white my-2 mb-10" />

        <p className="relative text-white text-center text-3xl">
          Prêt à Watched ? Saisissez votre adresse e-mail pour créer un compte.
        </p>
      </div>  

      <div className="w-full absolute bottom-0 flex justify-center p-24">
        <input
          type="email"
          placeholder="Adresse e-mail"
          className="appearance-none w-1/2 py-4 px-6 text-white leading-tight focus:outline-none bg-gray-700" 
        />
          <Link 
            to="/FormulaireInscription"
            className="bg-white hover:bg-gray-500 text-black font-bold py-2 px-4  focus:outline-none focus:shadow-outline">
            Commencez »
          </Link>
      </div>



      


    
      {/* Conteneur du contenu défilable */}
      <div className=" relative bg-black">
          {/* Ici, vous pouvez placer le reste de votre page, comme des formulaires d'inscription, du texte, etc. */}

          <p className="text-white text-center text-5xl">
          ▽▽ En savoir plus sur nous ▽▽
          </p>


        
        </div>
    </div>

  );
}

export default Signup;
