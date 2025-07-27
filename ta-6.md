Here's your **2nd Technical Assessment for 27th July 2025**:

---

### ✅ **Assessment Title**: `EmailValidatorInput` Component

**Type**: Frontend
**Difficulty**: Easy
**Tech Stack**: React + TypeScript
**Focus**: Controlled components, form validation, conditional rendering, testing edge cases
**Scenario**: Email input component for a login form

---

### 📄 **Problem Description**

You're building an email input field that validates a user's email as they type. If the input is a valid email address, it shows a success message. If it's invalid, it shows an error. You must enforce basic email format using a regular expression.

---

### ✅ **Functional Requirements**

* A controlled `<input>` element to accept an email
* Show a message:

  * ✅ `"Valid email"` in green if email is valid
  * ❌ `"Invalid email"` in red if email is not valid and input is not empty
  * ⚪️ No message if the input is empty
* Message should appear in a `<p data-testid="email-feedback">...</p>`

---

### 💡 Edge Cases

* Empty input should show no message
* Leading/trailing spaces should be trimmed before validation
* Very long emails (e.g., over 100 characters) should still validate but not crash
* No crash on invalid formats like `@domain.com`, `user@`, `user@domain`, etc.

---

### 🔧 Component Template (with TODOs)

```tsx
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
```

---

### ✅ Unit Tests (`EmailValidatorInput.test.tsx`)

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import EmailValidatorInput from './EmailValidatorInput';

describe('EmailValidatorInput Component', () => {
  test('shows no message when input is empty', () => {
    render(<EmailValidatorInput />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryByTestId('email-feedback')).toBeNull();
  });

  test('shows valid message for correct email', () => {
    render(<EmailValidatorInput />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(screen.getByTestId('email-feedback')).toHaveTextContent('Valid email');
    expect(screen.getByTestId('email-feedback')).toHaveStyle('color: green');
  });

  test('shows error message for incorrect email', () => {
    render(<EmailValidatorInput />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, { target: { value: 'invalid@' } });
    expect(screen.getByTestId('email-feedback')).toHaveTextContent('Invalid email');
    expect(screen.getByTestId('email-feedback')).toHaveStyle('color: red');
  });

  test('trims input before validation', () => {
    render(<EmailValidatorInput />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, { target: { value: '   test@domain.com   ' } });
    expect(screen.getByTestId('email-feedback')).toHaveTextContent('Valid email');
  });

  test('handles very long email input', () => {
    render(<EmailValidatorInput />);
    const input = screen.getByTestId('email-input');
    const longEmail = 'user'.repeat(30) + '@example.com';
    fireEvent.change(input, { target: { value: longEmail } });
    expect(screen.getByTestId('email-feedback')).toHaveTextContent('Valid email');
  });
});
```

---


Let me know if you'd like the **MERN version** or turn this into a **Formik + Yup** form challenge.
