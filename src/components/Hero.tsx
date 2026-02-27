import Image from 'next/image';

export default function Hero() {
    return (
        <section className='relative h-screen w-full overflow-hidden -mt-24 lg:-mt-36'>
            <Image src='/images/hero.jpg' alt='Haley and Kevin' fill priority className='object-cover' />

            <div className='absolute inset-0 bg-black/30' />

            <div className='relative z-10 flex h-full items-center justify-center text-center px-6'>
                <div className='max-w-2xl lg:max-w-4xl text-white'>
                    <h1 className='text-4xl lg:text-6xl font-bold font-open'>{`"Wherever you live, I will live. Your people shall be my people, and your God will be my God, too."`}</h1>
                    <p className='mt-4 text-lg lg:text-2xl opacity-90 font-open'>-Ruth 1:16</p>
                </div>
            </div>
        </section>
    );
}
