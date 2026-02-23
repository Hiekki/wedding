import Link from 'next/link';

export default function Navbar() {
    return (
        <div className='w-full'>
            <div className='flex items-center justify-center w-screen'>
                <nav className='flex fixed top-0 z-50 w-full h-24 lg:h-36 bg-cream'>
                    <div className='text-sage flex flex-col py-4 items-center justify-between w-full mx-12'>
                        <div className='flex font-alex text-3xl lg:text-5xl mt-6'>Haley & Kevin</div>
                        <div className='hidden lg:flex pl-8 text-xl'>
                            <Link className='' href='/'>
                                Home
                            </Link>
                            <Link className='ml-8' href='/rsvp'>
                                RSVP
                            </Link>
                            <Link className='ml-8' href='/photos'>
                                Photos
                            </Link>
                            <Link className='ml-8' href='/traveling'>
                                Traveling
                            </Link>
                            <Link className='ml-8' href='/registry'>
                                Gift Registry
                            </Link>
                            <Link className='ml-8' href='/faqs'>
                                FAQs
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
