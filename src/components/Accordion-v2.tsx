
import { accordionItems } from './AccordionData';
import { FAQAccordionV3 } from './FAQAccordion-v3';

const Accordion = () => {
    return (
        <>
            <FAQAccordionV3 data={accordionItems} />
        </>
    );
};

export default Accordion;
