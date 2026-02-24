import Image from 'next/image';
import RSVPForm from './RSVPForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Haley and Kevin | RSVP',
};

export default function RSVPPage() {
    return (
        <section className='relative h-screen w-full'>
            <Image src='/images/border.png' alt='sage-borders' fill priority className='object-cover scale-95 lg:scale-100' />

            <main className='h-screen px-6 py-16 mt-20 lg:mt-30'>
                <div className='max-w-2xl mx-auto'>
                    <h1 className='text-5xl font-serif text-center tracking-widest'>RSVP</h1>
                    <p className='text-center text-neutral-600 mt-4'>Please respond at your earliest convenience.</p>

                    <div className='mt-10 mb-24 lg:mb-0'>
                        <RSVPForm />
                    </div>
                </div>
            </main>
        </section>
    );
}
