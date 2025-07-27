import React, { useState } from 'react';

const PasswordStrengthInput: React.FC = () => {
  const [password, setPassword] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const getPasswordStrength = (pwd: string): string | null => {
    // TODO 1: Trim the input
    // TODO 2: Implement password strength logic and return one of:
    // "Weak", "Medium", "Strong", or null for empty input

    return null; // Placeholder
  };

  const strength = getPasswordStrength(password);

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={handleChange}
        data-testid="password-input"
        placeholder="Enter password"
      />
      {strength && (
        <p data-testid="password-strength">{strength}</p>
      )}
    </div>
  );
};

export default PasswordStrengthInput;
