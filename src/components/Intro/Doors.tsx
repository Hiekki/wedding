'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

type Props = {
    progress: number;
    showScrollText: boolean;
};

export default function InvitationDoors({ progress, showScrollText }: Props) {
    return (
        <div className='fixed inset-0 z-999 overflow-hidden pointer-events-none'>
            <motion.div
                animate={{
                    x: `${progress * -100}%`,
                }}
                transition={{
                    type: 'tween',
                    ease: 'easeOut',
                }}
                className='absolute left-0 top-0 h-full w-1/2'
            >
                <Image src='/images/door_left.png' alt='' fill priority className='object-cover object-[90%_center] sm:object-center' />
            </motion.div>

            <motion.div
                animate={{
                    x: `${progress * 100}%`,
                }}
                transition={{
                    type: 'tween',
                    ease: 'easeOut',
                }}
                className='absolute right-0 top-0 h-full w-1/2'
            >
                <Image src='/images/door_right.png' alt='' fill priority className='object-cover object-[10%_center] sm:object-center' />
            </motion.div>

            {showScrollText && (
                <motion.div
                    animate={{
                        opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                    className='absolute bottom-10 left-1/2 -translate-x-1/2 text-sm uppercase tracking-[0.35em] text-[#f7f0df]'
                >
                    Scroll To Enter
                </motion.div>
            )}
        </div>
    );
}
