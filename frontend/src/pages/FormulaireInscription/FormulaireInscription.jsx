import React, { useState } from "react";
import axios from "axios"; // Importez Axios
import { useNavigate } from "react-router-dom";

function FormulaireInscription() {
  // États pour chaque champ du formulaire
  const navigate = useNavigate()
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await axios.post("https://what-you-watched-backend.vercel.app/api/authRoutes/signup", {
        nom: nom,
        prenom: prenom,
        email: email,
        mot_de_passe: motDePasse,
      });
      console.log("Utilisateur créé :", response.data);

      //const token = response.data.token;
      //localStorage.setItem('userToken', token);


      navigate("/")
      // Gérer la redirection ou l'affichage de message de succès ici
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur");
    }
  };

  return (
    <div className="relative bg-black overflow-hidden">

      <div className="min-h-screen flex flex-row justify-center items-center bg-gray-100 relative bg-cover bg-center" style={{ backgroundImage: 'url("/images/SignUp_Background.png")' }}>

        <div className="absolute z-20 top-0 xl:top-56 mt-4 mb-7 flex justify-center md:justify-start w-3/4">
          <a href="/">
            <img src="/images/RondSansFond.png" alt="Logo" className="brightness-50 mb-7 w-24 h-24 sm:w-24 sm:h-24  md:w-32 md:h-32  lg:w-36 lg:h-36 lg:ml-24 xl:w-48 xl:h-48 xl:ml-0" />
          </a>
        </div>

        <div className="absolute z-10 top-0 xl:top-56 mt-4 mb-7 flex justify-center md:justify-end w-3/4">
          <a href="/">
            <img src="/images/RondSansFond.png" alt="Logo" className="brightness-50 mb-7 w-24 h-24 sm:w-24 sm:h-24  md:w-32 md:h-32  lg:w-36 lg:h-36 lg:mr-24 xl:w-48 xl:h-48 xl:mr-0" />
          </a>
        </div>


        <div className="absolute inset-0 bg-black opacity-55"></div>

        <div className="absolute bg-gray-700 rounded-lg shadow-lg p-4 sm:p-8 m-4 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">


          <div className="text-center text-white mb-4 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">Inscription</h1>
            <p className="text-sm sm:text-base">Inscrivez-vous pour commencer votre aventure</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nom" className="block mb-1 text-white">Nom</label>
              <input
                id="nom"
                type="text"
                placeholder="White"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>


            <div>
              <label htmlFor="prenom" className="block mb-1 text-white">Prénom</label>
              <input
                id="prenom"
                type="text"
                placeholder="Walter"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>


            <div>
              <label htmlFor="email" className="block mb-1 text-white">Mail</label>
              <input
                id="email"
                type="email"
                placeholder="example@wyw.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-white">Mot de Passe</label>
              <input
                id="password"
                type="password"
                value={motDePasse}
                placeholder="Azerty123456"
                onChange={(e) => setMotDePasse(e.target.value)}
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Créer Mon Compte
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default FormulaireInscription;
