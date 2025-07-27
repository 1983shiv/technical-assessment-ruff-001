import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import EmailValidatorInput from './EmailValidatorInput';

describe('EmailValidatorInput Component', () => {
  test('shows no message when input is empty', () => {
    render(<EmailValidatorInput />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryByTestId('email-feedback')).toBeNull();
  });

  test('shows valid message for correct email', () => {
    render(<EmailValidatorInput />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(screen.getByTestId('email-feedback')).toHaveTextContent('Valid email');
    expect(screen.getByTestId('email-feedback')).toHaveStyle('color: green');
  });

  test('shows error message for incorrect email', () => {
    render(<EmailValidatorInput />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, { target: { value: 'invalid@' } });
    expect(screen.getByTestId('email-feedback')).toHaveTextContent('Invalid email');
    expect(screen.getByTestId('email-feedback')).toHaveStyle('color: red');
  });

  test('trims input before validation', () => {
    render(<EmailValidatorInput />);
    const input = screen.getByTestId('email-input');
    fireEvent.change(input, { target: { value: '   test@domain.com   ' } });
    expect(screen.getByTestId('email-feedback')).toHaveTextContent('Valid email');
  });

  test('handles very long email input', () => {
    render(<EmailValidatorInput />);
    const input = screen.getByTestId('email-input');
    const longEmail = 'user'.repeat(30) + '@example.com';
    fireEvent.change(input, { target: { value: longEmail } });
    expect(screen.getByTestId('email-feedback')).toHaveTextContent('Valid email');
  });
});
