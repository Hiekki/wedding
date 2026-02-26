import RSVPForm from './RSVPForm';
import { Metadata } from 'next';
import BorderFrame from '@/components/BorderFrame';

export const metadata: Metadata = {
    title: 'Haley and Kevin | RSVP',
};

export default function RSVPPage() {
    return (
        <section className='relative isolate min-h-screen w-full overflow-hidden'>
            <BorderFrame />

            <main className='relative z-10 min-h-dvh px-6 pt-30 lg:pt-64'>
                <div className='max-w-2xl mx-auto'>
                    <h1 className='text-5xl font-serif text-center tracking-widest'>RSVP</h1>
                    <p className='text-center text-neutral-600 mt-4'>Please respond at your earliest convenience.</p>

                    <div className='mt-10'>
                        <RSVPForm />
                    </div>
                </div>
            </main>
        </section>
    );
}
