import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SelectionQCM() {
  const { type } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/${type}/questions`)
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, [type]);

  const handleAnswer = (answer, questionId) => {
    setAnswers([...answers, { questionId, answer }]);
  };

  const handleSubmit = () => {
    axios.post('/api/recommendations', { answers, type })
      .then(response => navigate(`/recommendations/${type}`, { state: { recommendations: response.data } }))
      .catch(error => console.error('Error submitting answers:', error));
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question._id}>
          <h2>{question.question}</h2>
          {question.options.map(option => (
            <button key={option} onClick={() => handleAnswer(option, question._id)}>{option}</button>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Answers</button>
    </div>
  );
}

export default SelectionQCM;
