import { google } from "googleapis";
import { formSchema } from "@/utils/validate";

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const memberCount = Number(raw.teamSize) - 1;
    const normalized = {
      teamName: raw.teamName,
      teamSize: raw.teamSize,
      leader: {
        fullName: raw.leaderFullName,
        email: raw.leaderEmail,
        phone: raw.leaderPhone,
        university: raw.leaderUniversity,
        studentId: raw.leaderStudentId,
        yearOfStudy: raw.leaderYearOfStudy,
      },
      members: Array.from({ length: memberCount }).map((_, i) => {
        const n = i + 1;
        return {
          fullName: raw[`member${n}FullName`] || "",
          email: raw[`member${n}Email`] || "",
          phone: raw[`member${n}Phone`] || "",
          university: raw[`member${n}University`] || "",
          studentId: raw[`member${n}StudentId`] || "",
          yearOfStudy: raw[`member${n}YearOfStudy`] || "",
        };
      }),
    };

    const validated = formSchema.safeParse(normalized);

    if (!validated.success) {
      return Response.json(
        {
          success: false,
          errors: validated.error.issues.map((i) => ({
            message: i.message,
            path: i.path, 
          })),
        },
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
    const range = "Sheet1!A:Z";

    const body = raw; // your existing logic uses raw fields

    const rowData = [
      new Date().toLocaleString(),
      body.teamName,
      body.teamSize,
      body.leaderFullName || "",
      body.leaderEmail || "",
      body.leaderPhone || "",
      body.leaderUniversity || "",
      body.leaderStudentId || "",
      body.leaderYearOfStudy || "",
    ];

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

    // await sheets.spreadsheets.values.append({
    //   spreadsheetId,
    //   range,
    //   valueInputOption: "USER_ENTERED",
    //   requestBody: { values: [rowData] },
    // });

    return Response.json({
      success: true,
      message: "Team registration is closed!",
    });
  } catch (err: any) {
    console.error("Google Sheets Error:", err);
    return Response.json(
      {
        success: false,
        error: err.message || "Failed to submit registration",
      },
      { status: 500 }
    );
  }
}
