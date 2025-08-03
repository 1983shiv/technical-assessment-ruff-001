import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { QuizProvider } from '../context/QuizContext';
import Quiz from './Quiz';

describe('Quiz', () => {
    beforeEach(() => {
        render(
            <QuizProvider>
                <Quiz />
            </QuizProvider>
        );
    });
    it('renders a question', () => {
        // TODO: Implement test
        expect(screen.getByRole('heading', {level: 2})).toBeInTheDocument();
    });
    it('submits an answer and shows feedback', () => {
        // TODO: Implement test
        fireEvent.click(screen.getByTestId("choice-2"))
        expect(screen.getByTestId("submit-btn")).not.toBeDisabled()
        fireEvent.click(screen.getByTestId("submit-btn"))
        expect(screen.getByTestId("feedback")).toBeInTheDocument();
    });
    it('prevents multiple submissions', () => {
        // TODO: Implement test
        fireEvent.click(screen.getByTestId("choice-0"))
        fireEvent.click(screen.getByTestId("choice-2"))
        expect(screen.getByTestId("submit-btn")).not.toBeDisabled()
        fireEvent.click(screen.getByTestId("submit-btn"))
        expect(screen.getByTestId("feedback")).toBeInTheDocument();
    });
    it('shows score at end', () => {
        // TODO: Implement test
        fireEvent.click(screen.getByTestId("choice-0"))
        expect(screen.getByTestId("submit-btn")).not.toBeDisabled()
        fireEvent.click(screen.getByTestId("submit-btn"))
        expect(screen.getByTestId("feedback")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("next-btn"))

        fireEvent.click(screen.getByTestId("choice-1"))
        expect(screen.getByTestId("submit-btn")).not.toBeDisabled()
        fireEvent.click(screen.getByTestId("submit-btn"))
        expect(screen.getByTestId("feedback")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("next-btn"))

        expect(screen.getByTestId("quiz-complete")).toBeInTheDocument()
    });
});
