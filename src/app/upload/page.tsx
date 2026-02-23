'use client';

import { useState } from 'react';

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);

    async function upload() {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        console.log(data.secure_url);
        alert('Uploaded!');
    }

    return (
        <div className='p-20'>
            <input type='file' onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <button onClick={upload} className='ml-4 px-4 py-2 bg-sage text-white rounded'>
                Upload
            </button>
        </div>
    );
}
