import { NextResponse } from "next/server";
import { getProducts } from "@/lib/google-sheets";

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error in products API:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}
