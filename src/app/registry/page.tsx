'use client';
import { useState } from 'react';
import Link from 'next/link';
import BorderFrame from '@/components/BorderFrame';
import { Copy, ExternalLink, Gift, HeartHandshake } from 'lucide-react';

const CASH_TAG = '$hiekki';
const CASH_APP_LINK = `https://cash.app/${CASH_TAG.replace('$', '')}`;

export default function Registry() {
    const [copied, setCopied] = useState(false);
    const [comingSoonAmazon, setComingSoonAmazon] = useState(false);
    const [comingSoonTarget, setComingSoonTarget] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(CASH_TAG);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {}
    }

    async function handleComingSoonAmazon() {
        try {
            setComingSoonAmazon(true);
            setTimeout(() => setComingSoonAmazon(false), 1500);
        } catch {}
    }

    async function handleComingSoonTarget() {
        try {
            setComingSoonTarget(true);
            setTimeout(() => setComingSoonTarget(false), 1500);
        } catch {}
    }

    return (
        <section className='relative min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-9rem)] w-full overflow-hidden'>
            <BorderFrame />

            <div className='relative z-10 w-full max-w-5xl mx-auto px-6 py-16 lg:py-20 text-sage'>
                <div className='text-center'>
                    <h1 className='text-5xl font-alex mb-4'>Our Registry</h1>
                    <p className='text-sage/70 text-md lg:text-lg tracking-wide max-w-lg lg:max-w-3xl mx-auto font-open'>
                        Your presence is the greatest gift we could ask for. If you would like to bless us with something extra, we’ve set
                        up a honeymoon fund and a traditional registry.
                    </p>
                    <div className='w-24 h-0.5 bg-sage/40 mt-6 mx-auto' />
                </div>

                <div className=''>
                    <div className='flex flex-col items-center text-center'>
                        <p className='mt-3 text-sage/70 font-open max-w-lg lg:max-w-3xl'>
                            We’ve carefully selected a few items to help us start this next chapter together. If you’d like to bless us with
                            a gift, you can find our registries below.
                        </p>
                    </div>

                    <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div className='rounded-2xl border border-sage/15 bg-cream/60 backdrop-blur-sm shadow-sm px-6 py-6 text-center'>
                            <div className='mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10 border border-sage/15'>
                                <Gift size={18} className='text-sage' />
                            </div>

                            <h3 className='text-2xl font-open'>Amazon</h3>

                            <p className='mt-2 text-sage/70 font-open'>Selected essentials for our home.</p>

                            <Link
                                href='#'
                                // href='https://amazon.com/your-registry-link'
                                //target='_blank'
                                onClick={handleComingSoonAmazon}
                                rel='noopener noreferrer'
                                className='mt-5 inline-flex items-center justify-center rounded-full bg-sage px-6 py-2.5 text-cream font-open text-sm hover:bg-rose transition'
                            >
                                {comingSoonAmazon ? 'Coming soon..' : `View Amazon Registry`}
                            </Link>
                        </div>

                        <div className='rounded-2xl border border-sage/15 bg-cream/60 backdrop-blur-sm shadow-sm px-6 py-6 text-center'>
                            <div className='mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage/10 border border-sage/15'>
                                <Gift size={18} className='text-sage' />
                            </div>

                            <h3 className='text-2xl font-open'>Target</h3>

                            <p className='mt-2 text-sage/70 font-open'>Thoughtfully chosen pieces for this next chapter.</p>

                            <Link
                                href='#'
                                // href='https://target.com/your-registry-link'
                                //target='_blank'
                                onClick={handleComingSoonTarget}
                                rel='noopener noreferrer'
                                className='mt-5 inline-flex items-center justify-center rounded-full bg-sage px-6 py-2.5 text-cream font-open text-sm hover:bg-rose transition'
                            >
                                {comingSoonTarget ? 'Coming soon..' : `View Target Registry`}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='mt-8 lg:max-w-3xl mx-auto rounded-2xl border border-rose/20 bg-cream/70 backdrop-blur-sm shadow-sm px-6 lg:px-8 py-8'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='inline-flex items-center justify-center gap-3 rounded-full border border-rose/20 bg-rose/10 px-4 py-1.5'>
                            <HeartHandshake size={16} className='text-rose' />
                            <span className='font-open text-sage text-base'>Honeymoon Fund</span>
                        </div>

                        <h2 className='mt-4 text-4xl lg:text-5xl font-alex text-sage'>Help us make memories</h2>

                        <p className='mt-3 text-sage/80 font-open max-w-xl text-sm lg:text-md'>
                            If you’d like to contribute to our honeymoon, you can send a gift through Cash App. Please include your name in
                            the note so we can thank you properly.
                        </p>

                        <div className='mt-6 flex flex-col lg:flex-row items-center justify-center gap-3 w-full'>
                            <button
                                onClick={handleCopy}
                                className='inline-flex items-center justify-center gap-2 rounded-full border border-sage/20 bg-cream px-5 py-2.5 text-sm text-sage hover:bg-rose hover:text-cream transition w-full lg:w-auto'
                            >
                                <Copy size={16} />
                                {copied ? 'Copied!' : `Copy ${CASH_TAG}`}
                            </button>

                            <Link
                                href={CASH_APP_LINK}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center justify-center gap-2 rounded-full border border-sage/20 bg-sage px-5 py-2.5 text-sm text-cream hover:bg-rose transition w-full lg:w-auto'
                            >
                                <ExternalLink size={16} />
                                Open Cash App
                            </Link>
                        </div>

                        <p className='mt-4 text-sage/60 text-xs font-open break-all'>{CASH_APP_LINK}</p>
                    </div>
                </div>

                <div className='mt-14 text-center pb-12 lg:pb-0'>
                    <div className='w-24 h-0.5 bg-sage/30 mx-auto mb-6' />
                    <p className='text-sage/60 font-open text-sm'>Thank you for celebrating with us — we truly can’t wait to see you!</p>
                </div>
            </div>
        </section>
    );
}
