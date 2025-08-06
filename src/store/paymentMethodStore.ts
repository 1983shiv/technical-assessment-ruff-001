// src/store/paymentMethodStore.ts
import { create } from 'zustand';

export type PaymentMethod = {
  cardNumber: string;
  expiry: string;
  cvc: string;
  last4?: string;
};

type PaymentMethodState = {
  method: PaymentMethod | null;
  setMethod: (method: PaymentMethod) => void;
  clearMethod: () => void;
};

export const usePaymentMethodStore = create<PaymentMethodState>((set) => ({
  method: null,
  setMethod: (method) => set({ method }),
  clearMethod: () => set({ method: null }),
}));
