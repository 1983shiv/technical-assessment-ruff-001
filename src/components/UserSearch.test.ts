import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import UserSearch from './UserSearch';

describe('UserSearch', () => {
    test('filters users by name alic', () => {
        render(React.createElement(UserSearch));

        const input = screen.getByPlaceholderText(/search by name/i);

        fireEvent.change(input, { target: { value: 'alice' } });
        expect(screen.getByText(/alice johnson/i)).toBeInTheDocument();
        expect(screen.queryByText(/bob smith/i)).not.toBeInTheDocument();
        
    });
    test('filters users by name bob', () => {
        render(React.createElement(UserSearch));
        const input = screen.getByPlaceholderText(/search by name/i);
        fireEvent.change(input, { target: { value: 'bob' } });
        expect(screen.getByText(/bob smith/i)).toBeInTheDocument();
        expect(screen.queryByText(/alice johnson/i)).not.toBeInTheDocument();
    });
});
