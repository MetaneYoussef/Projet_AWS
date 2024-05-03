import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = (type) => {
    navigate(`/qcm/${type}`);
  };

  return (
    <div>
      <h1>Préférez-vous regarder un film ou une série?</h1>
      <button onClick={() => handleStart('film')}>Film</button>
      <button onClick={() => handleStart('série')}>Série</button>
    </div>
  );
};

export default Home;
