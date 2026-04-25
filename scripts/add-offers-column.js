const { google } = require("googleapis");

async function addOffersColumn() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Add "Ofertas" header in column O (index 14, after Flavors)
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Productos!O1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [["Ofertas"]],
    },
  });

  console.log("Ofertas column added successfully!");
}

addOffersColumn().catch(console.error);
