a **revised version** of today's (📅 27th July 2025) **1st Technical Assessment (Frontend - Easy)** in **TypeScript** with clearly marked `TODO`s and unit test stubs.

---

### ✅ **Assessment Title:** Button Click Counter

**Type:** Frontend
**Language:** TypeScript + React
**Difficulty:** Easy

---

## 🧩 Challenge Description

Implement a React component called `ClickCounter`:

* It should display a button labeled **"Click Me"**.
* It should show a paragraph displaying the current count in the format: `Count: X`.
* Clicking the button should increment the counter.

You need to implement the component functionality and write unit tests to verify it.

---

## 📝 Starter Code (with TODOs)

### `ClickCounter.tsx`

```tsx
import React from 'react';

// TODO: Import useState from React

const ClickCounter: React.FC = () => {
  // TODO: Create a state variable `count` initialized to 0

  // TODO: Create a function `handleClick` that increments the count

  return (
    <div>
      {/* TODO: Add a button with text "Click Me", data-testid="counter-btn", and onClick handler */}
      
      {/* TODO: Add a paragraph showing "Count: {count}" with data-testid="counter-text" */}
    </div>
  );
};

export default ClickCounter;
```

---

### ✅ Unit Test Starter

### `ClickCounter.test.tsx`

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ClickCounter from './ClickCounter';

describe('ClickCounter Component', () => {
  test('renders with initial count of 0', () => {
    render(<ClickCounter />);
    // TODO: Assert that "Count: 0" is shown in the document
  });

  test('increments count on button click', () => {
    render(<ClickCounter />);
    // TODO: Click the button
    // TODO: Assert that the count is now 1
  });

  test('increments correctly after multiple clicks', () => {
    render(<ClickCounter />);
    // TODO: Click the button three times
    // TODO: Assert that the count is 3
  });
});
```

---

## 🧠 Bonus TODOs (Optional)

* [ ] Add a **Reset** button that sets the count back to 0.
* [ ] Disable the **Click Me** button after the count reaches `10`.

Let me know if you'd like a starter repo, Vite + Vitest setup, or the solution walkthrough once you're done.
