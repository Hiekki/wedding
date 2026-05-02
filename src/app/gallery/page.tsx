import Gallery from '@/components/Gallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Haley and Kevin | Gallery',
};

export default function Photos() {
    return (
        <section className='relative isolate w-full overflow-hidden bg-cream'>
            <div
                className='fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat'
                style={{
                    backgroundImage: "url('/images/floral.png')",
                }}
                aria-hidden='true'
            />

            <div className='relative z-10 py-16 text-sage lg:py-20'>
                <div className='mx-auto w-[90%] max-w-375 rounded-3xl bg-cream/70 px-8 py-10 text-center text-sage shadow-lg backdrop-blur-sm lg:w-[75%] lg:px-14 lg:py-12'>
                    <h1 className='mb-4 text-center text-5xl font-alex'>Our Gallery</h1>

                    <Gallery />
                </div>
            </div>
        </section>
    );
}
