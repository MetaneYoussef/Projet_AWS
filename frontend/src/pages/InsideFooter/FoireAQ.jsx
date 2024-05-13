import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/WatchListHeader";
import FAQ from "../Inscription/FAQ";


function FoireAuxQuestions() {
  return(
    <div className="bg-black min-h-screen"> 
        <Header />
        <FAQ />
      <div classname="bg-white">
        <Footer />
      </div>
  </div>
  );
};

export default FoireAuxQuestions;