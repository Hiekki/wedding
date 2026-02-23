import fs from 'fs';
import path from 'path';
import ClientGallery from './ClientGallery';

export default function Gallery() {
    const photosDirectory = path.join(process.cwd(), 'public/gallery');
    const files = fs.readdirSync(photosDirectory);

    const photos = files.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file)).map((file) => `/gallery/${file}`);

    return <ClientGallery photos={photos} />;
}
