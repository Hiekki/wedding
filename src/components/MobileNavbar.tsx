import Link from 'next/link';

import { Home, Mail, BookImage, Plane, Gift, MessageCircleQuestionMark } from 'lucide-react';

export default function MobileNavbar() {
    return (
        <div className='lg:hidden'>
            <nav className='fixed bottom-8 left-1/2 z-50 h-12 w-[min(36rem,calc(100%-2rem))] -translate-x-1/2 rounded-full bg-sage flex items-center justify-center'>
                <div className='mx-8 flex w-full justify-between text-cream'>
                    <Link href='/' className='flex flex-col items-center gap-1 text-xs'>
                        <Home size={30} />
                    </Link>

                    <Link href='/rsvp' className='flex flex-col items-center gap-1 text-xs'>
                        <Mail size={30} />
                    </Link>

                    <Link href='/photos' className='flex flex-col items-center gap-1 text-xs'>
                        <BookImage size={30} />
                    </Link>

                    <Link href='/traveling' className='flex flex-col items-center gap-1 text-xs'>
                        <Plane size={30} />
                    </Link>

                    <Link href='/registry' className='flex flex-col items-center gap-1 text-xs'>
                        <Gift size={30} />
                    </Link>

                    <Link href='/faqs' className='flex flex-col items-center gap-1 text-xs'>
                        <MessageCircleQuestionMark size={30} />
                    </Link>
                </div>
            </nav>
        </div>
    );
}
