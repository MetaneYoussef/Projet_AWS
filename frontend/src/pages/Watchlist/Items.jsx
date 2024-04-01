import React from 'react';

export default function WatchlistItem({ title, episodeInfo, rating, poster }) {
  return (
      <div className="bg-black text-white border-2 rounded-lg flex lg:mb-2">
          <img src={poster} alt="Poster" className="w-32 h-44 md:w-40 md:h-56 rounded-md mr-4"/>
          <div className="flex flex-col justify-between w-full">
              <div>
                  <p className="text-lg md:text-xl font-bold mb-1 mt-2">{title}</p>
                  <p className="text-sm">{episodeInfo}</p>
              </div>
              <div>
                  <p className="flex items-center -mt-12 text-lg">
                    {rating ? (
                      <>
                        <span className="mr-1 md:-mt-1 text-2xl md:text-3xl text-yellow-500">★</span> {/* Remplacer par une icône d'étoile si nécessaire */}
                        {`${rating}/10`}
                      </>
                    ) : (
                      <>
                        <span className="mr-1 md:-mt-1 text-2xl md:text-3xl text-white">★</span> {/* Remplacer par une icône d'étoile si nécessaire */}
                        -
                      </>
                    )}
                  </p>
              </div>
          </div>
      </div>
  );
}