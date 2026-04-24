import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

// Map of product names/identifiers to new image URLs
const imageUpdates = {
  // One Fit Creatine Micronized 500g
  "Creatine Micronized 500g": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%283%29-vO7HYD32uzA9kewkfjceA1fFpPH6Gg.jpeg",
  "Creatina Micronizada 500g": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%283%29-vO7HYD32uzA9kewkfjceA1fFpPH6Gg.jpeg",
  
  // One Fit Creatine Micronized 200g
  "Creatine Micronized 200g": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%282%29-fIE8QLrjlLkKswp2hQ1nZm4Ca1qSmz.jpeg",
  "Creatina Micronizada 200g": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%282%29-fIE8QLrjlLkKswp2hQ1nZm4Ca1qSmz.jpeg",
  
  // Star Nutrition Collagen Plus
  "Collagen Plus": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%285%29-t1VxzXn3wivG1Rz285On0GaJAShIH1.jpeg",
  "Colageno Plus": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%285%29-t1VxzXn3wivG1Rz285On0GaJAShIH1.jpeg",
  
  // Star Nutrition Multi Vitamin
  "Multi Vitamin": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%286%29-q0ZMofubH9GS6Q0Mf2m2BKsecN7PS7.jpeg",
  "Multivitamin": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%286%29-q0ZMofubH9GS6Q0Mf2m2BKsecN7PS7.jpeg",
  "Multivitaminico": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%286%29-q0ZMofubH9GS6Q0Mf2m2BKsecN7PS7.jpeg",
  
  // Star Nutrition MTOR BCAA
  "MTOR BCAA": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.18%20%281%29-TMAaj6LB4uwWStKzAAdTRYrjN5OsXQ.jpeg",
  "BCAA": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.18%20%281%29-TMAaj6LB4uwWStKzAAdTRYrjN5OsXQ.jpeg",
  
  // Star Nutrition Creatine Monohydrate 300g
  "Creatine Monohydrate": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17-E8Dq11GA2UpMQ2l4F8y6BH3leRRs14.jpeg",
  "Creatina Monohidrato": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17-E8Dq11GA2UpMQ2l4F8y6BH3leRRs14.jpeg",
  
  // Star Nutrition Pump V8
  "Pump V8": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.18-1d599i2P5VX9FNEvkZKQwg9qy3I1It.jpeg",
  "V8": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.18-1d599i2P5VX9FNEvkZKQwg9qy3I1It.jpeg",
  
  // Star Nutrition Whey Protein
  "Whey Protein": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.16-AFicBvASTy0dtKdevyNi8wiISUEzu2.jpeg",
  "Proteina Whey": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.16-AFicBvASTy0dtKdevyNi8wiISUEzu2.jpeg",
  
  // Star Nutrition Omega 3
  "Omega 3": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%287%29-2NO3hK5jFJxmjS1T2XYGFqZDDRtT0P.jpeg",
  "Omega3": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%287%29-2NO3hK5jFJxmjS1T2XYGFqZDDRtT0P.jpeg",
  "Fish Oil": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%287%29-2NO3hK5jFJxmjS1T2XYGFqZDDRtT0P.jpeg",
  
  // BSN Creatine
  "BSN Creatine": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%281%29-WlOqRMqRVhB1k9C0KIcr4lSOpHMa7G.jpeg",
  
  // Star Nutrition L-Glutamine
  "L-Glutamine": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.18%20%283%29-bLJxRhswAqHvCi3pLDEhELIEO7oXYp.jpeg",
  "Glutamina": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.18%20%283%29-bLJxRhswAqHvCi3pLDEhELIEO7oXYp.jpeg",
  
  // Star Nutrition 3D Ripped
  "3D Ripped": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%284%29-WFoQOsibw5lGeoSAntURDOxFOM41QX.jpeg",
  "3DA Ripped": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.17%20%284%29-WFoQOsibw5lGeoSAntURDOxFOM41QX.jpeg",
  
  // One Fit EAA+
  "EAA+": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.18%20%282%29-nMHIGAr16CsUcZX60T8Fk3YBL8aPmr.jpeg",
  "EAA": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.18%20%282%29-nMHIGAr16CsUcZX60T8Fk3YBL8aPmr.jpeg",
  "Essential Amino Acid": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-24%20at%2017.04.18%20%282%29-nMHIGAr16CsUcZX60T8Fk3YBL8aPmr.jpeg",
};

async function updateProductImages() {
  try {
    // First, get all products to find which ones need updating
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Productos!A:J", // Assuming image is in column J or similar
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log("No data found in sheet");
      return;
    }

    // Find the image column (usually the last one or column named "image" or "imagen")
    const headers = rows[0];
    const imageColIndex = headers.findIndex(h => 
      h.toLowerCase().includes("image") || h.toLowerCase().includes("imagen")
    );
    const nameColIndex = headers.findIndex(h => 
      h.toLowerCase().includes("name") || h.toLowerCase().includes("nombre")
    );

    console.log("Headers:", headers);
    console.log("Image column index:", imageColIndex);
    console.log("Name column index:", nameColIndex);

    if (imageColIndex === -1 || nameColIndex === -1) {
      console.log("Could not find image or name column");
      return;
    }

    // Update each product that matches
    let updatedCount = 0;
    for (let i = 1; i < rows.length; i++) {
      const productName = rows[i][nameColIndex] || "";
      
      // Check if this product matches any of our update keys
      for (const [key, imageUrl] of Object.entries(imageUpdates)) {
        if (productName.toLowerCase().includes(key.toLowerCase())) {
          const cellRange = `Productos!${String.fromCharCode(65 + imageColIndex)}${i + 1}`;
          
          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: cellRange,
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [[imageUrl]],
            },
          });
          
          console.log(`Updated image for: ${productName}`);
          updatedCount++;
          break; // Only update once per product
        }
      }
    }

    console.log(`\nTotal products updated: ${updatedCount}`);
  } catch (error) {
    console.error("Error updating images:", error);
  }
}

updateProductImages();
