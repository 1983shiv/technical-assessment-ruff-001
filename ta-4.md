Here is the **4th Technical Assessment for 26th July 2025**
**Type**: Frontend
**Difficulty**: Easy
**Tech Stack**: React + TypeScript

---

### 🧩 Assessment #4 — Toggleable FAQ Accordion

#### 📌 Goal:

Create a simple **FAQ Accordion** component that displays a list of questions. Clicking on a question should toggle the visibility of its answer.

---

### ✅ Requirements:

1. Render a list of FAQs (question + answer).
2. Only one answer should be visible at a time.
3. Clicking the same question again should close the answer (toggle).
4. Use TypeScript for all components.
5. Add basic styling (optional).
6. Do **not** use external UI libraries (e.g., no Bootstrap, Material UI).

---

### 🧪 Bonus (optional):

* Add test cases to verify:

  * Only one answer is open at a time.
  * Clicking an open question closes it.
  * Clicking a new question opens it and closes the previous one.

---

### 📂 File Structure:

You may use:

```
src/
├── components/
│   └── FAQAccordion.tsx
└── App.tsx
```

---

### 📝 Example Data:

```ts
const faqs = [
  { id: 1, question: "What is React?", answer: "React is a JavaScript library for building UIs." },
  { id: 2, question: "What is TypeScript?", answer: "TypeScript is a typed superset of JavaScript." },
  { id: 3, question: "What is JSX?", answer: "JSX stands for JavaScript XML." }
];
```

---

### 💡 Hints:

* Store the `openQuestionId` in state.
* Compare clicked `id` with the current `openQuestionId` to toggle.

---

Would you like the **starter code template** or **test cases** for this challenge?
Also, would you like to **subscribe to daily assessments** automatically with topic and difficulty selection (frontend/backend/full stack + easy/medium/hard)?
