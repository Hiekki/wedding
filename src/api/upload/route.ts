import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadBuffer(buffer: Buffer, filename: string) {
    return new Promise<any>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder: 'wedding-gallery',
                    public_id: filename.replace(/\.[^/.]+$/, ''), // strip extension
                    overwrite: false,
                    resource_type: 'image',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                },
            )
            .end(buffer);
    });
}

export async function POST(req: Request) {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
        return NextResponse.json({ error: 'No files' }, { status: 400 });
    }

    const uploads = await Promise.all(
        files.map(async (file) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const result = await uploadBuffer(buffer, file.name);
            return {
                name: file.name,
                url: result.secure_url,
                public_id: result.public_id,
            };
        }),
    );

    return NextResponse.json({ uploaded: uploads });
}
