import React, { useState } from "react";
import { Link } from "react-router-dom";

function FormulaireInscription() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
        {/* Card Container */}
        <div className="bg-gray-700 rounded-lg shadow-lg p-8 m-4 w-full lg:w-1/2">
          {/* Card Title */}
          <div className="text-center text-white mb-8">
            <h1 className="text-3xl font-semibold">Inscription</h1>
            <p>Inscrivez-vous pour commencer votre aventure</p>
          </div>
          
          {/* Card Content: Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="Last name" className="block mb-1 text-white">Nom</label>
              <input
                id="Last name"
                type="text"
                placeholder="Dupont"
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="First name" className="block mb-1 text-white">Prénom</label>
              <input
                id="First name"
                type="text"
                placeholder="Jean"
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="Tel" className="block mb-1">Telephone</label>
              <input
                id="Tel"
                type="Tel"
                placeholder="0612345678"
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>

  
            <div>
              <label htmlFor="email" className="block mb-1">Adresse Email</label>
              <input
                id="email"
                type="email"
                placeholder="wyw@example.com"
                className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              />
            </div>

            
  
            <div>
              <label htmlFor="password" className="block mb-1">Mot de Passe</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
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