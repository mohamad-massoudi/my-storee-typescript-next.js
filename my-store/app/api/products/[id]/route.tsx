import { NextResponse } from "next/server";
import { products } from "@/app/data";

// تعریف تایپ برای پارامترهای `params`
type ProductParams = {
  id: string;
};

// API برای دریافت یک محصول خاص
export async function GET(req: Request, { params }: { params: ProductParams }) {
  const id = Number(params.id);  // تبدیل id به عدد

  // اگر id معتبر نبود، خطای 400 را برگردانید
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID معتبر نیست" }, { status: 400 });
  }

  // جستجو برای محصول با id
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: "محصول پیدا نشد" }, { status: 404 });
  }

  return NextResponse.json(product);
}
