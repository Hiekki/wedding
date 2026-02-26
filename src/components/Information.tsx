'use client';

import { useState, useEffect } from 'react';
import BorderFrame from './BorderFrame';

export default function Information() {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const target = new Date('2026-09-12T16:00:00').getTime();
        const timer = setInterval(() => {
            setTime(target - new Date().getTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    return (
        <section className='relative h-screen w-full overflow-hidden'>
            <BorderFrame mode='absolute' />

            <div className='relative z-10 flex h-full items-center justify-center text-center px-6'>
                <div className='max-w-2xl lg:max-w-4xl text-sage'>
                    <h1 className='flex flex-col items-center text-5xl lg:text-9xl font-alex'>
                        <span className=''>Haley McPherson</span>
                        <span className='text-3xl lg:text-6xl font-bold'>&</span>
                        <span className=''>Kevin Abernathy</span>
                    </h1>
                    <p className='mt-12 text-xl lg:text-3xl opacity-90 font-open'>September 12, 2026</p>
                    <p className='flex flex-col pt-8 text-xl lg:text-2xl opacity-90 font-open tracking-wider'>
                        <span>The Side Porch</span>
                        <span>203 Roy Martin Road</span>
                        <span>Gray, TN 37615</span>
                    </p>
                    <p className='pt-24 text-lg lg:text-2xl opacity-90 font-open tracking-widest'>
                        {days} days
                        <span className='ml-8'>{hours} hours</span>
                        <span className='ml-8'>{minutes} minutes</span>
                        <span className='ml-8'>{seconds} seconds</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
