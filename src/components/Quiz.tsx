import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

const Quiz: React.FC = () => {
    const {
        questions,
        current,
        answered,
        feedback,
        submitAnswer,
        resetQuiz,
        nextQuestion,
        score,
    } = useQuiz();
    const [selected, setSelected] = useState<number | null>(null);

    const handleResetQuiz = () => {
        setSelected(null);
        resetQuiz();
    };
    if (current >= questions.length) {
        return (
            <>
                <div data-testid="quiz-complete">
                    Quiz complete! Your score: {score}
                </div>
                <button
                    onClick={() => {
                        handleResetQuiz();
                    }}
                >
                    Reset the Quiz
                </button>
            </>
        );
    }

    const q = questions[current];
    const getFeedback = feedback.find((item) => item.id === q.id);
    const anscolor = getFeedback?.feedback === 'correct' ? 'green' : 'red';

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2 w-full">
                <div className="flex-grow h-3 bg-gray-200 rounded">
                    <div
                        className="h-3 bg-green-500 rounded"
                        style={{
                            width: `${(current / questions.length) * 100}%`,
                        }}
                        role="progressbar"
                        aria-valuenow={current}
                        aria-valuemin={0}
                        aria-valuemax={questions.length}
                        aria-label="Quiz progress"
                    />
                </div>
                <span className="text-sm font-medium">
                    {current}/{questions.length}
                </span>
            </div>
            <h2>Question: {q.text}</h2>
            <ul className="flex flex-row gap-2 m-2 p-2">
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
            {!answered && (
                <button
                    onClick={() => selected !== null && submitAnswer(selected)}
                    disabled={answered || selected === null}
                    data-testid="submit-btn"
                >
                    Submit
                </button>
            )}
            {answered && (
                <>
                    <div data-testid="feedback" style={{ color: anscolor }}>
                        Your answer is : {getFeedback?.feedback}
                    </div>
                    <button onClick={nextQuestion} data-testid="next-btn">
                        Next
                    </button>
                </>
            )}
        </div>
    );
};

export default Quiz;
