import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.teamName || !body.teamSize) {
      return Response.json(
        { success: false, error: "Team name and size are required" },
        { status: 400 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
    const range = "Sheet1!A:Z"; // Extended range to accommodate all fields

    // Prepare row data
    const rowData = [
      new Date().toLocaleString(), // Timestamp
      body.teamName,
      body.teamSize,
      // Leader details
      body.leaderFullName || "",
      body.leaderEmail || "",
      body.leaderPhone || "",
      body.leaderUniversity || "",
      body.leaderStudentId || "",
      body.leaderYearOfStudy || "",
    ];

    // Add member details (up to 4 additional members)
    for (let i = 1; i <= 4; i++) {
      rowData.push(
        body[`member${i}FullName`] || "",
        body[`member${i}Email`] || "",
        body[`member${i}Phone`] || "",
        body[`member${i}University`] || "",
        body[`member${i}StudentId`] || "",
        body[`member${i}YearOfStudy`] || ""
      );
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowData],
      },
    });

    return Response.json({ 
      success: true, 
      message: "Team registration submitted successfully!" 
    });
  } catch (err: any) {
    console.error("Error submitting to Google Sheets:", err);
    return Response.json(
      { 
        success: false, 
        error: err.message || "Failed to submit registration" 
      },
      { status: 500 }
    );
  }
}