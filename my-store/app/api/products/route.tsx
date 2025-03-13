import { NextResponse } from "next/server";
import { products } from "@/app/data";

// API برای دریافت همه محصولات
export async function GET() {
  return NextResponse.json(products);
}
