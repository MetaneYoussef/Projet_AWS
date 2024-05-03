import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QCM = () => {
  const { type } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/${type}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Failed to fetch questions', error);
      }
    };

    fetchQuestions();
  }, [type]);

  const handleAnswer = (option) => {
    const newAnswers = [...answers, { [questions[currentQuestionIndex].tags[0]]: option }];
    setAnswers(newAnswers);
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      submitAnswers(newAnswers);
    }
  };

  const submitAnswers = async (newAnswers) => {
    try {
      const response = await axios.post(`http://localhost:4000/recommendations`, {
        answers: newAnswers,
        type
      });
      navigate(`/recommendations/${type}`, { state: { recommendations: response.data.recommendations } });
    } catch (error) {
      console.error('Failed to submit answers', error);
    }
  };

  return (
    <div>
      {questions.length > 0 && (
        <div>
          <h2>{questions[currentQuestionIndex].question}</h2>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QCM;
