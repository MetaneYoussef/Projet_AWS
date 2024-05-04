import React from 'react';
import { useLocation } from 'react-router-dom';

function ResultsPage() {
  const location = useLocation();
  const { recommendations } = location.state;

  return (
    <div>
      <h1>Recommendations</h1>
      {recommendations.map(rec => (
        <div key={rec.id}>
          <p>{rec.title}</p>
        </div>
      ))}
    </div>
  );
}

export default ResultsPage;
