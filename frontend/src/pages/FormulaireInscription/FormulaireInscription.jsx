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
      const response = await axios.post("http://localhost:4000/api/authRoutes/signup", {
        nom,
        prenom,
        email,
        mot_de_passe: motDePasse,
      });
      console.log("Utilisateur créé :", response.data);
      navigate("/")
      // Gérer la redirection ou l'affichage de message de succès ici
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-700 rounded-lg shadow-lg p-8 m-4 w-full lg:w-1/2">
        <div className="text-center text-white mb-8">
          <h1 className="text-3xl font-semibold">Inscription</h1>
          <p>Inscrivez-vous pour commencer votre aventure</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nom" className="block mb-1 text-white">Nom</label>
            <input
              id="nom"
              type="text"
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
  );
}

export default FormulaireInscription;
