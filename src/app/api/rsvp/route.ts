import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type RSVPBody = {
    primary: { first: string; last: string; phone: string };
    attending: 'yes' | 'no';
    extras: { first: string; last: string }[];
    comments?: string;
    honey?: string;
};

function cleanName(s: string) {
    return (s ?? '').trim().replace(/\s+/g, ' ');
}

function isValidPhone(phone: string) {
    const digits = (phone ?? '').replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
}

function attendingLabel(a: 'yes' | 'no') {
    return a === 'yes' ? '✅ Joyfully Accepts' : '❌ Regretfully Declines';
}

function buildPeopleList(payload: RSVPBody) {
    const extras = Array.isArray(payload.extras) ? payload.extras.slice(0, 6) : [];

    const people = [
        { first: payload.primary.first, last: payload.primary.last },
        ...extras.map((p) => ({ first: cleanName(p.first), last: cleanName(p.last) })),
    ]
        .slice(0, 1 + 6)
        .filter((p) => p.first || p.last);

    return people;
}

async function postDiscord(payload: RSVPBody) {
    const url = process.env.DISCORD_WEBHOOK_URL;
    if (!url) return;

    const status = attendingLabel(payload.attending);
    const people = buildPeopleList(payload);

    const lines: string[] = [];
    lines.push('**📨 New RSVP**');
    lines.push(`**Status:** ${status}`);
    lines.push(`**Total People:** ${people.length}`);
    lines.push('');
    lines.push('**Names:**');
    for (const p of people) {
        const full = `${p.first} ${p.last}`.trim();
        lines.push(`• ${full || '(blank name)'}`);
    }
    lines.push('');
    lines.push(`**Phone:** ${payload.primary.phone}`);
    lines.push(`**Comments:** ${payload.comments?.trim() ? payload.comments.trim() : 'None'}`);

    const content = lines.join('\n');

    const username = process.env.DISCORD_WEBHOOK_USERNAME || 'Wedding RSVP';
    const avatar_url = process.env.DISCORD_WEBHOOK_AVATAR_URL;

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content,
            username,
            ...(avatar_url ? { avatar_url } : {}),
        }),
    });
}

async function sendEmail(payload: RSVPBody) {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.RSVP_EMAIL_TO;
    const from = process.env.RSVP_EMAIL_FROM;
    if (!apiKey || !to || !from) return;

    const resend = new Resend(apiKey);

    const status = attendingLabel(payload.attending);
    const people = buildPeopleList(payload);
    const peopleHtml = people.map((p) => `<li>${`${p.first} ${p.last}`.trim() || '(blank name)'}</li>`).join('');

    const subject = `New RSVP: ${payload.primary.first} ${payload.primary.last} (${payload.attending === 'yes' ? 'Accepts' : 'Declines'})`;

    const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>New RSVP</h2>
      <p><b>Status:</b> ${status}</p>
      <p><b>Total People:</b> ${people.length}</p>
      <p><b>Names:</b></p>
      <ul>${peopleHtml}</ul>
      <p><b>Phone:</b> ${payload.primary.phone}</p>
      <p><b>Comments:</b><br/>${(payload.comments || 'None').replace(/\n/g, '<br/>')}</p>
    </div>
  `;

    await resend.emails.send({
        from,
        to: to
            .split(',')
            .map((x) => x.trim())
            .filter(Boolean),
        subject,
        html,
    });
}

async function writeOnePersonToGoogleForm(input: {
    first: string;
    last: string;
    phone: string;
    attending: 'yes' | 'no';
    comments?: string;
}) {
    const formResponseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScbiIkK2o-ZmXdtjOGUJQ516Q1EqptzXeh3lOB7rEKdMbj38Q/formResponse';

    // ✅ Your confirmed entry IDs
    const ENTRY_FIRST_NAME = 'entry.1148211493';
    const ENTRY_LAST_NAME = 'entry.1686204251';
    const ENTRY_PHONE = 'entry.823871821';
    const ENTRY_ATTENDING = 'entry.702815650';
    const ENTRY_COMMENTS = 'entry.1981635571';

    const attendingText = input.attending === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines';

    const body = new URLSearchParams({
        [ENTRY_FIRST_NAME]: input.first,
        [ENTRY_LAST_NAME]: input.last,
        [ENTRY_PHONE]: input.phone,
        [ENTRY_ATTENDING]: attendingText,
        [ENTRY_COMMENTS]: input.comments?.trim() || '',
    });

    const res = await fetch(formResponseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body,
        redirect: 'manual',
    });

    if (!(res.status === 200 || res.status === 302)) {
        throw new Error(`Google Form submission failed (${res.status})`);
    }
}

export async function POST(req: Request) {
    try {
        const requiredKey = process.env.RSVP_API_KEY;
        if (requiredKey) {
            const got = req.headers.get('x-rsvp-key');
            if (got !== requiredKey) {
                return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
            }
        }

        const body = (await req.json()) as RSVPBody;

        if (body.honey && body.honey.trim().length > 0) {
            return NextResponse.json({ ok: true });
        }

        const primaryFirst = cleanName(body?.primary?.first);
        const primaryLast = cleanName(body?.primary?.last);
        const phone = (body?.primary?.phone ?? '').trim();

        if (!primaryFirst || !primaryLast || !phone || !body?.attending) {
            return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
        }

        if (!isValidPhone(phone)) {
            return NextResponse.json({ ok: false, error: 'Invalid phone number' }, { status: 400 });
        }

        if (body.attending !== 'yes' && body.attending !== 'no') {
            return NextResponse.json({ ok: false, error: 'Invalid attending value' }, { status: 400 });
        }

        const extras = Array.isArray(body.extras) ? body.extras.slice(0, 6) : [];

        const payload: RSVPBody = {
            primary: { first: primaryFirst, last: primaryLast, phone },
            attending: body.attending,
            extras,
            comments: (body.comments ?? '').toString(),
        };

        const people = buildPeopleList(payload);

        for (let i = 0; i < people.length; i++) {
            const person = people[i];

            await writeOnePersonToGoogleForm({
                first: person.first,
                last: person.last,
                phone: payload.primary.phone,
                attending: payload.attending,
                comments: i === 0 ? payload.comments || '' : '',
            });
        }

        await Promise.allSettled([postDiscord(payload), sendEmail(payload)]);

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('RSVP POST error:', err);
        return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
    }
}
