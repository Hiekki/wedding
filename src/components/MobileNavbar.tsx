'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Home, Mail, BookImage, Plane, Gift, MessageCircleQuestionMark, CalendarCheck2 } from 'lucide-react';

const items = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/rsvp', icon: Mail, label: 'RSVP' },
    { href: '/schedule', icon: CalendarCheck2, label: 'Schedule' },
    { href: '/gallery', icon: BookImage, label: 'Gallery' },
    { href: '/traveling', icon: Plane, label: 'Travel' },
    { href: '/registry', icon: Gift, label: 'Registry' },
    { href: '/faqs', icon: MessageCircleQuestionMark, label: 'FAQs' },
];

export default function MobileNavbar() {
    const pathname = usePathname();
    return (
        <div className='lg:hidden'>
            <nav className='fixed bottom-5 left-1/2 z-50 w-[min(36rem,calc(100%-2rem))] -translate-x-1/2'>
                <div className='rounded-full bg-cream/75 backdrop-blur-xl border border-sage/20 shadow-lg'>
                    <div className='px-3 py-2 flex items-center justify-between'>
                        {items.map(({ href, icon: Icon, label }) => {
                            const active = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    aria-label={label}
                                    className={[
                                        'flex items-center justify-center rounded-full transition',
                                        'h-11 w-11',
                                        active ? 'bg-rose/25 text-rose' : 'text-sage/80 hover:text-rose',
                                    ].join(' ')}
                                >
                                    <Icon size={24} />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </div>
    );
}
