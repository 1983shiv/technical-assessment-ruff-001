import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // enables toHaveStyle and more matchers

import { test, expect, describe } from 'vitest';
import Accordion from './Accordion-v2';
import { accordionItems } from './AccordionData';

describe('Accordion Component Test', () => {
    test('renders all FAQAccordion items', () => {
        render(<Accordion />);
        accordionItems.forEach((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
        });
    });
});
