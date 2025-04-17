import { NextResponse } from "next/server";
import { products } from "@/app/data";

// API برای دریافت همه محصولات
export async function GET() {
  return NextResponse.json(products);
}

// API برای اضافه کردن محصول جدید
export async function POST(req: Request) {
  const newProduct = await req.json();
  newProduct.id = Date.now(); // تولید شناسه برای محصول جدید
  products.push(newProduct); // اضافه کردن محصول جدید به لیست محصولات

  return NextResponse.json(newProduct, { status: 201 }); // بازگشت محصول جدید با وضعیت 201
}

// API برای حذف یک محصول
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const productId = Number(params.id); // تبدیل شناسه به عدد

  const index = products.findIndex((p) => p.id === productId);
  if (index === -1) {
    return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
  }

  products.splice(index, 1); // حذف محصول از لیست
  return NextResponse.json({ message: "محصول با موفقیت حذف شد" }, { status: 200 });
}

// API برای ویرایش یک محصول
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const productId = Number(params.id); // تبدیل شناسه به عدد
  const updatedProduct = await req.json();

  const index = products.findIndex((p) => p.id === productId);
  if (index === -1) {
    return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
  }

  // به‌روزرسانی محصول
  products[index] = { ...products[index], ...updatedProduct };

  return NextResponse.json(products[index]); // بازگشت محصول ویرایش شده
}
