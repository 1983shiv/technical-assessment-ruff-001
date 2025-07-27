
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { FAQAccordion } from './FAQAccordion-v2';

describe('FAQAccordion Component', () => {
  const item = {
    id: 1,
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces.'
  };

  test('displays title only by default', () => {
    render(<FAQAccordion item={item} />);
    expect(screen.getByText(/what is react/i)).toBeInTheDocument();
    expect(screen.queryByText(/react is a javascript/i)).not.toBeInTheDocument();
  });

  test('toggles content on click', () => {
    render(<FAQAccordion item={item} />);
    const toggleButton = screen.getByTestId('toggle-btn');
    
    // Click to show content
  fireEvent.click(toggleButton);
  expect(screen.getByText(/react is a javascript/i)).toBeInTheDocument();

  // Click again to hide content
  fireEvent.click(toggleButton);
  expect(screen.queryByText(/react is a javascript/i)).not.toBeInTheDocument();
  });
});
