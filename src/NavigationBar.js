import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css"; // Assurez-vous que le chemin d'accès est correct

const NavigationBar = () => {
  return (
    <div className="navigation">
      {/* Utilisez NavLink pour la navigation */}
      <NavLink to="/films" activeClassName="active" className="btn btn-films">Films</NavLink>
      <NavLink to="/series" activeClassName="active" className="btn btn-series">Séries</NavLink>
      <NavLink to="/animes" activeClassName="active" className="btn btn-anime">Anime</NavLink>
      <NavLink to="/qcm" activeClassName="active" className="btn btn-qcm">QCM</NavLink>
      <NavLink to="/Evenement" activeClassName="active" className="btn btn-evenements">Événements</NavLink>
    </div>
  );
};

export default NavigationBar;
