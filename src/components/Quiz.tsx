import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

const Quiz: React.FC = () => {
  const { questions, current, answered, submitAnswer, nextQuestion, score } = useQuiz();
  const [selected, setSelected] = useState<number | null>(null);

  if (current >= questions.length) {
    return <div data-testid="quiz-complete">Quiz complete! Your score: {score}</div>;
  }

  const q = questions[current];

  return (
    <div>
      <h2>{q.text}</h2>
      <ul>
        {q.choices.map((choice, idx) => (
          <li key={idx}>
            <button
              disabled={answered}
              aria-pressed={selected === idx}
              onClick={() => setSelected(idx)}
              data-testid={`choice-${idx}`}
            >
              {choice}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => selected !== null && submitAnswer(selected)}
        disabled={answered || selected === null}
        data-testid="submit-btn"
      >Submit</button>
      {answered && (
        <>
          <div data-testid="feedback">{/* TODO: Show correct/incorrect feedback */}</div>
          <button onClick={nextQuestion} data-testid="next-btn">Next</button>
        </>
      )}
    </div>
  );
};

export default Quiz;