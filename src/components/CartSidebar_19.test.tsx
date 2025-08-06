// CartSidebar.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect } from 'vitest';
import { CartProvider, useCart } from '../context/CartContext_19';
import CartSidebar from './CartSidebar_19';
import { mockItems } from "../context/CartContext_19"

// const mockItems = [
//   { id: '1', name: 'T-shirt', price: 20, quantity: 2, stock: 5 },
//   { id: '2', name: 'Sneakers', price: 50, quantity: 1, stock: 2 },
// ];

function setup(items = mockItems) {
  // Custom provider for test
  
  return render(
    <CartProvider>
      <CartSidebar />
    </CartProvider>
  );
}

test('renders cart items', () => {
  setup();
  expect(screen.getByText('T-shirt')).toBeInTheDocument();
  expect(screen.getByText('Sneakers')).toBeInTheDocument();
});

test('shows empty state', () => {
  setup([]);
  expect(screen.getByRole('alert')).toHaveTextContent('Your cart is empty');
});

test('updates quantity with valid value', () => {
  setup();
  const input = screen.getByLabelText('Quantity for T-shirt');
  fireEvent.change(input, { target: { value: '3' } });
  // TODO: Assert quantity updated, no error
});

test('shows error for quantity over stock', () => {
  setup();
  const input = screen.getByLabelText('Quantity for T-shirt');
  fireEvent.change(input, { target: { value: '10' } });
  expect(screen.getByRole('alert')).toHaveTextContent(/stock/i);
});

test('removes item from cart', () => {
  setup();
  const removeBtn = screen.getByLabelText('Remove T-shirt');
  fireEvent.click(removeBtn);
  // TODO: Assert item removed
});

// ...more tests for edge cases, accessibility, rapid input, etc.
