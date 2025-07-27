import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    id: number;
    title: string;
    content: string;
}

interface FAQAccordionProps {
    data: FAQItem[];
}

export const FAQAccordionV3: React.FC<FAQAccordionProps> = ({ data }) => {
    
    const [openId, setOpenId] = useState<number | null>(null);
    const toggleBtn = (id: number) => {
        setOpenId(id);
    };

    return (
        <div className="flex flex-col">
            {data.map(({ id, title, content }) => (
                <div className="flex-col w-[500px] bg-gray-300 text-black m-1" key={id}>
                    <div className="flex flex-row justify-between ">
                        <div className="text-xl p-2 text-left">
                            {title ?? 'No title'}
                        </div>
                        <div
                            className="text-xs p-1 items-center m-1"
                            onClick={() => toggleBtn(id)}
                            data-testid="toggle-btn"
                            aria-controls={`content-${id}`}
                        >
                            <ChevronDown />
                        </div>
                    </div>
                    {openId === id && (
                        <div className="bg-white text-gray-600 text-left p-2">
                            {content ?? 'No Content'}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
