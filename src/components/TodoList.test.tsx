import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect } from "vitest"
import TodoList from './TodoList';

test('toggles completion status of todo', () => {
  render(<TodoList />);
  
  const checkbox = screen.getByLabelText(/learn react/i);
  expect(checkbox).not.toBeChecked();
  
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});
