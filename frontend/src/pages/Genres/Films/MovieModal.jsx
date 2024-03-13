import React from 'react';

function MovieModal({ film, onClose }) {
  if (!film) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto h-full w-full z-50">
      <div className="relative mx-auto p-5 w-full shadow-lg rounded-md bg-black">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <img className="w-48 h-auto mr-8" src={film.imageUrl} alt={film.title} />
            <div>
              <h3 className="text-lg leading-6 font-medium text-white mb-2">{film.title}</h3>
              <p className="text-sm text-gray-400">{film.synopsis}</p>
              <div className="mt-2">
                <span className="text-yellow-400 text-s font-bold">{film.rating}</span>
                <span className="text-gray-500 text-xs ml-2">{film.releaseDate}</span>
              </div>
              <div className="flex gap-4 mt-4">
                <button className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-xs px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button">
                  Regarder maintenant
                </button>
                <button className="bg-yellow-300 text-white active:bg-yellow-400 font-bold uppercase text-xs px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button">
                  Ajouter à la liste à voir
                </button>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="cursor-pointer bg-transparent border-0 text-white p-1">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
