import { google } from "googleapis";

export interface Order {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerProvince: string;
  customerLocality: string;
  customerAddress: string;
  customerEmail: string;
  products: string;
  total: number;
  date: string;
}

export async function saveOrder(order: Order): Promise<boolean> {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Pedidos!A:J",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          order.orderNumber,
          order.customerName,
          order.customerPhone,
          order.customerProvince,
          order.customerLocality,
          order.customerAddress,
          order.customerEmail,
          order.products,
          `$${order.total.toLocaleString("es-AR")}`,
          order.date,
        ]],
      },
    });

    return true;
  } catch (error) {
    console.error("Error saving order to Google Sheets:", error);
    return false;
  }
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  weight: string;
  servings: string;
  description: string;
  image: string;
  price: number;
  inStock: boolean;
  whatIs: string;
  benefits: string;
  bestTime: string;
  flavors: string[];
}

export async function getProducts(): Promise<Product[]> {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Productos!A2:O", // Skip header row
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return [];
    }

    return rows.map((row, index) => ({
      id: row[0] || `product-${index}`,
      name: row[1] || "",
      brand: row[2] || "",
      category: row[3] || "",
      weight: row[4] || "",
      servings: row[5] || "",
      description: row[6] || "",
      image: row[7] || "",
      price: parseFloat(row[8]) || 0,
      inStock: row[9]?.toLowerCase() === "true" || row[9]?.toLowerCase() === "si" || row[9] === "1",
      whatIs: row[10] || "",
      benefits: row[11] || "",
      bestTime: row[12] || "",
      flavors: row[13] ? row[13].split(",").map((f: string) => f.trim()).filter((f: string) => f.length > 0) : [],
    }));
  } catch (error) {
    console.error("Error fetching products from Google Sheets:", error);
    return [];
  }
}
