const { google } = require("googleapis");

async function createOrdersSheet() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  try {
    // First, try to add a new sheet called "Pedidos"
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: "Pedidos",
              },
            },
          },
        ],
      },
    });
    console.log("Sheet 'Pedidos' created successfully");
  } catch (error) {
    if (error.message.includes("already exists")) {
      console.log("Sheet 'Pedidos' already exists");
    } else {
      throw error;
    }
  }

  // Add headers
  const headers = [
    ["Numero Pedido", "Nombre Cliente", "Telefono", "Direccion", "Email", "Productos", "Total", "Fecha"],
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Pedidos!A1:H1",
    valueInputOption: "RAW",
    requestBody: {
      values: headers,
    },
  });

  console.log("Headers added to 'Pedidos' sheet");
  console.log("Setup complete!");
}

createOrdersSheet().catch(console.error);
