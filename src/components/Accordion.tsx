import React from 'react';
import FAQAccordion from './FAQAccordion';

const faqs = [
  { id: 1, question: "What is React?", answer: "React is a JavaScript library for building UIs." },
  { id: 2, question: "What is TypeScript?", answer: "TypeScript is a typed superset of JavaScript." },
  { id: 3, question: "What is JSX?", answer: "JSX stands for JavaScript XML." }
];

const AccordionOpenAi: React.FC = () => {
  return (
    <div>
      <h1>FAQ</h1>
      <FAQAccordion data={faqs} />
    </div>
  );
};

export default AccordionOpenAi;
