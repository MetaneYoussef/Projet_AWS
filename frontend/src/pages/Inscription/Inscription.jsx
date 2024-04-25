import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Newsletter from './Newsletter';
import Features from './Features';
import FAQ from './FAQ';

function Signup() {
  return (
    <div className="relative bg-black text-white overflow-hidden">
      <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-gray-100 bg-cover bg-center relative" style={{ backgroundImage: 'url("/images/SignUp_Background.png")' }}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-55"></div>

        {/* Navigation Buttons */}
        <div className="absolute top-0 left-0 right-0 flex justify-between p-5">
          <a href="/" className="bg-black border border-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 hover:border-white">Accéder au site</a>
          <a href="/Connexion" className="bg-black border border-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 hover:border-white">Connexion</a>
        </div>

        {/* Logo Positioned Above the Form */}
        <div className="w-full flex justify-center absolute" style={{ top: '4rem' }}>
          <a href="/">
            <img src="/images/RondSansFond.png" alt="Logo" className="w-32 h-32 md:w-40 md:h-40 lg:w-40 lg:h-40" />
          </a>
        </div>

        {/* Form Container */}
        <div className="mt-16 z-10 bg-gray-700 bg-opacity-80 py-8 px-4 shadow-md rounded-lg max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Inscription</h2>
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Nom"
              className="w-full p-3 rounded bg-gray-500 text-white"
            />
            <input
              type="text"
              placeholder="Prénom"
              className="w-full p-3 rounded bg-gray-500 text-white"
            />
            <input
              type="email"
              placeholder="Mail"
              className="w-full p-3 rounded bg-gray-500 text-white"
            />
            <input
              type="password"
              placeholder="Mot de Passe"
              className="w-full p-3 rounded bg-gray-500 text-white"
            />
            <Link
              to="/signup"
              className="block w-full bg-slate-200 text-black font-bold text-center rounded py-3 px-6 hover:bg-gray-500"
            >
              Commencer »
            </Link>
          </form>
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
