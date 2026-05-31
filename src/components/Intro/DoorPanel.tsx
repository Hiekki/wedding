type Props = {
    side: 'left' | 'right';
};

export default function DoorPanel({ side }: Props) {
    const isLeft = side === 'left';

    return (
        <div className='absolute inset-0 overflow-hidden bg-[#efe3cf]'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45),rgba(158,156,109,0.12))]' />
            <div className='absolute inset-0 opacity-[0.08] bg-[linear-gradient(35deg,rgba(158,156,109,0.65)_0.5px,transparent_0.5px),linear-gradient(125deg,rgba(255,255,255,0.8)_0.5px,transparent_0.5px)] bg-size-[26px_26px]' />

            <div
                className={`absolute inset-4 rounded-t-[160px] border border-[#9E9C6D]/45 sm:inset-8 sm:rounded-t-[240px] ${
                    isLeft ? 'rounded-br-none' : 'rounded-bl-none'
                }`}
            />

            <div
                className={`absolute inset-8 rounded-t-[140px] border border-[#9E9C6D]/25 sm:inset-14 sm:rounded-t-[220px] ${
                    isLeft ? 'rounded-br-none' : 'rounded-bl-none'
                }`}
            />

            <div
                className={`absolute top-0 h-full w-10 ${
                    isLeft ? 'right-0 bg-linear-to-l from-black/15 to-transparent' : 'left-0 bg-linear-to-r from-black/15 to-transparent'
                }`}
            />

            <div
                className={`absolute top-[12%] h-[72%] w-20 border-[#9E9C6D]/35 ${
                    isLeft ? 'right-6 rounded-r-full border-r sm:right-12' : 'left-6 rounded-l-full border-l sm:left-12'
                }`}
            />

            <div
                className={`absolute top-[22%] h-4 w-4 rounded-full bg-[#9E9C6D]/45 shadow-sm ${
                    isLeft ? 'right-14 sm:right-24' : 'left-14 sm:left-24'
                }`}
            />
            <div
                className={`absolute top-[34%] h-3 w-3 rounded-full bg-[#9E9C6D]/35 ${
                    isLeft ? 'right-8 sm:right-16' : 'left-8 sm:left-16'
                }`}
            />
            <div
                className={`absolute bottom-[26%] h-5 w-5 rounded-full bg-[#9E9C6D]/30 ${
                    isLeft ? 'right-16 sm:right-28' : 'left-16 sm:left-28'
                }`}
            />

            <div
                className={`absolute top-[29%] h-6 w-3 rotate-45 rounded-full bg-[#9E9C6D]/25 ${
                    isLeft ? 'right-20 sm:right-32' : 'left-20 sm:left-32'
                }`}
            />
            <div
                className={`absolute bottom-[34%] h-5 w-3 -rotate-45 rounded-full bg-[#9E9C6D]/20 ${
                    isLeft ? 'right-10 sm:right-20' : 'left-10 sm:left-20'
                }`}
            />

            <div
                className={`absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-[#f7efd9]/60 bg-[#9E9C6D] shadow-[0_4px_12px_rgba(82,80,58,0.35)] ${
                    isLeft ? 'right-5 sm:right-8' : 'left-5 sm:left-8'
                }`}
            >
                <div className='absolute inset-1 rounded-full border border-[#f7efd9]/35' />
            </div>

            <div className='absolute bottom-10 left-1/2 h-28 w-px -translate-x-1/2 bg-[#9E9C6D]/20 sm:h-36' />
        </div>
    );
}
