'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import InvitationDoors from './Doors';
import { IntroStage } from '../../../types/Intro';

type Props = {
    stage: IntroStage;
    doorProgress: number;
    isOpen: boolean;
    isDoors: boolean;
    open(): void;
};

export default function Envelope({ doorProgress, isOpen, isDoors, open }: Props) {
    return (
        <div className='absolute inset-0 flex items-center justify-center px-3'>
            <motion.div
                animate={{
                    y: isOpen ? 10 : [0, -6, 0],
                    scale: isDoors ? 1 : isOpen ? 1.01 : [1, 1.008, 1],
                    rotate: isOpen ? 0 : [0, -0.3, 0.3, 0],
                }}
                transition={{
                    y: {
                        duration: isOpen ? 1.1 : 5,
                        repeat: isOpen ? 0 : Infinity,
                        ease: 'easeInOut',
                    },
                    scale: {
                        duration: isOpen ? 1.1 : 5,
                        repeat: isOpen ? 0 : Infinity,
                        ease: 'easeInOut',
                    },
                    rotate: {
                        duration: isOpen ? 1.1 : 6,
                        repeat: isOpen ? 0 : Infinity,
                        ease: 'easeInOut',
                    },
                }}
                className='relative aspect-[1.18/1] w-[94vw] max-w-107.5 perspective-[2200px] sm:aspect-[1.55/1] sm:max-w-240'
            >
                <motion.div
                    animate={{
                        opacity: isDoors ? 0 : isOpen ? 0.38 : [0.24, 0.32, 0.24],
                        scaleX: isOpen ? 1.14 : [1, 1.06, 1],
                        scaleY: isOpen ? 1.08 : [1, 1.03, 1],
                    }}
                    transition={{
                        duration: isOpen ? 1.15 : 5,
                        repeat: isOpen ? 0 : Infinity,
                        ease: 'easeInOut',
                    }}
                    className='absolute -bottom-10 left-1/2 h-20 w-[78%] -translate-x-1/2 rounded-full bg-black blur-[42px] sm:-bottom-14 sm:h-28 sm:blur-[48px]'
                />

                <motion.div
                    animate={{ opacity: isDoors ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    className='absolute bottom-0 z-10 h-[56%] w-full overflow-hidden rounded-[26px] border border-[#b99f78] bg-[#ddc9a8] shadow-[0_30px_70px_rgba(82,80,58,0.34)] sm:h-[60%] sm:rounded-[34px]'
                >
                    <div className='absolute inset-0 bg-[linear-gradient(180deg,#eadbc0_0%,#ddc7a4_55%,#c9ae86_100%)]' />
                    <div className='absolute left-[4%] top-0 h-[32%] w-[92%] rounded-b-[50%] bg-[#5f452a]/30 blur-md' />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        rotateX: isOpen ? 0 : -88,
                        y: isOpen ? 1 : 20,
                        opacity: isDoors ? 0 : 1,
                    }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className='absolute left-[1%] bottom-[54.8%] z-20 h-[52%] w-[98%] origin-bottom transform-3d sm:bottom-[58.8%] sm:h-[58%]'
                >
                    <div
                        className='relative h-full w-full overflow-hidden bg-[#c7ab80] shadow-[0_16px_38px_rgba(82,80,58,0.24)]'
                        style={{ clipPath: 'polygon(1% 100%, 50% 0%, 99% 100%)' }}
                    >
                        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(82,80,58,0.13))]' />
                    </div>
                </motion.div>

                <motion.div
                    data-doors={isDoors}
                    initial={false}
                    animate={{
                        left: '50%',
                        top: isDoors ? '50%' : '26%',
                        x: '-50%',
                        y: isDoors ? '-50%' : isOpen ? '-78%' : '42%',
                        width: isDoors ? '100vw' : undefined,
                        height: isDoors ? '100vh' : undefined,
                        borderRadius: isDoors ? '0px' : undefined,
                        opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                        top: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
                        y: {
                            duration: isDoors ? 1.15 : 1.5,
                            ease: [0.22, 1, 0.36, 1],
                            delay: isOpen && !isDoors ? 0.34 : 0,
                        },
                        width: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
                        height: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
                        borderRadius: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
                        opacity: {
                            duration: 1.5,
                            delay: isOpen ? 0.41 : 0,
                        },
                    }}
                    className='absolute z-30 h-[72%] w-[68%] overflow-hidden rounded-[18px] border border-[#d7c9ad] bg-[#fbf7ee] shadow-[0_24px_55px_rgba(82,80,58,0.25)] data-[doors=true]:border-none data-[doors=true]:bg-transparent data-[doors=true]:shadow-none sm:h-[78%] sm:w-[58%] sm:rounded-[22px]'
                >
                    <InvitationDoors progress={isDoors ? doorProgress : 0} showScrollText={isDoors} />
                </motion.div>

                <motion.div
                    animate={{ y: isOpen ? 4 : 0, opacity: isDoors ? 0 : 1 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className='absolute bottom-0 z-40 h-[56%] w-full overflow-hidden rounded-[26px] sm:h-[60%] sm:rounded-[34px]'
                >
                    <div
                        className='absolute inset-0 bg-[#ead8b7] shadow-[inset_22px_0_34px_rgba(255,255,255,0.28)]'
                        style={{ clipPath: 'polygon(0 0, 49% 50%, 0 100%)' }}
                    />
                </motion.div>

                <motion.div
                    animate={{ y: isOpen ? 4 : 0, opacity: isDoors ? 0 : 1 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className='absolute bottom-0 z-50 h-[56%] w-full overflow-hidden rounded-[26px] sm:h-[60%] sm:rounded-[34px]'
                >
                    <div
                        className='absolute inset-0 bg-[#d6bf9b] shadow-[inset_-18px_0_30px_rgba(82,80,58,0.1)]'
                        style={{ clipPath: 'polygon(100% 0, 51% 50%, 100% 100%)' }}
                    />
                </motion.div>

                <motion.div
                    animate={{ y: isOpen ? 4 : 0, opacity: isDoors ? 0 : 1 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className='absolute bottom-0 z-60 h-[56%] w-full overflow-hidden rounded-[26px] border border-[#b99f78]/70 shadow-[0_30px_70px_rgba(82,80,58,0.22)] sm:h-[60%] sm:rounded-[34px]'
                >
                    <div className='absolute inset-0 bg-[#f0e0c4]' style={{ clipPath: 'polygon(0 100%, 50% 39%, 100% 100%)' }} />

                    <motion.div
                        animate={{
                            opacity: isOpen ? 0 : 1,
                            y: isOpen ? -8 : 0,
                        }}
                        transition={{
                            duration: 0.32,
                            delay: isOpen ? 0.08 : 0,
                        }}
                        className='absolute left-0 top-0 z-70 h-[64%] w-full overflow-hidden bg-[#d2bb94]'
                        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                    />
                </motion.div>

                <motion.button
                    onClick={open}
                    whileHover={!isOpen ? { scale: 1.1, rotate: 3 } : undefined}
                    whileTap={!isOpen ? { scale: 0.92 } : undefined}
                    animate={{
                        scale: isOpen ? 0.55 : [1, 1.045, 1],
                        opacity: isOpen ? 0 : 1,
                        rotate: isOpen ? 18 : [0, 1.5, 0],
                        y: isOpen ? -18 : [0, -3, 0],
                    }}
                    transition={{
                        scale: {
                            duration: isOpen ? 0.55 : 3.4,
                            repeat: isOpen ? 0 : Infinity,
                            ease: 'easeInOut',
                        },
                        rotate: {
                            duration: isOpen ? 0.55 : 3.4,
                            repeat: isOpen ? 0 : Infinity,
                            ease: 'easeInOut',
                        },
                        y: {
                            duration: isOpen ? 0.55 : 3.4,
                            repeat: isOpen ? 0 : Infinity,
                            ease: 'easeInOut',
                        },
                        opacity: {
                            duration: 0.5,
                        },
                    }}
                    className='absolute left-1/2 top-[74%] z-90 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent p-0 sm:h-40 sm:w-40'
                    aria-label='Open invitation'
                >
                    <Image src='/images/HK_logo_wax.png' alt='Wax Seal' fill priority className='object-contain' />
                </motion.button>
            </motion.div>
        </div>
    );
}
