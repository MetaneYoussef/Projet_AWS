import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

function UserProfile() {

    const utilisateur = {
        nom: 'test',
        email: 'test@example.com',
        bio: 'Passionné de cinéma et de voyages.',
        avatar: '/RondAvecFond.png', 
    };

    
    return (
        <div>
        <div>
            <Header />


        </div>
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
         <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full md:w-3/4 lg:w-1/2">
           {/* Entête du Profil */}
           <div className="flex justify-center">
             <img
               src={utilisateur.avatar}
               alt="Avatar"
               className="rounded-full h-32 w-32 border-2 border-purple-500"
             />
           </div>
           <div className="text-center mt-4">
             <h1 className="text-3xl font-semibold">{utilisateur.nom}</h1>
             <p className="text-sm text-gray-600">{utilisateur.email}</p>
             <p className="mt-2">{utilisateur.bio}</p>
           </div>
   
           {/* Détails du Profil */}
           <div className="mt-6">
             <div className="bg-gray-100 rounded-lg p-4">
               <h2 className="font-semibold text-center mb-3">Informations du Profil</h2>
               <ul className="text-sm">
                 <li className="mt-2"><strong>Nom : </strong>{utilisateur.nom}</li>
                 <li className="mt-2"><strong>Email : </strong>{utilisateur.email}</li>
                 {/* Ajoute plus d'informations ici si nécessaire */}
               </ul>
             </div>
           </div>
   
           {/* Boutons d'action */}
           <div className="flex justify-around mt-6">
             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
               Modifier le Profil
             </button>
             <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
               Supprimer le Profil
             </button>
           </div>
         </div>
       </div>

       </div>

    )
}

export default UserProfile;