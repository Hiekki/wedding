import { Metadata } from 'next';
import BorderFrame from '@/components/BorderFrame';

export const metadata: Metadata = {
    title: 'Haley and Kevin | Schedule',
};

const scheduleItems = [
    {
        title: 'Guest Arrival',
        time: '10:00 AM (eastern)',
        description: 'Please arrive a little early to park, find your seat, and get settled.',
    },
    {
        title: 'Ceremony',
        time: '12:00 PM (eastern)',
        description: 'Our ceremony will take place outdoors. Dress comfortably for the weather.',
    },
    {
        title: 'Photos',
        time: '1:00 PM (eastern)',
        description: 'Family and wedding party photos will take place immediately after the ceremony.',
    },
    { title: 'Reception', time: '3:00 PM (eastern)', description: 'Dinner, toasts, and celebration to follow.' },
    { title: 'Send-Off', time: '5:00 PM (eastern)', description: 'We’ll wrap up the night with a final farewell.' },
];

export default function Schedule() {
    return (
        <section className='relative min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-9rem)] w-full overflow-hidden'>
            <BorderFrame />
            <div className='relative z-10 w-full max-w-4xl mx-auto px-6 py-16 lg:py-20 text-sage'>
                <div className='text-center'>
                    <h1 className='text-5xl font-alex mb-4'>Our Schedule</h1>
                    <p className='text-sage/70 text-md lg:text-lg tracking-wide'>Times will be updated as we get closer to the big day.</p>
                    <div className='w-24 h-0.5 bg-sage/40 mt-6 mx-auto' />
                </div>
                <div className='mt-12 space-y-6'>
                    {scheduleItems.map((item) => (
                        <div
                            key={item.title}
                            className='rounded-2xl border border-sage/15 bg-cream/60 backdrop-blur-sm px-6 py-5 shadow-sm'
                        >
                            <div className='flex items-start justify-between gap-6'>
                                <div>
                                    <h2 className='text-2xl font-open'>{item.title}</h2>
                                    <p className='mt-2 text-sage/80 font-open'>{item.description}</p>
                                </div>
                                <div className='shrink-0'>
                                    <span className='inline-flex items-center rounded-full border border-rose/25 bg-rose/10 px-4 py-1 text-sm font-open text-rose'>
                                        {item.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className='mt-10 text-center text-sage/60 font-open text-sm'>Tip: Check back later for final times and any updates.</p>
            </div>
        </section>
    );
}
