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
    
    let message = `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🛒 *NUEVO PEDIDO*\n`;
    message += `📋 *${orderNumber}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `👤 *DATOS DEL CLIENTE*\n\n`;
    message += `Nombre: ${customerName}\n`;
    message += `Teléfono: ${customerPhone}\n`;
    if (customerEmail) {
      message += `Email: ${customerEmail}\n`;
    }
    message += `Dirección: ${customerAddress}\n\n`;
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📦 *PRODUCTOS*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    items.forEach((item: { name: string; brand: string; weight: string; flavor: string; quantity: number; price: number }, index: number) => {
      const baseName = item.flavor && item.name.includes(` - ${item.flavor}`) 
        ? item.name.replace(` - ${item.flavor}`, '') 
        : item.name;
      
      message += `*${index + 1}. ${baseName}*\n`;
      message += `   Marca: ${item.brand}\n`;
      if (item.flavor) {
        message += `   Sabor: ${item.flavor}\n`;
      }
      if (item.weight) {
        message += `   Peso: ${item.weight}\n`;
      }
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio: $${(item.price * item.quantity).toLocaleString("es-AR")}\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL: $${total.toLocaleString("es-AR")}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━`;
    
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
