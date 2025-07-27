import React, { useState } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  data: FAQ[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ data }) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(prevId => (prevId === id ? null : id));
  };

  return (
    <div>
      {data.map(({ id, question, answer }) => (
        <div key={id} style={{ marginBottom: '1rem' }}>
          <button onClick={() => toggle(id)} data-testid={`question-${id}`}>
            {question}
          </button>
          {openId === id && (
            <p data-testid={`answer-${id}`}>{answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
