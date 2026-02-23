// import Image from 'next/image';
// import fs from 'fs';
// import path from 'path';

export default function Gallery() {
    return <div className='flex min-h-screen items-center justify-center font-alex text-8xl'>Photos</div>;
    // const photosDirectory = path.join(process.cwd(), 'public/gallery');
    // const files = fs.readdirSync(photosDirectory);

    // const photos = files.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file)).map((file) => `/gallery/${file}`);

    // return (
    //     <section className='mx-auto max-w-6xl px-4 py-10'>
    //         <div className='columns-2 gap-4 lg:columns-4'>
    //             {photos.map((src) => (
    //                 <div key={src} className='mb-4 break-inside-avoid'>
    //                     <Image
    //                         src={src}
    //                         alt=''
    //                         width={1000}
    //                         height={1000}
    //                         sizes='(max-width: 1024px) 50vw, 25vw'
    //                         className='w-full h-auto rounded-2xl'
    //                     />
    //                 </div>
    //             ))}
    //         </div>
    //     </section>
    // );
}
