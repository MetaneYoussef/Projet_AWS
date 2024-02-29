import React from "react";
import "./Connexion.css";
import { NavLink } from "react-router-dom";
import "./styles.css"


const Connexion = () => {
  return (
    <div>
    <header style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
    }}>
    <NavLink to="/" className="bouton-titre">What You Watched</NavLink>
    </header>
  
    <div id="login-form">

      <h1>Connexion</h1>
      <form>
        <label htmlFor="username">Nom d'Utilisateur:</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Mot de Passe:</label>
        <input type="password" id="password" name="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>
    </div>
  );
};

export default Connexion;