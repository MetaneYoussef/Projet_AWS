import React from 'react';

export default function WatchlistItem({ title, episodeInfo, rating, poster }) {
  return (
      <div className="flex flex-col items-center bg-gray-800 text-white p-4 m-4 rounded-lg shadow-lg">
          <img src={poster} alt="Poster" className="w-full h-auto rounded-md"/>
          <h3 className="mt-2">{title}</h3>
          <p>{episodeInfo}</p>
          <p>{rating ? `Rating: ${rating}/5` : "-"}</p>
      </div>
  );
}