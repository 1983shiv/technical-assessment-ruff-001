
// src/components/PaymentMethodForm.tsx
import React, { useState } from 'react';
import { usePaymentMethodStore } from '../store/paymentMethodStore';

const validateCardNumber = (num: string) => {
  // TODO: Implement Luhn algorithm for card validation
  return true;
};

const validateExpiry = (expiry: string) => {
  // TODO: Validate MM/YY format and check if date is in the future
  return true;
};

const validateCVC = (cvc: string) => {
  // TODO: Validate CVC (3 or 4 digits)
  return true;
};

export const PaymentMethodForm: React.FC = () => {
  const { setMethod } = usePaymentMethodStore();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState<{ cardNumber?: string; expiry?: string; cvc?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Validate all fields and set errors
    // TODO: Simulate async API call, handle network errors
    // TODO: On success, update payment method in store
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Update Payment Method">
      <label>
        Card Number
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          aria-invalid={!!errors.cardNumber}
          aria-describedby="cardNumber-error"
          maxLength={19}
          autoComplete="cc-number"
        />
      </label>
      {errors.cardNumber && <span id="cardNumber-error">{errors.cardNumber}</span>}

      <label>
        Expiry (MM/YY)
        <input
          type="text"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          aria-invalid={!!errors.expiry}
          aria-describedby="expiry-error"
          maxLength={5}
          autoComplete="cc-exp"
        />
      </label>
      {errors.expiry && <span id="expiry-error">{errors.expiry}</span>}

      <label>
        CVC
        <input
          type="text"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          aria-invalid={!!errors.cvc}
          aria-describedby="cvc-error"
          maxLength={4}
          autoComplete="cc-csc"
        />
      </label>
      {errors.cvc && <span id="cvc-error">{errors.cvc}</span>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Updating...' : 'Update Payment Method'}
      </button>
      {submitError && <div role="alert">{submitError}</div>}
    </form>
  );
};