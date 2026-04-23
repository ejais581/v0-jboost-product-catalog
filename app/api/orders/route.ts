import { NextResponse } from "next/server";
import { saveOrder } from "@/lib/google-sheets";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { customerName, customerPhone, customerAddress, customerEmail, items, total } = body;
    
    // Generate order number
    const orderNumber = `JB-${Date.now().toString(36).toUpperCase()}`;
    
    // Format products for storage
    const productsString = items
      .map((item: { name: string; brand: string; weight: string; quantity: number; price: number }) => 
        `${item.name} (${item.brand}${item.weight ? ` - ${item.weight}` : ""}) x${item.quantity} ($${item.price.toLocaleString("es-AR")})`
      )
      .join(" | ");
    
    // Save to Google Sheets
    const saved = await saveOrder({
      orderNumber,
      customerName,
      customerPhone,
      customerAddress,
      customerEmail,
      products: productsString,
      total,
      date: new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" }),
    });
    
    if (!saved) {
      return NextResponse.json(
        { error: "Error al guardar el pedido" },
        { status: 500 }
      );
    }
    
    // Format WhatsApp message
    const whatsappNumber = "543835500992";
    
    let message = `*PEDIDO ${orderNumber}*\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `${customerName}\n`;
    message += `Tel: ${customerPhone}\n`;
    if (customerEmail) {
      message += `${customerEmail}\n`;
    }
    message += `${customerAddress}\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `*PRODUCTOS*\n`;
    
    items.forEach((item: { name: string; brand: string; weight: string; flavor: string; quantity: number; price: number }, index: number) => {
      const baseName = item.flavor && item.name.includes(` - ${item.flavor}`) 
        ? item.name.replace(` - ${item.flavor}`, '') 
        : item.name;
      
      let productLine = `${index + 1}. ${baseName} (${item.brand}`;
      if (item.weight) productLine += `, ${item.weight}`;
      if (item.flavor) productLine += `, ${item.flavor}`;
      productLine += `)`;
      message += `${productLine}\n`;
      message += `   x${item.quantity} = $${(item.price * item.quantity).toLocaleString("es-AR")}\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL: $${total.toLocaleString("es-AR")}*`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    return NextResponse.json({
      success: true,
      orderNumber,
      whatsappUrl,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { error: "Error al procesar el pedido" },
      { status: 500 }
    );
  }
}
