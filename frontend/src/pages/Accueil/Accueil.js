import React from "react";
import "../../styles.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchComponent from "../../components/NavigationBar/SearchComponent";
import Section from "../../components/MovieList/Section";
import films from "../../components/MovieList/films"


function Accueil() {
    return (
      <div>
        <div className="black-section">
          <Header />
        </div>
        <div className="main-content">
          <Section films={films.Watchlist} titre="Ma Watchlist" />
          <Section films={films.aLaUne} titre="À la une" />
          <Section films={films.Classiques} titre="Classiques" />
          <Section films={films.Classiques} titre="Saga" />
          <Section films={films.Classiques} titre="Les plus regardés" />
          {/* Autres contenus spécifiques à la page d'accueil */}
        </div>
        <div className="black-section">
          <Footer />
        </div>
      </div>
    );
  }

  export default Accueil;