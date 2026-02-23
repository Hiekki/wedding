'use client';

import { useMemo, useState } from 'react';

export default function UploadPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [urls, setUrls] = useState<string[]>([]);

    const totalMB = useMemo(() => (files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(1), [files]);

    async function handleUpload() {
        if (files.length === 0) return;
        setUploading(true);

        const formData = new FormData();
        files.forEach((f) => formData.append('files', f));

        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();

        setUrls(data.uploaded?.map((x: any) => x.url) ?? []);
        setUploading(false);
    }

    return (
        <div className='p-10 mt-48 max-w-2xl mx-auto'>
            <h1 className='text-2xl font-semibold mb-6'>Upload wedding photos</h1>

            <input type='file' multiple accept='image/*' onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />

            <div className='mt-4 text-sm opacity-80'>{files.length ? `${files.length} files • ${totalMB} MB` : 'No files selected'}</div>

            <button
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
                className='mt-6 px-5 py-2 rounded-lg bg-sage text-cream disabled:opacity-50'
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>

            {!!urls.length && (
                <div className='mt-8'>
                    <p className='font-semibold mb-2'>Uploaded URLs (copy these):</p>
                    <textarea readOnly className='w-full h-40 p-3 border rounded-lg' value={JSON.stringify(urls, null, 2)} />
                </div>
            )}
        </div>
    );
}
