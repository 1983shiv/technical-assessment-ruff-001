import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // enables toHaveStyle and more matchers

import { test, expect } from "vitest"
import CharacterCounter from './CharacterCounter';


test('displays character count and turns red if limit exceeded', () => {
  render(<CharacterCounter maxLength={10} />);
  const textarea = screen.getByPlaceholderText(/start typing/i);
  
  fireEvent.change(textarea, { target: { value: 'hello world!' } });

  const el = screen.getByTestId('char-count');
  console.log(el.outerHTML); // inspect actual output

  
  expect(screen.getByText(/characters: 12 \/ 10/i)).toBeInTheDocument();
  expect(screen.getByText(/characters/i)).toHaveStyle("color: rgb(255, 0, 0)");
  // expect(screen.getByText('Characters: 12 / 10')).toHaveStyle('color: rgb(255, 0, 0)');
  // expect(screen.getByText(/characters: 12 \/ 10/i, { exact: false })).toHaveStyle('color: rgb(255, 0, 0)');
  // expect(screen.getByTestId('char-count')).toHaveStyle('color: rgb(255, 0, 0)');


});
