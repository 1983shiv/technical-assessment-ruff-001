import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FeedbackForm } from './FeedbackForm_3';

describe('FeedbackForm', () => {
  it('renders all input fields and submit button', () => {
    render(<FeedbackForm />);
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('message-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
  });

  it('shows error when name is empty after blur', () => {
    render(<FeedbackForm />);
    const nameInput = screen.getByTestId('name-input');
    fireEvent.blur(nameInput);
    // TODO: Expect an error message for empty name
    expect(screen.getByTestId("name-error")).toHaveTextContent("Name should not be empty")
  });

  it('shows error for invalid email format', () => {
    render(<FeedbackForm />);
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    // TODO: Expect error message for invalid email
    expect(screen.getByTestId("email-error")).toHaveTextContent("Invalid Email")
  });

  it('enables submit button only when form is valid', () => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'A valid message!' } });

    // TODO: Expect button to be enabled
    expect(screen.getByTestId("submit-btn")).not.toBeDisabled()
  });

  it('shows thank you message on successful submission', async() => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'This is a long enough message.' } });

    const button = screen.getByTestId('submit-btn');
    fireEvent.click(button);

    // TODO: Expect thank you message to be shown
    await waitFor(() => {
        expect(screen.getByTestId("thank-you")).toHaveTextContent("Thank you for your feedback!")
    })
  });
});
