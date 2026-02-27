import RSVPForm from './RSVPForm';
import { Metadata } from 'next';
import BorderFrame from '@/components/BorderFrame';

export const metadata: Metadata = {
    title: 'Haley and Kevin | RSVP',
};

export default function RSVPPage() {
    return (
        <section className='relative isolate w-full overflow-hidden'>
            <BorderFrame />

            <main className='relative z-10 px-6 flex justify-center min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-9rem)] items-center pb-24 lg:pb-0'>
                <div className='max-w-2xl mx-auto'>
                    <h1 className='text-5xl text-center tracking-widest font-alex mt-4 lg:-mt-24'>R.S.V.P.</h1>
                    <p className='text-center text-neutral-600 mt-4'>Please respond at your earliest convenience.</p>

                    <div className='mt-10'>
                        <RSVPForm />
                    </div>
                </div>
            </main>
        </section>
    );
}
