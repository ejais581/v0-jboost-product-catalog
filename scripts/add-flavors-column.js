import { google } from "googleapis";

async function addFlavorsColumn() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Add flavors header
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Productos!N1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [["flavors"]],
    },
  });

  console.log("Columna 'flavors' agregada en la columna N");
  console.log("");
  console.log("Para agregar sabores a un producto, escribe los sabores separados por coma.");
  console.log("Ejemplo: Vainilla, Chocolate, Frutilla");
  console.log("");
  console.log("Si un producto no tiene sabores, deja la celda vacia.");
}

addFlavorsColumn().catch(console.error);
