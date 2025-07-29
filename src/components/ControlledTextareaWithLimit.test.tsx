import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ControlledTextareaWithLimit from './ControlledTextareaWithLimit';

describe('ControlledTextareaWithLimit', () => {
  it('shows initial character count correctly', () => {
    render(<ControlledTextareaWithLimit limit={10} />);
    expect(screen.getByTestId('char-count').textContent).toContain('0 / 10');
  });

  it('updates character count as user types', () => {
    render(<ControlledTextareaWithLimit limit={10} />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(screen.getByTestId('char-count').textContent).toContain('5 / 10');
  });

  it('prevents user from typing beyond the limit', () => {
    render(<ControlledTextareaWithLimit limit={5} />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: '12345678' } });
    
    // TODO: Fix this test once truncation logic is implemented
    expect(textarea).toHaveValue('12345');
  });

  it('shows red color when limit is exceeded', () => {
    render(<ControlledTextareaWithLimit limit={5} />);
    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: '1234567' } });

    // This will fail until logic is added to prevent overflow or check styling
    expect(screen.getByTestId('char-count')).toHaveStyle('color: rgb(255, 0, 0)');
  });
});
