import React, { createContext, useContext, useMemo, useState } from 'react';

export interface Question {
  id: string;
  text: string;
  choices: string[];
  answer: number; // index of correct choice
}

export interface feedbackProp {
    id: string;
    feedback: 'correct' | 'incorrect'
}

interface QuizContextType {
  questions: Question[];
  current: number;
  score: number;
  answered: boolean;
  feedback: feedbackProp[];
  submitAnswer: (choice: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const initialQuestions: Question[] = [
  {
    id: 'q1',
    text: 'What is the capital of France?',
    choices: ['Berlin', 'Paris', 'Rome', 'Madrid'],
    answer: 1,
  },
  {
    id: 'q2',
    text: '2 + 2 = ?',
    choices: ['3', '4', '5', '6'],
    answer: 1,
  },
];

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions] = useState<Question[]>(initialQuestions);
  const [feedback, setFeedback] = useState<feedbackProp[]>([])
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  // TODO: Implement submitAnswer and nextQuestion logic
  const submitAnswer = (choice: number) => {
    // TBD
    setAnswered(true)
    if(questions[current].answer === choice) {
        setScore((prev) => prev + 10)
        setFeedback(prev => [...prev, {id: questions[current].id, feedback: 'correct'}])
    } else {
        setFeedback(prev => [...prev, {id: questions[current].id, feedback: 'incorrect'}])
    }
  };
  const nextQuestion = () => {
    // TBD
    setAnswered(false)
    if (current < questions.length) {
        setCurrent((prev) => prev + 1)
    }
  };
  const resetQuiz = () => {
    // TBD
    setAnswered(false)
    if (current >= questions.length) {
        setCurrent(0)
        setScore(0)
    }
  };
  const storeValue = useMemo(() => ({ questions, current, score, answered, feedback, submitAnswer, nextQuestion, resetQuiz }), [questions, current, score, answered, feedback])
  return (
    <QuizContext.Provider value={storeValue}>
      {children}
    </QuizContext.Provider>
  );
  //   return (
//     <QuizContext.Provider value={{ questions, current, score, answered, feedback, submitAnswer, nextQuestion }}>
//       {children}
//     </QuizContext.Provider>
//   );
};

export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within a QuizProvider');
  return ctx;
};