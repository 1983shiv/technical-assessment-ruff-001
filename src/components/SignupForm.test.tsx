import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, beforeEach, it, expect } from 'vitest';
import { SignupForm } from './SignupForm';

describe('SignupForm', () => {
  beforeEach(() => {
    render(<SignupForm />);
  });

  it('renders all fields', () => {
    expect(screen.getByTestId('input-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });

  it('shows error when fields are invalid', () => {
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'invalid' } });
    fireEvent.blur(screen.getByTestId('input-email'));
    expect(screen.queryByTestId('error-email')).toBeTruthy();
  });

  it('enables submit when all fields are valid', () => {
    fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'secure123' } });

    expect(screen.getByTestId('submit-button')).not.toBeDisabled();
  });

  it('submits successfully', () => {
    fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: 'mypassword' } });

    fireEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByTestId('success-msg')).toBeInTheDocument();
  });
});
