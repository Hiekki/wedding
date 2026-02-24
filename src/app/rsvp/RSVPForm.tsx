'use client';

import { useEffect, useMemo, useState } from 'react';

type Attending = 'yes' | 'no' | '';
type ExtraPerson = { first: string; last: string };

function ThankYouModal({ open, attending, onDone }: { open: boolean; attending: Attending; onDone: () => void }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDone();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onDone]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    if (!open) return null;

    const title = attending === 'no' ? 'Thank you for letting us know' : 'Thank you for your RSVP!';
    const message =
        attending === 'no'
            ? 'We’ll miss you, but we truly appreciate you taking a moment to RSVP.'
            : 'We’re so excited to celebrate with you. We can’t wait to see you there!';

    return (
        <div className='fixed inset-0 z-50 flex items-end sm:items-center justify-center'>
            <button type='button' onClick={onDone} className='absolute inset-0 bg-black/50' aria-label='Close' />

            <div className='relative w-full sm:max-w-lg mx-auto rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 border-2 border-sage/40 bg-linear-to-br from-cream to-sage/10 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.15)]'>
                <div className='space-y-3'>
                    <h3 className='text-2xl sm:text-3xl font-serif text-sage'>{title}</h3>
                    <p className='text-sage/90 leading-relaxed'>{message}</p>
                    <p className='text-sage/70 text-sm'>If you need to update anything, you can submit the form again.</p>
                </div>

                <div className='mt-6'>
                    <button
                        type='button'
                        onClick={onDone}
                        className='w-full inline-flex items-center justify-center gap-2 bg-sage text-cream hover:bg-rose hover:text-cream border-sage hover:border-rose border-2 py-3 rounded-xl transition font-medium'
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function RSVPForm() {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [phone, setPhone] = useState('');
    const [attending, setAttending] = useState<Attending>('');
    const [extras, setExtras] = useState<ExtraPerson[]>([]);
    const [comments, setComments] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [submittedAttending, setSubmittedAttending] = useState<Attending>('');
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [honey, setHoney] = useState('');

    const canAddMore = extras.length < 6 && attending !== 'no';

    const addExtra = () => {
        if (!canAddMore) return;
        setExtras((p) => [...p, { first: '', last: '' }]);
    };

    const updateExtra = (idx: number, key: keyof ExtraPerson, value: string) => {
        setExtras((prev) => prev.map((p, i) => (i === idx ? { ...p, [key]: value } : p)));
    };

    const removeExtra = (idx: number) => {
        setExtras((prev) => prev.filter((_, i) => i !== idx));
    };

    const trimmedExtras = useMemo(
        () => extras.map((p) => ({ first: p.first.trim(), last: p.last.trim() })).filter((p) => p.first || p.last),
        [extras],
    );

    const resetForm = () => {
        setFirst('');
        setLast('');
        setPhone('');
        setAttending('');
        setExtras([]);
        setComments('');
        setHoney('');
        setSubmitError(null);
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(null);

        try {
            const res = await fetch('/api/rsvp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(process.env.NEXT_PUBLIC_RSVP_API_KEY ? { 'x-rsvp-key': process.env.NEXT_PUBLIC_RSVP_API_KEY } : {}),
                },
                body: JSON.stringify({
                    primary: { first, last, phone },
                    attending,
                    extras: trimmedExtras,
                    comments,
                    honey,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok || !data?.ok) {
                throw new Error(data?.error || 'Something went wrong.');
            }

            setSubmittedAttending(attending);
            setModalOpen(true);
            resetForm();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setSubmitError(err?.message || 'Failed to submit.');
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass =
        'w-full px-4 py-3 rounded-lg bg-cream border-2 border-sage/40 focus:border-rose focus:ring-rose/30 focus:outline-none transition';

    return (
        <>
            <form
                onSubmit={onSubmit}
                className='space-y-6 bg-linear-to-br from-cream to-sage/10 backdrop-blur-md p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-2 border-sage/30'
            >
                <div className='hidden'>
                    <label>Do not fill</label>
                    <input value={honey} onChange={(e) => setHoney(e.target.value)} />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm mb-2 text-sage'>First Name</label>
                        <input
                            value={first}
                            onChange={(e) => setFirst(e.target.value)}
                            required
                            className={inputClass}
                            placeholder='John'
                        />
                    </div>

                    <div>
                        <label className='block text-sm mb-2 text-sage'>Last Name</label>
                        <input value={last} onChange={(e) => setLast(e.target.value)} required className={inputClass} placeholder='Doe' />
                    </div>
                </div>

                <div>
                    <label className='block text-sm mb-2 text-sage'>Phone Number</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        inputMode='tel'
                        placeholder='(555) 123-4567'
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className='block text-sm mb-2 text-sage'>Will you attend?</label>
                    <select value={attending} onChange={(e) => setAttending(e.target.value as Attending)} required className={inputClass}>
                        <option value=''>Select an option</option>
                        <option value='yes'>Joyfully Accept</option>
                        <option value='no'>Regretfully Decline</option>
                    </select>
                </div>

                <div className='space-y-3'>
                    <p className='items-center text-center text-sm text-sage/70 my-8 font-bold'>
                        As we are keeping our wedding intimate, we kindly ask that only those listed on the invitation attend.
                    </p>
                    <div className='flex items-start justify-between gap-4'>
                        <div>
                            <p className='font-medium text-sage'>Registering Someone Else?</p>
                            <p className='text-sm text-sage/70'>Add up to 6 additional names</p>
                        </div>

                        <button
                            type='button'
                            onClick={addExtra}
                            disabled={!canAddMore}
                            className='inline-flex items-center gap-2 bg-sage text-cream hover:bg-rose hover:text-cream border-sage hover:border-rose border-2 px-6 py-2 rounded-lg transition disabled:opacity-50'
                        >
                            + Add
                        </button>
                    </div>

                    {extras.length > 0 && (
                        <div className='space-y-3'>
                            {extras.map((p, idx) => (
                                <div key={idx} className='grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end'>
                                    <div>
                                        <label className='block text-sm mb-2 text-sage'>First Name</label>
                                        <input
                                            value={p.first}
                                            onChange={(e) => updateExtra(idx, 'first', e.target.value)}
                                            className={inputClass}
                                            placeholder='John'
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm mb-2 text-sage'>Last Name</label>
                                        <input
                                            value={p.last}
                                            onChange={(e) => updateExtra(idx, 'last', e.target.value)}
                                            className={inputClass}
                                            placeholder='Doe'
                                        />
                                    </div>

                                    <button
                                        type='button'
                                        onClick={() => removeExtra(idx)}
                                        className='inline-flex items-center justify-center bg-cream text-sage hover:bg-rose hover:text-cream border-sage hover:border-rose border-2 px-6 py-3 rounded-lg transition'
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <label className='block text-sm mb-2 text-sage'>Comments, Questions, or Accessibility Needs</label>
                    <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        rows={4}
                        className={inputClass}
                        placeholder='Please let us know if you have any accessibility needs or accommodations we should be aware of.'
                    />
                </div>

                {submitError && <p className='text-sm text-rose'>{submitError}</p>}

                <button
                    type='submit'
                    disabled={submitting}
                    className='w-full inline-flex items-center justify-center gap-2 bg-sage text-cream hover:bg-rose hover:text-cream border-sage hover:border-rose border-2 py-3 rounded-xl transition font-medium disabled:opacity-60'
                >
                    {submitting ? 'Submitting...' : 'Send RSVP'}
                </button>
            </form>

            <ThankYouModal open={modalOpen} attending={submittedAttending} onDone={() => setModalOpen(false)} />
        </>
    );
}
