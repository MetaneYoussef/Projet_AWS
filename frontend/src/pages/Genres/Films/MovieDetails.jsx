import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import filmsData from "../../../components/MovieList/films"; // Ou votre source de données
import Header from "../../../components/Header/MovieHeader";
import Footer from "../../../components/Footer/Footer";

function MovieDetails() {

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default MovieDetails;