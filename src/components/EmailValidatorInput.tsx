// EmailValidatorInput.tsx
import React, { useState } from 'react';

const EmailValidatorInput: React.FC = () => {
  // TODO: Create state for email input
  const [email, setEmail] = useState<string>('');

  // TODO: Write a function that returns true/false based on a simple email regex
  const isValidEmail = (value: string): boolean => {
    const trimmed = value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(trimmed);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Update email state with user input
    setEmail(e.target.value);
  };

  const getFeedback = () => {
    // TODO: Trim the input and return appropriate feedback JSX
    const trimmed = email.trim();
    if (trimmed === '') return null;
    if (isValidEmail(trimmed)) {
      return <p data-testid="email-feedback" style={{ color: 'green' }}>Valid email</p>;
    } else {
      return <p data-testid="email-feedback" style={{ color: 'red' }}>Invalid email</p>;
    }
  };

  return (
    <div>
      {/* TODO: Controlled input field */}
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your email"
        data-testid="email-input"
      />
      {getFeedback()}
    </div>
  );
};

export default EmailValidatorInput;
