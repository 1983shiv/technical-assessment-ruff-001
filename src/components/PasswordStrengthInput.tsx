import React, { useState } from 'react';

const PasswordStrengthInput: React.FC = () => {
  const [password, setPassword] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
  };

  const getPasswordStrength = (pwd: string): string | null => {
    
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    const isOnlySymbolsOrNumbers = /^[\d\W]+$/.test(pwd) && !/[a-zA-Z]/.test(pwd);


    if(isOnlySymbolsOrNumbers){
        return "Weak";
    }
    if ( pwd.length >=6 ){
        if(hasNumber){
            if(pwd.length >= 8){
                if(hasSpecialChar){
                    return "Very Strong"
                }
                return "Strong";
            }            
        }
        return "Medium";
    } else if(pwd.length === 0){
        return null;
    }


        
    // TODO 1: Trim the input
    // TODO 2: Implement password strength logic and return one of:
    // "Weak", "Medium", "Strong", or null for empty input

    return "Weak"; // Placeholder
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
        aria-label="Password input"
      />
      {strength && (
        <p data-testid="password-strength">{strength}</p>
      )}
    </div>
  );
};

export default PasswordStrengthInput;
