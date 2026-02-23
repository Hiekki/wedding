'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ClientGallery({ photos }: { photos: string[] }) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const close = () => setOpen(false);
    const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
    const next = () => setIndex((i) => (i + 1) % photos.length);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, photos.length]);

    return (
        <section className='mx-auto max-w-6xl px-4 py-10'>
            <div className='columns-2 gap-4 lg:columns-4'>
                {photos.map((src, i) => (
                    <button
                        key={src}
                        type='button'
                        className='mb-4 break-inside-avoid w-full'
                        onClick={() => {
                            setIndex(i);
                            setOpen(true);
                        }}
                    >
                        <Image
                            src={src}
                            alt=''
                            width={1000}
                            height={1000}
                            sizes='(max-width: 1024px) 50vw, 25vw'
                            className='w-full h-auto rounded-2xl hover:cursor-pointer'
                        />
                    </button>
                ))}
            </div>

            {open && (
                <div
                    className='fixed inset-0 z-999 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center'
                    onMouseDown={close} // click outside closes
                >
                    <div className='relative w-full max-w-5xl' onMouseDown={(e) => e.stopPropagation()}>
                        <div className='relative w-full'>
                            <Image
                                src={photos[index]}
                                alt=''
                                width={2000}
                                height={2000}
                                className='w-full h-auto rounded-2xl bg-black/10'
                                priority
                            />
                        </div>

                        {photos.length > 1 && (
                            <>
                                <button
                                    type='button'
                                    onClick={prev}
                                    className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-cream/90 px-5 text-sage border border-sage/30'
                                >
                                    {'<'}
                                </button>
                                <button
                                    type='button'
                                    onClick={next}
                                    className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-cream/90 px-5 text-sage border border-sage/30'
                                >
                                    {'>'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
