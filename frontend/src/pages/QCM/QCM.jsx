import React, { useState } from 'react';
import questions from './Questions'; // Assurez-vous que le chemin d'importation est correct
import Header from '../../components/Header/QcmHeader';
import Footer from '../../components/Footer/Footer';
import QcmEndScreen from './QcmEndScreen';


const Qcm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const handleAnswerOptionClick = (genre) => {
    const updatedUserAnswers = [...userAnswers, genre];
    setUserAnswers(updatedUserAnswers);
  
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      console.log('Réponses de l’utilisateur:', updatedUserAnswers);
      setIsQuizFinished(true); // Indique que le QCM est terminé
    }
  };

  const handleRestart = () => {
    // Logique pour recommencer le QCM, si nécessaire
    setIsQuizFinished(false);
    setCurrentQuestion(0);
    setUserAnswers([]);
  };
  
  return (
    <div className='bg-gradient-to-b from-blue-700 to-blue-400'>
      <Header/>
      {isQuizFinished ? (
        <QcmEndScreen userAnswers={userAnswers} onRestart={handleRestart} />
      ) : ( 
        <div className="container p-8">
          {/* LANCEMENT DU QCM */}
          <div className="qcm container p-8 text-white">
            <div className="question-section mb-4">
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