import React, { useState } from 'react';

interface CharacterCounterProps {
  maxLength?: number;
}

const CharacterCounter: React.FC<CharacterCounterProps> = ({ maxLength }) => {
  const [text, setText] = useState('');

  const charCount = text.length;

  // TODO: Apply dynamic styling and limit logic
  const charColor = maxLength && (charCount > maxLength) ? 'red' : 'black'

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        cols={50}
        placeholder="Start typing..."
      />
      <p style={{ color: charColor }} data-testid="char-count">
        Characters: {charCount}{maxLength ? ` / ${maxLength}` : ''}
      </p>
    </div>
  );
};

export default CharacterCounter;
