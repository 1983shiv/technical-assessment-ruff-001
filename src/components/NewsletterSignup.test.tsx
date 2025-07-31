import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import { NewsletterSignup } from './NewsletterSignup';

describe('NewsletterSignup', () => {
    beforeEach(() => {
        render(<NewsletterSignup />);
    });

    it('renders form inputs', () => {
        expect(screen.getByTestId('input-email')).toBeInTheDocument();
        expect(screen.getByTestId('checkbox-terms')).toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeDisabled();
    });

    it('shows error for invalid email', async() => {
        fireEvent.change(screen.getByTestId('input-email'), {
            target: { value: 'invalid-email' },
        });
        fireEvent.click(screen.getByTestId('checkbox-terms'));
        fireEvent.click(screen.getByTestId('submit-button'));

        // TODO: Expect error message to appear for invalid email
        await waitFor(() => {
            expect(screen.getByTestId("error-email")).toBeInTheDocument();
            expect(screen.getByTestId('error-email')).toHaveTextContent(
                'Email should contain @ sign and it should not empty'
            );            
        });
    });

    it('submits form when email is valid and terms are accepted', async () => {
        fireEvent.change(screen.getByTestId('input-email'), {
            target: { value: 'user@example.com' },
        });
        fireEvent.click(screen.getByTestId('checkbox-terms'));
        fireEvent.click(screen.getByTestId('submit-button'));

        await waitFor(() => {
            // TODO: Expect success message to be shown success-message
            expect(screen.getByTestId('success-message')).toBeInTheDocument();
        });
    });

    it('resets form after successful submission', async () => {
        fireEvent.change(screen.getByTestId('input-email'), {
            target: { value: 'user@example.com' },
        });
        fireEvent.click(screen.getByTestId('checkbox-terms'));
        fireEvent.click(screen.getByTestId('submit-button'));

        // TODO: Expect email input to be cleared
        await waitFor(() => {
            // expect(screen.getByTestId("input-email").innerHTML).toBe("");
            expect(screen.getByTestId("input-email")).toHaveValue("");
        });
    });
});
