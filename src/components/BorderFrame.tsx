import Image from 'next/image';

type BorderFrameProps = {
    mode?: 'fixed' | 'absolute';
};

export default function BorderFrame({ mode = 'fixed' }: BorderFrameProps) {
    const wrapperClass =
        mode === 'fixed'
            ? 'fixed inset-0 z-0 pointer-events-none overflow-hidden'
            : 'absolute inset-0 z-0 pointer-events-none overflow-hidden';

    return (
        <div className={wrapperClass}>
            <Image
                src='/images/border_top.png'
                alt=''
                aria-hidden
                priority
                width={2400}
                height={400}
                className={mode == 'absolute' ? '-translate-y-[30%]' : '' + ' absolute top-10 left-1/2 -translate-x-1/2 w-600 h-auto'}
            />

            <Image
                src='/images/border_bottom.png'
                alt=''
                aria-hidden
                width={2400}
                height={400}
                className='absolute bottom-0 left-1/2 -translate-x-1/2 w-600 h-auto translate-y-[15%] lg:translate-y-[30%]'
            />

            <Image
                src='/images/border_left.png'
                alt=''
                aria-hidden
                priority
                width={500}
                height={2400}
                sizes='(max-width: 768px) 40vw, 22vw'
                className='absolute left-0 top-0 h-full w-auto -translate-x-[45%] lg:-translate-x-[15%]'
            />

            <Image
                src='/images/border_right.png'
                alt=''
                aria-hidden
                priority
                width={500}
                height={2400}
                sizes='(max-width: 768px) 40vw, 22vw'
                className='absolute right-0 top-0 h-full w-auto translate-x-[45%] lg:translate-x-[15%]'
            />
        </div>
    );
}
