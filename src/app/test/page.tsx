import { Metadata } from 'next';
import WeddingIntro from '@/components/Intro/Intro';

export const metadata: Metadata = {
    title: 'Haley and Kevin | Invitation',
};

export default function Invite() {
    return (
        <>
            <WeddingIntro />

            <section className='relative isolate w-full overflow-hidden bg-cream'>
                <div
                    className='fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat'
                    style={{
                        backgroundImage: "url('/images/floral.png')",
                    }}
                    aria-hidden='true'
                />

                <div className='relative z-10 px-6 py-20 lg:py-24'>
                    <div className='mx-auto max-w-6xl rounded-3xl bg-cream/70 px-8 py-10 text-sage shadow-lg backdrop-blur-sm lg:px-14 lg:py-12'>
                        <h1 className='text-center text-5xl font-alex lg:text-6xl'>{`You've been invited!`}</h1>
                        <p className='text-center text-2xl pt-8'>{`Yuh cuh, bring yo ass on down to the hitchin' place and be apart of dis shit, ya heard??`}</p>
                    </div>
                </div>
            </section>
        </>
    );
}
