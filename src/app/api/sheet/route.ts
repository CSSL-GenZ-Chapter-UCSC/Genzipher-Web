import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body; 

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
    const range = "Sheet1!A:M"; 

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, email, message, new Date().toLocaleString()]],
      },
    });

    return Response.json({ success: true, message: "Form submitted!" });
  } catch (err: any) {
    console.error(err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
