'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    singleOpen?: boolean;
}

export default function Accordion({ items, singleOpen = true }: AccordionProps) {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggle = (index: number) => {
        if (singleOpen) {
            setOpenIndexes(openIndexes.includes(index) ? [] : [index]);
        } else {
            setOpenIndexes((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
        }
    };

    return (
        <div className='space-y-6 lg:space-y-8'>
            {items.map((item, index) => {
                const isOpen = openIndexes.includes(index);

                return (
                    <div
                        key={index}
                        className='rounded-3xl border border-sage/25 bg-white/70 backdrop-blur-md shadow-md shadow-sage/10 transition-all duration-300 hover:shadow-sage/20'
                    >
                        <button
                            onClick={() => toggle(index)}
                            className='w-full flex justify-between items-center px-5 lg:px-8 py-5 lg:py-6 text-left'
                        >
                            <span className='text-sage tracking-[0.06em] text-xl font-serif'>{item.title}</span>

                            <ChevronDown
                                className={`transition-transform duration-300 text-sage shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                                size={20}
                            />
                        </button>

                        <div
                            className={`grid transition-all duration-300 ease-in-out ${
                                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                        >
                            <div className='overflow-hidden'>
                                <div className='px-5 lg:px-8 pb-6 lg:pb-8 text-sage/80 leading-relaxed text-lg'>{item.content}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
