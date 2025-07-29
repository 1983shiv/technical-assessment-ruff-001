Sure! Here's a **realistic easy-level frontend technical assessment** in **TypeScript**, suitable for MERN or React-focused environments.

---

## 🧪 Technical Assessment

**Title**: Controlled Character Counter Textarea
**Type**: Frontend
**Tech**: React + TypeScript
**Difficulty**: Easy
**Time estimate**: 20–30 mins

---

### ✅ Scenario

You're implementing a `ControlledTextareaWithLimit` component that allows users to type into a textarea, displays the current character count, and prevents input over a specified limit. The counter text turns **red** when the limit is exceeded.

You’ll complete the component logic and fix failing tests based on edge-case behavior.

---

### 📂 File 1: `ControlledTextareaWithLimit.tsx`

```tsx
import React, { useState } from 'react';

type Props = {
  limit: number;
};

const ControlledTextareaWithLimit: React.FC<Props> = ({ limit }) => {
  const [text, setText] = useState<string>(''); // Controlled input

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // TODO 1: Prevent typing more characters than limit
    // TODO 2: Allow user to paste text, but truncate it to limit
    // TODO 3: Update the text state with valid input
  };

  const isOverLimit = text.length > limit;

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
```

---

### 📂 File 2: `ControlledTextareaWithLimit.test.tsx`

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ControlledTextareaWithLimit from './ControlledTextareaWithLimit';

describe('ControlledTextareaWithLimit', () => {
  it('shows initial character count correctly', () => {
    render(<ControlledTextareaWithLimit limit={10} />);
    expect(screen.getByTestId('char-count').textContent).toContain('0 / 10');
  });

  it('updates character count as user types', () => {
    render(<ControlledTextareaWithLimit limit={10} />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(screen.getByTestId('char-count').textContent).toContain('5 / 10');
  });

  it('prevents user from typing beyond the limit', () => {
    render(<ControlledTextareaWithLimit limit={5} />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: '12345678' } });
    
    // TODO: Fix this test once truncation logic is implemented
    expect(textarea).toHaveValue('12345');
  });

  it('shows red color when limit is exceeded', () => {
    render(<ControlledTextareaWithLimit limit={5} />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: '1234567' } });

    // This will fail until logic is added to prevent overflow or check styling
    expect(screen.getByTestId('char-count')).toHaveStyle('color: red');
  });
});
```

---

### 🎯 Expectations & Edge Cases

* ✅ Character counter updates correctly on every keystroke.
* ✅ Prevents overflow via manual typing or pasting.
* ✅ Shows red counter only **when character count > limit**.
* ✅ Trim pasted text if it exceeds the limit.
* ✅ Works with limit = 0 or large values (edge case).

---

### 📝 What the Candidate Needs to Do

1. Implement the `handleChange` logic to:

   * Prevent overflow when typing.
   * Truncate input if pasted text exceeds limit.
2. Ensure the component behaves as expected for all tests.
3. Fix failing tests after logic is added.
4. Consider empty string, pasting, and backspace behaviors.

---

Would you like me to also provide:

* A `README.md` style candidate prompt summary?
* Hints or bonus challenge options?

Let me know!
