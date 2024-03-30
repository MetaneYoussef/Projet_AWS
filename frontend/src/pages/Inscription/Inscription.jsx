import React from 'react';
import Footer from '../../components/Footer/Footer';
import Newsletter from './Newsletter';
import Features from './Features';
import FAQ from './FAQ';
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="relative bg-black overflow-hidden">
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 relative bg-cover bg-center " style={{ backgroundImage: 'url("/images/SignUp_Background.png")' }}>
      {/* Couche d'assombrissement */}
      <div className="absolute inset-0 bg-black opacity-55"></div>

      {/* Bouton "Accéder au site" en haut à gauche */}
      <a href="/" className="absolute top-5 left-5 z-20 bg-black border-2 border-black hover:bg-gray-700 hover:border-2 hover:border-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Accéder au site
      </a>

      {/* Bouton "Connexion" en haut à droite */}
      <a href="/Connexion" className="absolute top-5 right-5 z-20 bg-black border-2 border-black hover:bg-gray-700 hover:border-2 hover:border-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Connexion
      </a>
 
      {/* Contenu principal */}
      <div className="relative z-10 mt-10 flex justify-center">
        <a href="/">
          <img src="/images/RondSansFond.png" alt="Logo" className="mb-7 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-40 lg:h-40" />
        </a>

        
      </div>
        <p className="relative text-white font-extrabold text-center text-4xl mt-10">
          N'oubliez plus jamais ce que vous aimez regarder !
        </p>

        <p className="relative text-white text-center mt-2 mb-10 text-2xl">
          Accumulez vos séries et films préférés sans jamais en perdre le fil.
        </p>
        <hr className="w-full border-1 border-white my-2 mb-10" />

        <p className="relative text-white text-center text-3xl ">
          Prêt à Watched ? Saisissez votre adresse e-mail pour créer un compte.
        </p>

        <div className="w-full relative bottom-0 flex justify-center p-4 mt-10 sm:mt-20 ">
          <input
            type="email"
            placeholder="Adresse e-mail"
            className="appearance-none w-3/4 sm:w-1/2 py-4 px-6 text-white leading-tight border-4 rounded-lg border-gray-500 focus:outline-none bg-gray-700"
          />
          <Link 
            to="/FormulaireInscription"
            className="bg-slate-200 text-xl ml-4 hover:bg-gray-500 text-black font-bold rounded-lg py-4 px-6 focus:outline-none border-4 border-black focus:shadow-outline"
          >
            Commencez »
          </Link>
        </div>


        <div class="absolute w-full opacity-60" style={{ bottom: '0px', zIndex: '30' }}>
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
                class="fill-current text-white">     
            </path>
        </svg>
        </div>
    
    </div>
      {/* Conteneur du contenu défilable */}
      <div className="relative bg-black">
        {/* Ici, vous pouvez placer le reste de votre page, comme des formulaires d'inscription, du texte, etc. */}
      </div>
      <Features />
      <Newsletter className="relative z-30" />
      <FAQ/>
      <div className='bg-white'>
        <Footer />
      </div>
    </div>

  );
}

export default Signup;
