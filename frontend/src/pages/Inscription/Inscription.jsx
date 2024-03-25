import React from 'react';
import Footer from '../../components/Footer/Footer';
import Newsletter from './Newsletter';
import Features from './Features';
import FAQ from './FAQ';

function Signup() {
  return (
    <div className="relative bg-black">
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 relative bg-cover bg-center " style={{ backgroundImage: 'url("/images/SignUp_Background.png")' }}>
      
      {/* Couche d'assombrissement */}
      <div className="absolute inset-0 bg-black opacity-55"></div>

      {/* Bouton "Accéder au site" en haut à gauche */}
      <a href="/" className="absolute top-5 left-5 z-20 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Accéder au site
      </a>

      {/* Bouton "Connexion" en haut à droite */}
      <a href="/Connexion" className="absolute top-5 right-5 z-20 bg-black hover:bg-gray text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Connexion
      </a>

 
      <a href="/" className="absolute top-5">
        <img src="/images/WYW.png" alt="Logo1" className="mb-7 w-25 h-16" />
      </a>


      {/* Contenu principal */}
      <div className="relative z-10">
        <a href="/">
          <img src="/images/RondAvecFond.png" alt="Logo" className="mt-24 mb-7 w-52 h-52 " />
        </a>

        
      </div>
        <p className="relative text-white font-extrabold text-center text-4xl mt-10">
          N'oubliez plus jamais ce que vous aimez regarder !
        </p>

        <p className="relative text-white text-center mt-2 mb-10 text-2xl">
          Accumulez vos séries et films préférés sans jamais en perdre le fil.
        </p>
        <hr className="w-full border-1 border-white my-2 mb-10" />

        <p className="relative text-white text-center text-3xl mb-24">
          Prêt à Watched ? Saisissez votre adresse e-mail pour créer un compte.
        </p>

        <div class="absolute w-full opacity-60" style={{ bottom: '0px', zIndex: '30' }}>
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
                class="fill-current text-white"></path>
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
