import Image from 'next/image';

export default function Registry() {
    return (
        <section className='relative h-screen w-full overflow-hidden'>
            <Image src='/images/border.png' alt='sage-borders' fill priority className='object-cover scale-95 lg:scale-100' />

            <div className='flex flex-col min-h-screen items-center justify-center font-alex text-6xl lg:text-8xl'>
                Registry
                <p className='flex font-open text-2xl'>Coming soon...</p>
            </div>
        </section>
    );
}
