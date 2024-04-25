import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // Assurez-vous d'ajouter axios à vos dépendances
import { useAuth } from "../../context/AuthContext";

function Connexion() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Utilisez le hook useAuth pour accéder à la fonction login
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [motDePasse, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://what-you-watched-backend.vercel.app/api/authRoutes/login", {
        email: email,
        mot_de_passe: motDePasse
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.data.token) {
        login(response.data.token); // Utilisez la fonction login de votre contexte pour mettre à jour l'état global d'authentification
        navigate("/"); // Redirigez l'utilisateur après la connexion réussie
      }
    } catch (err) {
      const errorMessage = err.response?.data?.msg;
      setError(errorMessage || "Une erreur est survenue lors de la connexion.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/2 w-full bg-cover brightness-50" style={{ backgroundImage: "url('/images/SignUp_Background.png')" }}></div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-neutral-900">
        <div className="relative text-center -mb-8">
          <Link to="/">
            <img src={require("./RondSansFond.png")} alt="Votre logo" className="w-36 h-auto relative z-20" />
          </Link>
          <div className="w-32 h-32 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-[45%] -translate-y-1/2 shadow-xl z-5" style={{ boxShadow: "0 0 10px 5px #fff" }}></div>
        </div>
        <div className="p-6 md:p-10 rounded-lg shadow-xl w-full md:w-96 bg-neutral-800" style={{ boxShadow: "0 0 15px 5px #fff" }}>
          <p className="mb-1 text-2xl font-bold leading-5 text-white">Connexion</p>
          <div className="flex w-full items-center gap-2 py-4 mb-4 text-sm text-gray-400 font-semibold">
            <div className="h-px w-full bg-gray-400"></div>
          </div>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <form onSubmit={handleLogin} className="w-full">
            <p className="text-white font-semibold mb-2">Adresse Email</p>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
              placeholder="Adresse Email"
              value={email}
              onChange={handleEmailChange}
            />
            <p className="text-white font-semibold mt-4 mb-2">Mot de passe</p>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-gray-800 focus:ring-offset-1"
              placeholder="Mot de passe"
              value={motDePasse}
              onChange={handlePasswordChange}
            />
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
            <button type="submit" className="bg-black text-white border-2 border-black hover:bg-white hover:text-black p-2 px-4 mt-3 rounded-lg cursor-pointer font-bold">Se Connecter</button>
          </form>
          <div className="mt-4 text-start">
            <p className="text-white text-sm">Première visite sur What You Watched ?
              <Link to="/inscription" className="text-white text-sm font-bold underline"> Inscrivez-vous</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Connexion;
