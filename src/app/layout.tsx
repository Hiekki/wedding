import type { Metadata } from 'next';
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
    title: 'Haley & Kevin',
    description: 'Haley and Kevin are getting married in Gray, Tennessee!',
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
                <main className='bg-cream text-sage'>{children}</main>
            </body>
        </html>
    );
}
