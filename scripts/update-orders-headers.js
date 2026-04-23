const { google } = require("googleapis");

async function updateOrdersHeaders() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Update headers in Pedidos sheet
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Pedidos!A1:I1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [["orderNumber", "customerName", "customerPhone", "customerLocality", "customerAddress", "customerEmail", "products", "total", "date"]],
    },
  });

  console.log("Headers updated successfully!");
}

updateOrdersHeaders().catch(console.error);
