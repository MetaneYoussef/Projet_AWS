import React from "react";
import "./styles.css";
import Header from "./Header";
import SearchComponent from "./SearchComponent";
import Section from "./Section";
import NavigationBar from "./NavigationBar";
import films from "./films"


function Accueil() {
    return (
      <div>
        <div className="white-section">
          <Header />
          <NavigationBar />
        </div>
        <div className="main-content">
          <SearchComponent />
          <Section films={films.Watchlist} titre="Ma Watchlist" />
          <Section films={films.aLaUne} titre="À la une" />
          <Section films={films.Classiques} titre="Classiques" />
          <Section films={films.Classiques} titre="Saga" />
          <Section films={films.Classiques} titre="Les plus regardés" />
          {/* Autres contenus spécifiques à la page d'accueil */}
        </div>
      </div>
    );
  }

  export default Accueil;