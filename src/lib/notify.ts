import { Resend } from 'resend';

export type RSVPBody = {
    primary: { first: string; last: string; phone: string };
    attending: 'yes' | 'no';
    extras: { first: string; last: string }[];
    comments?: string;
};

function formatExtras(extras: { first: string; last: string }[]) {
    if (!extras?.length) return 'None';
    return extras.map((p) => `${p.first} ${p.last}`.trim()).join(', ');
}

export async function sendDiscordWebhook(payload: RSVPBody) {
    const url = process.env.DISCORD_WEBHOOK_URL;
    if (!url) return;

    const attendingText = payload.attending === 'yes' ? '✅ Joyfully Accepts' : '❌ Regretfully Declines';

    const content =
        `**New RSVP**\n` +
        `**Name:** ${payload.primary.first} ${payload.primary.last}\n` +
        `**Phone:** ${payload.primary.phone}\n` +
        `**Attending:** ${attendingText}\n` +
        `**Extra People:** ${formatExtras(payload.extras)}\n` +
        `**Comments:** ${payload.comments?.trim() ? payload.comments.trim() : 'None'}`;

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
    });
}

export async function sendRSVPEmail(payload: RSVPBody) {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.RSVP_EMAIL_TO;
    const from = process.env.RSVP_EMAIL_FROM;

    if (!apiKey || !to || !from) return;

    const resend = new Resend(apiKey);

    const attendingText = payload.attending === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines';

    const subject = `New RSVP: ${payload.primary.first} ${payload.primary.last} (${attendingText})`;

    const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>New RSVP</h2>
      <p><b>Name:</b> ${payload.primary.first} ${payload.primary.last}</p>
      <p><b>Phone:</b> ${payload.primary.phone}</p>
      <p><b>Attending:</b> ${attendingText}</p>
      <p><b>Extra People:</b> ${formatExtras(payload.extras)}</p>
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
