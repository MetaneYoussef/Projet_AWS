import React from 'react';
import { useNavigate } from 'react-router-dom';

function QCM() {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    navigate(`/questions/${type}`);
  };

  return (
    <div>
      <h1>Préférez-vous regarder un film ou une série?</h1>
      <button onClick={() => handleSelect('film')}>film</button>
      <button onClick={() => handleSelect('series')}>série</button>
    </div>
  );
}

export default QCM;
