import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQAccordionProps {
    item: {
        id: number,
        title?: string;
        content?: string;
    };
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ item}) => {
    const [ toggle, setToggle] = useState<boolean>(false)
    const { id, title, content } = item;  
    
    
    const toggleBtn = () => {
      setToggle(!toggle)
    }

    return (
        <div className="flex flex-col w-[500px] bg-gray-300 text-black">
            <div className="flex flex-row justify-between ">
                <div className="text-xl p-2 text-left">{title ?? 'No title'}</div>
                <div
                    className="text-xs p-1 items-center m-1"
                    onClick={() => toggleBtn() } 
                    data-testid="toggle-btn"
                    aria-expanded={toggle}
                    aria-controls={`content-${id}`}
                >
                    <ChevronDown />
                </div>
            </div>
            {toggle && (
                <div className="bg-white text-gray-600 text-left p-2">
                    {content ?? 'No Content'}
                </div>
            )}
        </div>
    );
};
