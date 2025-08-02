import React, { createContext, useContext, useState } from 'react';

export interface Question {
  id: string;
  text: string;
  choices: string[];
  answer: number; // index of correct choice
}

interface QuizContextType {
  questions: Question[];
  current: number;
  score: number;
  answered: boolean;
  submitAnswer: (choice: number) => void;
  nextQuestion: () => void;
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
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  // TODO: Implement submitAnswer and nextQuestion logic
  const submitAnswer = (choice: number) => {
    // TBD
  };
  const nextQuestion = () => {
    // TBD
  };

  return (
    <QuizContext.Provider value={{ questions, current, score, answered, submitAnswer, nextQuestion }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within a QuizProvider');
  return ctx;
};