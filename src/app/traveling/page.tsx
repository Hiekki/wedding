import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Haley and Kevin | Traveling',
};

import { BookOpen, MapPin, Hotel } from 'lucide-react';
import BorderFrame from '@/components/BorderFrame';

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
        <section className='relative isolate min-h-screen w-full'>
            <BorderFrame />

            <div className='relative z-10 flex flex-col items-center px-6 py-24 text-center'>
                <div className='w-full max-w-2xl lg:max-w-4xl text-sage mt-14'>
                    {hotels.map((hotel) => (
                        <div key={hotel.name} className='mt-12'>
                            <h1 className='text-4xl lg:text-5xl font-alex'>{hotel.name}</h1>

                            <p className='mt-1 text-lg font-open'>{hotel.city}</p>

                            <p className='mt-1 text-lg lg:text-xl font-open opacity-90'>
                                {hotel.address}
                                <br />
                                {hotel.city}, {hotel.state} {hotel.zip}
                            </p>
                            <div className='mt-2'>
                                <Link
                                    href={hotel.booking}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-flex items-center gap-2 bg-sage text-cream hover:bg-rose hover:text-cream border-sage border-2 p-1 px-6 rounded-lg transition'
                                >
                                    <BookOpen size={15} /> Book
                                </Link>
                                <Link
                                    href={hotel.directions}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='ml-4 inline-flex items-center gap-2 bg-cream text-sage hover:text-cream hover:bg-rose border-2 border-sage p-1 px-6 rounded-lg transition'
                                >
                                    <MapPin size={15} />
                                    Directions
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='mt-18'>
                    <Link
                        href='https://www.google.com/maps/search/gray+tn+hotels/@36.4066988,-82.5485025,79331m/data=!3m2!1e3!4b1?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 bg-sage text-cream hover:bg-rose hover:text-cream border-sage border-2 p-1 px-6 rounded-lg transition'
                    >
                        <Hotel size={15} /> View More Hotels
                    </Link>
                </div>
            </div>
        </section>
    );
}
