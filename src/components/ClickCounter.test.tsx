import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

import ClickCounter from './ClickCounter';

describe('ClickCounter Component', () => {
    test('renders with initial count of 0', () => {
        render(<ClickCounter />);
        // TODO: Assert that "Count: 0" is shown in the document
        const IntialCount = screen.getByTestId('counter-text');
        expect(IntialCount).toHaveTextContent('Count: 0');
    });

    test('increments count on button click', () => {
        render(<ClickCounter />);
        const Countbtn = screen.getByTestId('counter-btn');
        fireEvent.click(Countbtn);
        const nextCount = screen.getByTestId('counter-text');
        expect(nextCount).toHaveTextContent('Count: 1');
        // TODO: Click the button
        // TODO: Assert that the count is now 1
    });

    test('increments correctly after multiple clicks', () => {
        render(<ClickCounter />);
        const Countbtn = screen.getByTestId('counter-btn');
        fireEvent.click(Countbtn);
        fireEvent.click(Countbtn);
        fireEvent.click(Countbtn);
        const nextCount = screen.getByTestId('counter-text');
        expect(nextCount).toHaveTextContent('Count: 3');
        expect(nextCount).not.toHaveTextContent('Count: 8');
        // TODO: Click the button three times
        // TODO: Assert that the count is 3
    });
    test('does not increment beyond 10 and disables the button', () => {
        render(<ClickCounter />);
        const button = screen.getByTestId('counter-btn');
        const display = screen.getByTestId('counter-text');

        for (let i = 0; i < 15; i++) {
            fireEvent.click(button);
        }

        expect(display).toHaveTextContent('Count: 10');
        expect(button).toBeDisabled();
    });
    test("reset the counter to 0", () => {
      render(<ClickCounter />)
      const resetbtn = screen.getByTestId('reset-btn');
      const countButton = screen.getByTestId('counter-btn');
      const display = screen.getByTestId('counter-text');

      fireEvent.click(countButton);
      fireEvent.click(countButton);
      expect(display).toHaveTextContent('2');

      fireEvent.click(resetbtn)
      expect(display).toHaveTextContent('Count: 0');
    })
});

afterEach(() => {
    cleanup();
});
