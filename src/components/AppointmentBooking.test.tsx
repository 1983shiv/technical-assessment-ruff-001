import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AppointmentProvider } from '../context/AppointmentContext';
import AppointmentBooking from './AppointmentBooking';

describe('AppointmentBooking', () => {
    beforeEach(() =>
        render(
            <AppointmentProvider>
                <AppointmentBooking />
            </AppointmentProvider>
        )
    );
    it('renders form fields', () => {
        // TODO: Implement test
        expect(screen.getByTestId("select-docter")).toBeInTheDocument()
        expect(screen.getByTestId("select-date")).toBeInTheDocument()
        expect(screen.getByTestId("select-time")).toBeInTheDocument()
        expect(screen.getByTestId("book-btn")).toBeInTheDocument()
    });
    it('shows error on missing fields', () => {
        // TODO: Implement test
        fireEvent.click(screen.getByTestId("book-btn"))
        expect(screen.getByTestId('alert-error')).toBeInTheDocument()
    });
    it('books appointment and shows confirmation', () => {
        // TODO: Implement test
        fireEvent.change(screen.getByTestId("select-docter"), {
            target: { value: '1' },
        });
        fireEvent.change(screen.getByTestId("select-date"),{ target: { value : "2025-08-21"}})
        fireEvent.change(screen.getByTestId("select-time"),{ target: { value : "17:09"}})
        fireEvent.click(screen.getByTestId("book-btn"))
        expect(screen.getByTestId("confirmation")).toBeInTheDocument()
        expect(screen.getByTestId("confirmation")).toHaveTextContent("Appointment booked!")
    });
});
