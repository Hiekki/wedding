'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import Envelope from './Envelope';
import { IntroStage } from '../../../types/Intro';

export default function WeddingIntro() {
    const [stage, setStage] = useState<IntroStage>('closed');
    const [doorProgress, setDoorProgress] = useState(0);
    const touchStart = useRef<number | null>(null);

    const isOpen = stage === 'opening' || stage === 'doors';
    const isDoors = stage === 'doors';

    useEffect(() => {
        document.body.style.overflow = stage === 'done' ? '' : 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, [stage]);

    useEffect(() => {
        if (stage !== 'opening') return;

        const timer = setTimeout(() => {
            setDoorProgress(0);
            setStage('doors');
        }, 2300);

        return () => clearTimeout(timer);
    }, [stage]);

    useEffect(() => {
        if (stage !== 'doors') return;

        const updateProgress = (amount: number) => {
            setDoorProgress((prev) => {
                const next = Math.max(0, Math.min(1, prev + amount));

                if (next >= 1) {
                    setTimeout(() => {
                        setStage('done');
                        window.scrollTo(0, 0);
                    }, 250);
                }

                return next;
            });
        };

        const wheel = (e: WheelEvent) => {
            e.preventDefault();
            updateProgress(e.deltaY / 1200);
        };

        const touchStartHandler = (e: TouchEvent) => {
            touchStart.current = e.touches[0].clientY;
        };

        const touchMoveHandler = (e: TouchEvent) => {
            if (touchStart.current === null) return;

            e.preventDefault();

            const current = e.touches[0].clientY;
            updateProgress((touchStart.current - current) / 900);
            touchStart.current = current;
        };

        window.addEventListener('wheel', wheel, { passive: false });
        window.addEventListener('touchstart', touchStartHandler, { passive: false });
        window.addEventListener('touchmove', touchMoveHandler, { passive: false });

        return () => {
            window.removeEventListener('wheel', wheel);
            window.removeEventListener('touchstart', touchStartHandler);
            window.removeEventListener('touchmove', touchMoveHandler);
        };
    }, [stage]);

    if (stage === 'done') return null;

    return (
        <section className='fixed inset-0 z-9999 overflow-hidden'>
            <motion.div
                animate={{ opacity: isDoors ? 0 : 1 }}
                transition={{
                    duration: 0.8,
                    delay: isDoors ? 1.5 : 0,
                    ease: 'easeInOut',
                }}
                className='absolute inset-0 bg-[radial-gradient(circle_at_center,#fbf2e6_0%,#eadbc5_58%,#cdb28f_100%)]'
            />

            <Envelope stage={stage} doorProgress={doorProgress} isDoors={isDoors} isOpen={isOpen} open={() => setStage('opening')} />
        </section>
    );
}
