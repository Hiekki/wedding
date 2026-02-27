import type { Metadata, Viewport } from 'next';
import { Alex_Brush, Open_Sans } from 'next/font/google';
import './globals.css';

import MobileNavbar from '@/components/MobileNavbar';
import Navbar from '@/components/Navbar';

const alexBrush = Alex_Brush({
    variable: '--font-alex-brush',
    subsets: ['latin'],
    weight: ['400'],
});

const openSans = Open_Sans({
    variable: '--font-open-sans',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://haleyandkevin.info'),
    title: 'Haley and Kevin | Home',
    description:
        'Welcome to Haley & Kevin’s wedding website! We are so excited to celebrate this next chapter of our lives with the people we love most. Here you’ll find everything you need for our big day — event details, the schedule, travel information, hotel recommendations, and a place to RSVP. Thank you for taking the time to visit and for being part of our story. We truly cannot wait to celebrate with you!',
    keywords: ['hiekki', 'kevin', 'abernathy', 'kevin abernathy', 'haley', 'mcpherson', 'haley mcpherson', 'haley abernathy', 'wedding'],
    authors: [{ name: 'Hiekki', url: 'https://hiekki.me' }],
    twitter: {
        images: '/images/outline-white.png',
        card: 'summary',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#906262' },
        { media: '(prefers-color-scheme: dark)', color: '#906262' },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${alexBrush.variable} ${openSans.variable} antialiased`}>
                <Navbar />
                <MobileNavbar />
                <main className='bg-cream text-sage pt-24 lg:pt-36'>{children}</main>
            </body>
        </html>
    );
}
