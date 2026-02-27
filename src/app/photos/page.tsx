import Gallery from '@/components/Gallery';
import { Metadata } from 'next';
import BorderFrame from '@/components/BorderFrame';

export const metadata: Metadata = {
    title: 'Haley and Kevin | Gallery',
};

export default function Photos() {
    return (
        <section className='relative isolate w-full'>
            <BorderFrame />

            <div className='relative z-10 w-full px-6 py-16 lg:py-20 text-sage'>
                <h1 className='text-center text-5xl font-alex mb-4'>Our Gallery</h1>
                <Gallery />
            </div>
        </section>
    );
}
