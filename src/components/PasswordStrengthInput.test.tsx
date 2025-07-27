// PasswordStrengthInput.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PasswordStrengthInput from './PasswordStrengthInput';

describe('PasswordStrengthInput', () => {
  it('shows no message for empty input', () => {
    render(<PasswordStrengthInput />);
    const input = screen.getByTestId('password-input');
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryByTestId('password-strength')).toBeNull();
  });

  it('shows "Weak" for short passwords', () => {
    render(<PasswordStrengthInput />);
    const input = screen.getByTestId('password-input');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.getByTestId('password-strength').textContent).toBe('Weak');
  });

  // TODO: Write test for Medium password strength (e.g., "abc123")
  // TODO: Write test for Strong password strength (e.g., "abc123!")
  // TODO: Write test for trimming input like "   abc123!  "
  // TODO: Write test for only numeric or symbolic passwords
});
