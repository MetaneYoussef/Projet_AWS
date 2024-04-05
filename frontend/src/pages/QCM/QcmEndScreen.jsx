import React from 'react';

const QcmEndScreen = ({ userAnswers, onRestart }) => {
  
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <img src='https://www.pngkey.com/png/full/21-215619_checkmark-in-circle-clip-white-check-mark-symbol.png' className='w-36 -mt-10 sm:w-44 mb-4 animate-bounce'/>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Vous avez complété le QCM !</h2>
      <p className="flex text-center text-lg sm:text-xl mb-8 px-2">Voici ce que pouvez commencer à regarder sans tarder.</p>
      <button 
        className="bg-white border-2 border-blue-900 text-blue-700 font-medium py-4 px-5 mb-3 rounded hover:bg-blue-400 hover:text-white hover:border-white transition duration-300 ease-in-out">
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
