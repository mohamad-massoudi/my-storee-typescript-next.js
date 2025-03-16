"use client"; // این مهمه! باعث می‌شه این کامپوننت در کلاینت اجرا بشه

import { Product } from "@/app/types";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 text-lg">{product.price.toLocaleString()} تومان</p>
        <p className={`mt-2 text-lg ${product.isAvailable ? "text-green-600" : "text-red-600"}`}>
          {product.isAvailable ? "✅ موجود" : "❌ ناموجود"}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          🛒 افزودن به سبد خرید
        </button>
        <br />
        <Link href="/cart" className="mt-4 inline-block text-blue-600 hover:underline">
          🛍 مشاهده سبد خرید
        </Link>
      </div>
    </div>
  );
}
