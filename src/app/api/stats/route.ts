import { google } from "googleapis";

export const dynamic = 'force-dynamic'; // Ensure the route is not cached

// Helper to extract abbreviation from strings like "Name (Abbr)"
const getUniversityLabel = (fullName: string) => {
  if (!fullName) return null;
  const match = fullName.match(/\(([^)]+)\)/);
  // Returns "UCSC" if match found, otherwise returns original "University of Moratuwa"
  return match ? match[1] : fullName.trim();
};

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
    
    // Range extended to AZ to cover all member columns
    const range = "Sheet1!A:AZ"; 

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return Response.json({});
    }

    // --- CHANGE: Remove the header row (first row) ---
    const dataRows = rows.slice(1); 
    // -------------------------------------------------

    const universityCounts: Record<string, number> = {};

    // Indices for University columns (Leader + Members)
    const universityIndices = [6, 12, 18, 24, 30];

    // Iterate over dataRows instead of rows
    dataRows.forEach((row) => {
      universityIndices.forEach((index) => {
        const rawUni = row[index];
        
        // Only count if the cell has text
        if (rawUni && typeof rawUni === "string" && rawUni.trim() !== "") {
          const label = getUniversityLabel(rawUni);
          
          if (label) {
            universityCounts[label] = (universityCounts[label] || 0) + 1;
          }
        }
      });
    });

    // Sort by count descending
    const sortedStats = Object.fromEntries(
      Object.entries(universityCounts).sort(([, a], [, b]) => b - a)
    );

    return Response.json(sortedStats);

  } catch (err: any) {
    console.error("Google Sheets Read Error:", err);
    return Response.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}