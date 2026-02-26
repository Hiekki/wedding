import { Metadata } from 'next';
import BorderFrame from '@/components/BorderFrame';

export const metadata: Metadata = {
    title: 'Haley and Kevin | Gift Registry',
};

export default function Registry() {
    return (
        <section className='relative h-screen w-full overflow-hidden'>
            <BorderFrame />

            <div className='flex flex-col min-h-screen items-center justify-center font-alex text-6xl lg:text-8xl'>
                Registry
                <p className='flex font-open text-2xl'>Coming soon...</p>
            </div>
        </section>
    );
}
