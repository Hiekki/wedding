import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Haley and Kevin | Traveling',
};

import { BookOpen, MapPin, Hotel } from 'lucide-react';

const hotels = [
    {
        name: 'DoubleTree by Hilton',
        address: '211 Mockingbird Lane',
        city: 'Johnson City',
        state: 'Tennessee',
        zip: '37615',
        booking: 'https://www.hilton.com/en/hotels/tridtdt-doubletree-johnson-city/',
        directions: 'https://maps.app.goo.gl/kW7uDxVnEBghoGvd7',
    },
    {
        name: 'WoodSpring Suites',
        address: '135 Pinnacle Drive',
        city: 'Johnson City',
        state: 'Tennessee',
        zip: '37615',
        booking:
            'https://www.woodspring.com/extended-stay-hotels/locations/tennessee/johnson-city/woodspring-suites-johnson-city?mc=llgoxxpx',
        directions: 'https://maps.app.goo.gl/QGJh8GTNkYWjmvbS9',
    },
    {
        name: 'MeadowView Conference Resort',
        address: '1901 Meadowview Parkway',
        city: 'Kingsport',
        state: 'Tennessee',
        zip: '37660',
        booking:
            'https://www.marriott.com/en-us/hotels/tricc-meadowview-conference-resort-and-convention-center/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0',
        directions: 'https://maps.app.goo.gl/xXJP7A5mF7Qeyo6M6',
    },
    {
        name: 'Quality Inn',
        address: '3004 Bays Meadow Place',
        city: 'Kingsport',
        state: 'Tennessee',
        zip: '37660',
        booking: 'https://www.choicehotels.com/tennessee/kingsport/quality-inn-hotels/tn676?mc=llgoxxpx',
        directions: 'https://maps.app.goo.gl/fBpZY1cudjxtdWhd9',
    },
];

export default function Traveling() {
    return (
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
                    <h1 className='text-center text-5xl font-alex lg:text-6xl'>Traveling</h1>

                    <div className='mt-16 grid w-full grid-cols-1 gap-16 text-center lg:grid-cols-2'>
                        {hotels.map((hotel) => (
                            <div key={hotel.name} className='w-full max-w-2xl mx-auto'>
                                <h2 className='text-4xl font-alex lg:text-5xl'>{hotel.name}</h2>

                                <p className='mt-2 text-lg font-open'>{hotel.city}</p>

                                <p className='mt-2 text-lg font-open opacity-90 lg:text-xl'>
                                    {hotel.address}
                                    <br />
                                    {hotel.city}, {hotel.state} {hotel.zip}
                                </p>

                                <div className='mt-6 flex flex-wrap justify-center gap-4'>
                                    <Link
                                        href={hotel.booking}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='inline-flex items-center gap-2 rounded-lg border-2 border-sage bg-sage px-6 py-2 text-cream transition hover:bg-rose'
                                    >
                                        <BookOpen size={15} />
                                        Book
                                    </Link>

                                    <Link
                                        href={hotel.directions}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='inline-flex items-center gap-2 rounded-lg border-2 border-sage bg-cream px-6 py-2 text-sage transition hover:bg-rose hover:text-cream'
                                    >
                                        <MapPin size={15} />
                                        Directions
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-12 flex items-center justify-center text-center'>
                        <Link
                            href='https://www.google.com/maps/search/gray+tn+hotels/@36.4066988,-82.5485025,79331m/data=!3m2!1e3!4b1?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-2 rounded-lg border-2 border-sage bg-sage px-6 py-2 text-cream transition hover:bg-rose hover:text-cream'
                        >
                            <Hotel size={15} />
                            View More Hotels
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
