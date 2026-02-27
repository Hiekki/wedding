'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/', label: 'Home' },
    { href: '/rsvp', label: 'RSVP' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/traveling', label: 'Traveling' },
    { href: '/registry', label: 'Gift Registry' },
    { href: '/faqs', label: 'FAQs' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className='fixed top-0 z-50 w-full h-24 lg:h-36 bg-cream/95 backdrop-blur border-b border-sage/15 shadow-sm'>
            <div className='h-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-sage'>
                <div className='font-alex text-3xl lg:text-5xl leading-none'>Haley &amp; Kevin</div>

                <div className='hidden lg:flex mt-6 gap-x-10 text-xl'>
                    {links.map((l) => {
                        const active = pathname === l.href;
                        return (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={[
                                    'transition hover:text-rose',
                                    active ? 'text-rose underline underline-offset-8' : 'text-sage',
                                ].join(' ')}
                            >
                                {l.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
