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

            <div className='relative z-10 w-full px-6 pt-24 lg:pt-36'>
                <Gallery />
            </div>
        </section>
    );
}
