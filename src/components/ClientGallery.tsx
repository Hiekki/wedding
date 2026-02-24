'use client';

import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type LockDir = 'vertical' | 'horizontal' | null;
type Dir = -1 | 1;

const PAGE_SIZE = 16;

const breakpointColumnsObj = {
    default: 4,
    1024: 2,
};

export default function ClientGallery({ photos }: { photos: string[] }) {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const [dir, setDir] = useState<Dir>(1);
    const [animKey, setAnimKey] = useState(0);

    const startY = useRef<number | null>(null);
    const startX = useRef<number | null>(null);
    const locked = useRef<LockDir>(null);

    const visiblePhotos = useMemo(() => photos.slice(0, visibleCount), [photos, visibleCount]);

    useEffect(() => {
        if (!sentinelRef.current) return;

        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setVisibleCount((c) => Math.min(c + PAGE_SIZE, photos.length));
                }
            },
            {
                rootMargin: '600px',
            },
        );

        obs.observe(sentinelRef.current);
        return () => obs.disconnect();
    }, [photos.length]);

    const close = () => setOpen(false);

    const go = (nextIndex: number, direction: Dir) => {
        setDir(direction);
        setIndex(nextIndex);
        setAnimKey((k) => k + 1);
    };

    const prev = () => go((index - 1 + photos.length) % photos.length, -1);

    const next = () => go((index + 1) % photos.length, 1);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowUp') prev();
            if (e.key === 'ArrowDown') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, index, photos.length]);

    function onTouchStart(e: React.TouchEvent) {
        const t = e.touches[0];
        startY.current = t.clientY;
        startX.current = t.clientX;
        locked.current = null;
    }

    function onTouchMove(e: React.TouchEvent) {
        if (startY.current == null || startX.current == null) return;
        const t = e.touches[0];
        const dy = t.clientY - startY.current;
        const dx = t.clientX - startX.current;

        if (!locked.current) {
            if (Math.abs(dy) > 10 || Math.abs(dx) > 10) {
                locked.current = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
            }
        }

        if (locked.current) e.preventDefault();
    }

    function onTouchEnd(e: React.TouchEvent) {
        if (startY.current == null || startX.current == null) return;
        const t = e.changedTouches[0];
        const dy = t.clientY - startY.current;
        const dx = t.clientX - startX.current;

        startY.current = null;
        startX.current = null;

        const THRESHOLD = 60;

        if (locked.current === 'horizontal') {
            if (Math.abs(dx) < THRESHOLD) return;
            if (dx < 0) next();
            else prev();
            return;
        }

        if (locked.current === 'vertical') {
            if (Math.abs(dy) < THRESHOLD) return;
            if (dy < 0) next();
            else prev();
        }
    }

    return (
        <section className='mx-auto max-w-6xl px-4 py-10'>
            <Masonry breakpointCols={breakpointColumnsObj} className='flex -ml-4' columnClassName='pl-4'>
                {visiblePhotos.map((src, i) => (
                    <button
                        key={src}
                        type='button'
                        className='mb-4 w-full'
                        onClick={() => {
                            setIndex(i);
                            setOpen(true);
                            setAnimKey((k) => k + 1);
                        }}
                    >
                        <Image
                            src={src}
                            alt=''
                            width={1000}
                            height={1000}
                            sizes='(max-width: 1024px) 50vw, 25vw'
                            className='w-full h-auto rounded-2xl'
                            priority={i < 6}
                        />
                    </button>
                ))}
            </Masonry>

            {visibleCount < photos.length && <div ref={sentinelRef} className='h-10' />}

            {open && (
                <div className='fixed inset-0 z-999 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center' onMouseDown={close}>
                    <div
                        className='relative w-full max-w-5xl'
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        style={{ touchAction: 'none' }}
                    >
                        <div
                            key={animKey}
                            className={`transition-all duration-300 ease-out ${
                                dir === 1 ? 'animate-[slideInRight_0.3s_ease-out]' : 'animate-[slideInLeft_0.3s_ease-out]'
                            }`}
                        >
                            <Image src={photos[index]} alt='' width={2400} height={2400} className='w-full h-auto rounded-2xl' priority />
                        </div>

                        {photos.length > 1 && (
                            <>
                                <button
                                    onClick={prev}
                                    className='absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-cream/90 text-sage shadow-md hover:scale-105 transition'
                                >
                                    <ChevronLeft size={30} strokeWidth={2.5} />
                                </button>
                                <button
                                    onClick={next}
                                    className='absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-cream/90 text-sage shadow-md hover:scale-105 transition'
                                >
                                    <ChevronRight size={30} strokeWidth={2.5} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
