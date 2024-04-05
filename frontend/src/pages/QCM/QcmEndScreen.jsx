import React from 'react';

const QcmEndScreen = ({ userAnswers, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h2 className="text-3xl font-bold mb-4">Vous avez complété le QCM !</h2>
      <p className="text-lg sm:text-xl mb-8">↓↓↓ Voici ce que pouvez commencer à regarder sans tarder ↓↓↓</p>
      <button 
        className="bg-white border-2 border-blue-900 text-blue-700 font-medium py-4 px-5 mb-2 rounded hover:bg-blue-400 hover:text-white hover:border-white transition duration-300 ease-in-out">
          Voir les recommandations
      </button>
      <button 
        onClick={onRestart} 
        className="bg-blue-900 border-2 text-white font-medium py-2 px-4 rounded hover:bg-blue-400 hover:text-white hover:border-blue-900 transition duration-300 ease-in-out">
          Recommencez
      </button>
    </div>
  );
};

export default QcmEndScreen;
