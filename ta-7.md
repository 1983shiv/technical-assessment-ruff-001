## ✅ Technical Assessment: `2nd of 27th July 2025`

**Type**: Frontend
**Difficulty**: Easy
**Language**: React + TypeScript
**Scenario**: Simple password strength checker
**Topic**: Controlled input, conditional rendering, basic regex, component design
**Status**: Has TODOs
**Includes**:
✅ Code Template
✅ Unit Test File with Gaps
✅ Clear functional and edge-case expectations

---

### 📘 Scenario

Create a `PasswordStrengthInput` component. The component should accept user input and display a strength label (`Weak`, `Medium`, or `Strong`) based on simple password rules.

---

### ✅ Functional Requirements

1. The component renders an `<input type="password">`
2. Based on the password entered:

   * Show **"Weak"** if less than 6 characters
   * Show **"Medium"** if at least 6 characters and includes numbers
   * Show **"Strong"** if at least 8 characters, includes numbers, and a special character (`!@#$%^&*`)
3. Strength message is displayed in a `<p data-testid="password-strength">`

---

### ❗Edge Cases

* No strength shown when input is empty
* Input with spaces should be trimmed before evaluation
* Avoid regex overcomplication – use basic string methods or minimal regex
* Passwords with only symbols or only numbers should not be labeled "Strong"

---

### 🧩 Component Starter (with TODOs)

// `PasswordStrengthInput.tsx`

```tsx
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
```

---

### 🧪 Unit Tests (partially complete with TODOs)

```tsx
// PasswordStrengthInput.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PasswordStrengthInput from './PasswordStrengthInput';

describe('PasswordStrengthInput', () => {
  it('shows no message for empty input', () => {
    render(<PasswordStrengthInput />);
    const input = screen.getByTestId('password-input');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryByTestId('password-strength')).toBeNull();
  });

  it('shows "Weak" for short passwords', () => {
    render(<PasswordStrengthInput />);
    const input = screen.getByTestId('password-input');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.getByTestId('password-strength').textContent).toBe('Weak');
  });

  // TODO: Write test for Medium password strength (e.g., "abc123")
  // TODO: Write test for Strong password strength (e.g., "abc123!")
  // TODO: Write test for trimming input like "   abc123!  "
  // TODO: Write test for only numeric or symbolic passwords
});
```

---

### ✅ What the Candidate Needs to Do

* Implement password strength logic in `getPasswordStrength`
* Handle edge cases (like trimming)
* Complete the missing unit tests
* Ensure all tests pass

---

Let me know if you'd like this challenge delivered in **MERN context**, **with Formik integration**, or **as a full-stack assessment**!
