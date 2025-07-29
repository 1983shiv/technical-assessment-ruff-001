import React, { useState } from 'react';

type Props = {
  limit: number;
};

const ControlledTextareaWithLimit: React.FC<Props> = ({ limit }) => {
  const [text, setText] = useState<string>(''); // Controlled input
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    // TODO 1: Prevent typing more characters than limit
    if(newValue.length <= limit){
        setText(newValue)
    } else {
        // TODO 2: Allow user to paste text, but truncate it to limit
        // TODO 3: Update the text state with valid input
        setText(newValue.slice(0, limit))
        }
    };

  const isOverLimit = text.length + 1 > limit;
  return (
    <div>
      <textarea
        value={text}
        onChange={handleChange}
        data-testid="textarea"
        placeholder="Type your message"
      />
      <p
        data-testid="char-count"
        style={{
          color: isOverLimit ? 'red' : 'black',
        }}
      >
        Characters: {text.length} / {limit}
      </p>
    </div>
  );
};

export default ControlledTextareaWithLimit;
