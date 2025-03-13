import { NextResponse } from "next/server";
import { products } from "@/app/data";

// API برای دریافت یک محصول خاص
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return NextResponse.json({ error: "محصول پیدا نشد" }, { status: 404 });
  }

  return NextResponse.json(product);
}
