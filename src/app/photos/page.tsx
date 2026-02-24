import Gallery from '@/components/Gallery';
import Image from 'next/image';

export default function Photos() {
    return (
        <section className='relative isolate w-full'>
            <div className='fixed inset-0 z-0 pointer-events-none'>
                <Image src='/images/border.png' alt='sage-borders' fill priority className='object-cover scale-95 lg:scale-100' />
            </div>

            <div className='relative z-10 w-full px-6 pt-24 lg:pt-36'>
                <Gallery />
            </div>
        </section>
    );
}
