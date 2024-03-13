import React from 'react';

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

 
      <a href="/" className="mt-0">
        <img src="/images/WYW.png" alt="Logo1" className="mb-7 w-25 h-25" />
      </a>


      {/* Contenu principal */}
      <div className="relative z-10">
        <a href="/">
          <img src="/images/RondAvecFond.png" alt="Logo" className="mt-7 mb-7 w-25 h-25" />
        </a>

        <div className="max-w-md w-full bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Les autres éléments restent inchangés */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Nom d'utilisateur
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="UserName"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="example@wyw.fr"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              S'inscrire
            </button>

          </div>
        </div>
      </div>
    </div>

    
    {/* Conteneur du contenu défilable */}
    <div className="relative bg-black">
        {/* Ici, vous pouvez placer le reste de votre page, comme des formulaires d'inscription, du texte, etc. */}
        
      </div>
    </div>

  );
}

export default Signup;
