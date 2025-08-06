// src/components/PaymentMethodForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, beforeEach, it, expect } from 'vitest';
import { PaymentMethodForm } from './PaymentMethodForm';
import { usePaymentMethodStore } from '../store/paymentMethodStore';

describe('PaymentMethodForm', () => {
  beforeEach(() => {
    usePaymentMethodStore.getState().clearMethod();
  });

  it('renders all input fields and submit button', () => {
    render(<PaymentMethodForm />);
    expect(screen.getByLabelText(/Card Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiry/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CVC/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows error for invalid card number', async () => {
    render(<PaymentMethodForm />);
    fireEvent.change(screen.getByLabelText(/Card Number/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText(/Invalid card number/i)).toBeInTheDocument();
    });
  });

  it('updates store on valid submission', async () => {
    render(<PaymentMethodForm />);
    fireEvent.change(screen.getByLabelText(/Card Number/i), { target: { value: '4242424242424242' } });
    fireEvent.change(screen.getByLabelText(/Expiry/i), { target: { value: '12/30' } });
    fireEvent.change(screen.getByLabelText(/CVC/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(usePaymentMethodStore.getState().method?.cardNumber).toBe('4242424242424242');
    });
  });

  // TODO: Add tests for expired card, invalid expiry format, network error simulation, accessibility checks
});