import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { FeedbackForm } from './FeedbackForm';


describe('FeedbackForm', () => {
  test('shows error if feedback is too short', async () => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByTestId('feedback-input'), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });

  test('submits valid feedback successfully', async () => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByTestId('feedback-input'), {
      target: { value: 'This is valid feedback.' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });
  });

  test('submit button is disabled while submitting', async () => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByTestId('feedback-input'), {
      target: { value: 'Another good feedback.' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });
});
