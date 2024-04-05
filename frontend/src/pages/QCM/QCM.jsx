import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import questions from './Questions'; // Assurez-vous que le chemin d'importation est correct
import Header from '../../components/Header/QcmHeader';
import Footer from '../../components/Footer/Footer';
import QcmEndScreen from './QcmEndScreen';


const Qcm = () => {
  const { type } = useParams(); // "films" ou "series"
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [key, setKey] = useState(0); // Ajoutez un état pour gérer la clé


  const handleAnswerOptionClick = (genre) => {
    setIsAnswerSelected(true); // Marquer qu'une réponse a été sélectionnée
    const updatedUserAnswers = [...userAnswers, genre];
    setUserAnswers(updatedUserAnswers);
  
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setIsAnswerSelected(false); // Réinitialiser pour la prochaine question
      } else {
        setIsQuizFinished(true);
      }
    }, 500); // Délai de 500 ms
  };

  const handleRestart = () => {
    setIsQuizFinished(false);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setIsAnswerSelected(false); // Assurez-vous de réinitialiser cet état
    setKey(prevKey => prevKey + 1); // Incrémentez la clé pour forcer le re-rendu
  };
  
  return (
    <div key={key} className='bg-gradient-to-b from-blue-700 to-blue-400'> {/* Utilisez la clé ici */}
      <Header/>
      {isQuizFinished ? (
        <QcmEndScreen type={type} userAnswers={userAnswers} onRestart={handleRestart} />
      ) : ( 
        <div className={`container p-8 transition-all duration-500 transform ${!isAnswerSelected ? 'scale-100' : 'scale-95'}`}>
          {/* LANCEMENT DU QCM */}
          <div className="qcm container p-8 text-white">
            <div className={`question-section mb-4 transition-opacity duration-500 ${!isAnswerSelected ? 'opacity-100' : 'opacity-0'}`}>
              <div className="question-count text-lg mb-2">
                Question {currentQuestion + 1}/{questions.length}
              </div>
              <div className="question-text text-xl font-semibold">{questions[currentQuestion].questionText}</div>
            </div>
            <div className="answer-section grid grid-cols-2 gap-4">
              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <button key={index} onClick={() => handleAnswerOptionClick(answerOption.genre)} 
                className="bg-blue-500 text-white border-2 p-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out">
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className='bg-white'> 
        <Footer /> 
      </div>
    </div>
  );
};

export default Qcm;