import { NextResponse } from "next/server";
import { products } from "@/app/data";

// API برای دریافت یک محصول خاص بر اساس id
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const productId = Number(params.id);

  // بررسی اینکه آیا id عددی است
  if (isNaN(productId)) {
    return NextResponse.json({ error: "ID معتبر نیست" }, { status: 400 });
  }

  // جستجو برای محصول با id
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json({ error: "محصول پیدا نشد" }, { status: 404 });
  }

  return NextResponse.json(product); // بازگشت محصول در صورت موفقیت
}

// API برای اضافه کردن محصول جدید
export async function POST(req: Request) {
  const newProduct = await req.json();
  
  // ایجاد شناسه یکتا برای محصول جدید
  newProduct.id = Date.now();

  products.push(newProduct); // اضافه کردن محصول به لیست

  return NextResponse.json(newProduct, { status: 201 }); // بازگشت محصول جدید با وضعیت 201
}

// API برای حذف یک محصول بر اساس id
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const productId = Number(params.id);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "ID معتبر نیست" }, { status: 400 });
  }

  const index = products.findIndex((p) => p.id === productId);
  if (index === -1) {
    return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
  }

  products.splice(index, 1); // حذف محصول از لیست

  return NextResponse.json({ message: "محصول با موفقیت حذف شد" }, { status: 200 });
}

// API برای ویرایش یک محصول بر اساس id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const productId = Number(params.id);
  const updatedProduct = await req.json();

  if (isNaN(productId)) {
    return NextResponse.json({ error: "ID معتبر نیست" }, { status: 400 });
  }

  const index = products.findIndex((p) => p.id === productId);
  if (index === -1) {
    return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
  }

  // به‌روزرسانی محصول با اطلاعات جدید
  products[index] = { ...products[index], ...updatedProduct };

  return NextResponse.json(products[index]); // بازگشت محصول ویرایش شده
}
