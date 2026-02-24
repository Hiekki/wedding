import { google } from 'googleapis';

function getAuth() {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
        throw new Error('Missing Google Sheets credentials in env.');
    }

    return new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
}

export async function appendRSVPRow(row: (string | number)[]) {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    if (!spreadsheetId) throw new Error('Missing GOOGLE_SHEETS_ID.');

    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'RSVPs!A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [row],
        },
    });
}
