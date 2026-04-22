import { google } from "googleapis";

const products = [
  ["1", "Whey Protein Vainilla", "Star Nutrition", "Proteína", "908g", "30", "Proteína de suero microfiltrada sabor vainilla", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06-SnIXMD7kzQBWFmJiKYnsZL2RsSRr3S.jpeg", "45000", "TRUE", "Proteína de suero de leche de alta calidad, microfiltrada para mayor pureza y absorción", "Ayuda a la recuperación muscular, aumenta la síntesis de proteínas y contribuye al crecimiento muscular", "Inmediatamente después del entrenamiento o entre comidas"],
  ["2", "Creatine Monohydrate", "Star Nutrition", "Creatina", "300g", "60", "Creatina monohidratada ultramicronizada 100% pura", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06%20%282%29-SaY0s1jpVTWAmKC0ODVxty1A6eAbpX.jpeg", "28000", "TRUE", "Creatina monohidratada en su forma más pura y efectiva", "Aumenta la fuerza, potencia y rendimiento en ejercicios de alta intensidad", "5g diarios, preferiblemente post-entrenamiento"],
  ["3", "BSN Creatine", "BSN", "Creatina", "309g", "60", "Creatina monohidratada sin sabor para mezclar", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06%20%283%29-b98eE6MOOCgKPcXhhBSPi8f2Lkqfjp.jpeg", "35000", "TRUE", "Creatina de grado farmacéutico de BSN", "Mejora la fuerza muscular y el rendimiento atlético", "Antes o después del entrenamiento"],
  ["4", "Pump 3D Ripped", "Star Nutrition", "Pre-entreno", "315g", "45", "Pre-entreno con cafeína sabor frutilla lima", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07%20%281%29-hKkv4tDEuuUdb5Ah5EIosQ7FDOvRzj.jpeg", "42000", "TRUE", "Fórmula pre-entreno con cafeína, taurina y aminoácidos", "Aumenta energía, foco mental y vasodilatación para mejor bombeo muscular", "30 minutos antes del entrenamiento"],
  ["5", "Creatine Micronized 200g", "One Fit Nutrition", "Creatina", "200g", "40", "Creatina micronizada con vitamina C", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06%20%281%29-MGTbbvJgUM3pCstX3MnXElsgbFVBU6.jpeg", "22000", "FALSE", "Creatina micronizada con vitamina C añadida", "Mejora rendimiento y recuperación con antioxidantes", "Diariamente con agua o jugo"],
  ["6", "Creatine Micronized 500g", "One Fit Nutrition", "Creatina", "500g", "100", "Creatina micronizada 100% pura", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07-yg9WvPowZxf4Zecx4SxwYMmsBJjKNK.jpeg", "38000", "TRUE", "Creatina de alta pureza en formato grande", "Mayor fuerza y masa muscular magra", "5g diarios en cualquier momento"],
  ["7", "Multi Vitamin", "Star Nutrition", "Vitaminas", "60 comp", "60", "Multivitamínico completo 23 vitaminas y minerales", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07%20%283%29-eqYNifrddiLDOGNvCUEkv4kNoE8Whh.jpeg", "18000", "TRUE", "Complejo de 23 vitaminas y minerales esenciales", "Cubre necesidades nutricionales diarias y mejora bienestar general", "1 comprimido con el desayuno"],
  ["8", "Omega 3 Fish Oil", "Star Nutrition", "Vitaminas", "60 caps", "60", "Aceite de pescado rico en EPA y DHA", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07%20%284%29-VMaEO1X3sZePd7EgFZYy4ABxcXYAFr.jpeg", "15000", "FALSE", "Ácidos grasos esenciales Omega 3 de aceite de pescado", "Salud cardiovascular, función cerebral y reducción de inflamación", "1-2 cápsulas con comidas"],
  ["9", "Collagen Plus", "Star Nutrition", "Colágeno", "360g", "30", "Colágeno hidrolizado sabor limón", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.07%20%282%29-WaTbS4KSDu4Z9M77utKSZHS6et2pqU.jpeg", "32000", "TRUE", "Colágeno hidrolizado con vitamina C y minerales", "Mejora salud de articulaciones, piel, cabello y uñas", "Por la mañana en ayunas o antes de dormir"],
  ["10", "BSN Creatine 2", "BSN", "Creatina", "309g", "60", "Creatina monohidratada sin sabor", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-12%20at%2018.34.06%20%284%29-TtjyCVQJavOkg9G8I13mfev1YCculA.jpeg", "35000", "TRUE", "Creatina de grado farmacéutico de BSN", "Mejora la fuerza muscular y el rendimiento atlético", "Antes o después del entrenamiento"],
];

const headers = ["id", "name", "brand", "category", "weight", "servings", "description", "image", "price", "inStock", "whatIs", "benefits", "bestTime"];

async function seedProducts() {
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
    // Clear existing data
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: "Productos!A1:M100",
    });

    // Add headers
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Productos!A1:M1",
      valueInputOption: "RAW",
      requestBody: {
        values: [headers],
      },
    });

    // Add products
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Productos!A2:M11",
      valueInputOption: "RAW",
      requestBody: {
        values: products,
      },
    });

    console.log("Productos agregados exitosamente!");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

seedProducts();
