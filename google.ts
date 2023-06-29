import { google } from 'googleapis';

// Replace with your service account credentials
const credentials = {
    client_email: '',
    private_key: '',
};

const spreadSheetId = '';

export const writeWordCountToSheet = async (entries) => {
    try {
        // const credentials = await google.auth.getApplicationDefault()
        const authClient = await google.auth.getClient({credentials, scopes: ['https://www.googleapis.com/auth/spreadsheets']})

        const sheets = google.sheets({ version: 'v4', auth: authClient });

        //Clear google sheets
        await sheets.spreadsheets.values.update({
            spreadsheetId: spreadSheetId,
            range: `Sheet1!A$1`, // Replace with your sheet and range
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [],
            },
        });

        // write to google sheets
        await sheets.spreadsheets.values.update({
            spreadsheetId: spreadSheetId,
            range: `Sheet1!A$1`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: entries,
            },
        });

    } catch (error) {
        console.error('Error:', error);
    }
}
