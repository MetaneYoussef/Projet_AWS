import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css"; // Assurez-vous que le chemin d'accès est correct

const Header = () => {
  return (
    <header style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
    }}>
    <NavLink to="/" className="bouton-titre">What You Watched</NavLink>
      
      <div style={{ position: 'absolute', right: '10px' }}>
        <NavLink to="/Watchlist" className="btn">Ma liste</NavLink>
        <NavLink to="/Connexion" className="btn">Connexion</NavLink>
      </div>
    </header>
  );
};

export default Header;
