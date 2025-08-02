import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartProvider } from '../context/cartcontext';
import CartSidebar from './CartSidebar';

describe('CartSidebar', () => {
    it('renders cart items', () => {
        // TODO: Implement test
        render(
            <>
                <CartProvider>
                    <CartSidebar />
                </CartProvider>
            </>
        );
        // OR: check number of <li> elements
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(2);
    });
    it('updates quantity', () => {
        render(
            <>
                <CartProvider>
                    <CartSidebar />
                </CartProvider>
            </>
        );
        // TODO: Implement test
        fireEvent.change(screen.getAllByTestId ("item-quanity")[0], {
            target: { value: 3 },
        });
        expect(screen.getByTestId("cart-total")).toHaveTextContent(
            "Total: $110"
        );
    });
    it('removes item', () => {
        // TODO: Implement test
        render(
            <>
                <CartProvider>
                    <CartSidebar />
                </CartProvider>
            </>
        );
        const removeButtons = screen.getAllByTestId("item-remove");
        fireEvent.click(removeButtons[0]);
        const listItems = screen.getAllByRole('listitem');  
        expect(listItems).toHaveLength(1);
    });
    it('prevents quantity below 1', () => {
        // TODO: Implement test
        render(
            <>
                <CartProvider>
                    <CartSidebar />
                </CartProvider>
            </>
        );
        fireEvent.change(screen.getAllByTestId ("item-quanity")[0], {
            target: { value: 1 },
        });
        // Assert it stays at 1 (or whatever minimum your logic enforces)
        expect((screen.getAllByTestId ("item-quanity")[0] as HTMLInputElement).value).toBe('1');
    });
});
