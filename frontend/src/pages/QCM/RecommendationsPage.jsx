import React from 'react';
import { useLocation } from 'react-router-dom';

const RecommendationsPage = () => {
  const location = useLocation();
  const { recommendations } = location.state;

  return (
    <div>
      <h1>Recommendations</h1>
      {recommendations.map((rec, index) => (
        <div key={index}>
          <h2>{rec.title}</h2>
          <img src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`} alt={rec.title} />
        </div>
      ))}
    </div>
  );
};

export default RecommendationsPage;
