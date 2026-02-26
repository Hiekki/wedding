import { Metadata } from 'next';
import BorderFrame from '@/components/BorderFrame';

export const metadata: Metadata = {
    title: 'Haley and Kevin | Schedule',
};

export default function Schedule() {
    return (
        <section className='relative h-screen w-full overflow-hidden'>
            <BorderFrame />

            <div className='flex flex-col min-h-screen items-center justify-center font-alex text-6xl lg:text-8xl'>
                Schedule
                <p className='flex font-open text-2xl'>Coming soon...</p>
            </div>
        </section>
    );
}
