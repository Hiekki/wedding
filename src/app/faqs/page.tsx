import Accordion from '@/components/ui/Accordion';
import { Metadata } from 'next';
import BorderFrame from '@/components/BorderFrame';

export const metadata: Metadata = {
    title: 'Haley and Kevin | FAQs',
};

export default function FAQsPage() {
    const faqItems = [
        {
            title: 'Can I bring a plus one?',
            content: (
                <p>
                    We kindly ask that only those listed on the invitation attend. While we wish we could celebrate with everyone, we have
                    chosen to keep our wedding intimate and personal.
                </p>
            ),
        },
        {
            title: 'Will alcohol be served?',
            content: (
                <p>
                    Our wedding will be alcohol-free. We ask that guests please respect this decision and refrain from bringing alcohol to
                    the event.
                </p>
            ),
        },
        {
            title: 'What is the dress code?',
            content: <p>The dress code is cocktail attire. We encourage guests to dress up for the occasion — more dressy is preferred!</p>,
        },
        {
            title: 'Is the ceremony indoors or outdoors?',
            content: <p>The ceremony will take place outdoors. Please plan accordingly and dress comfortably for the weather.</p>,
        },
        {
            title: 'Can I take photos?',
            content: (
                <p>
                    We would love for you to be fully present with us during the ceremony. Please refrain from taking photos during the
                    ceremony itself. You are welcome to take photos during the reception.
                </p>
            ),
        },
        {
            title: 'Where should we stay?',
            content: (
                <p>
                    We’ve provided hotel recommendations on the Travel page to make planning easier. Feel free to book at any location that
                    is most convenient for you.
                </p>
            ),
        },
        {
            title: 'Who do I contact with questions?',
            content: <p>If you have additional questions, please reach out to Kevin or Haley directly. We’re happy to help!</p>,
        },
    ];

    return (
        <main className='relative min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-9rem)] px-6 overflow-hidden'>
            <BorderFrame />

            <div className='relative z-10 w-full max-w-3xl mx-auto'>
                <div className='flex flex-col items-center justify-end text-center pt-20'>
                    <h1 className='text-4xl lg:text-5xl font-alex text-sage mb-4'>Frequently Asked Questions</h1>

                    <p className='text-sage/70 text-md lg:text-lg tracking-wide'>Everything you need to know for our special day</p>

                    <div className='w-24 h-0.5 bg-sage/40 mt-6' />
                </div>

                <div className='pt-6 pb-24'>
                    <Accordion items={faqItems} singleOpen />
                </div>
            </div>
        </main>
    );
}
