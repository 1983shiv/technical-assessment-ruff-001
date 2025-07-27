
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it} from "vitest"
import FAQAccordion from './FAQAccordion';

const mockFaqs = [
  { id: 1, question: "Q1", answer: "A1" },
  { id: 2, question: "Q2", answer: "A2" },
];

describe('FAQAccordion', () => {
  it('renders all questions', () => {
    render(<FAQAccordion data={mockFaqs} />);
    mockFaqs.forEach(faq => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
  });

  it('toggles answer visibility', () => {
    render(<FAQAccordion data={mockFaqs} />);

    const q1 = screen.getByTestId('question-1');
    fireEvent.click(q1);
    expect(screen.getByTestId('answer-1')).toBeVisible();

    // Clicking same question closes it
    fireEvent.click(q1);
    expect(screen.queryByTestId('answer-1')).toBeNull();
  });

  it('only shows one answer at a time', () => {
    render(<FAQAccordion data={mockFaqs} />);

    fireEvent.click(screen.getByTestId('question-1'));
    expect(screen.getByTestId('answer-1')).toBeVisible();

    fireEvent.click(screen.getByTestId('question-2'));
    expect(screen.queryByTestId('answer-1')).toBeNull();
    expect(screen.getByTestId('answer-2')).toBeVisible();
  });
});
