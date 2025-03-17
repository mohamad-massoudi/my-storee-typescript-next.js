"use client";

import { Product } from "@/app/types";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-lg text-gray-700 mt-2">{product.price.toLocaleString()} تومان</p>
        <p className={`mt-2 text-lg ${product.isAvailable ? "text-green-600" : "text-red-600"}`}>
          {product.isAvailable ? "✅ موجود" : "❌ ناموجود"}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition"
        >
          🛒 افزودن به سبد خرید
        </button>
        <Link href="/cart" className="mt-4 inline-block text-blue-600 hover:underline">
          🛍 مشاهده سبد خرید
        </Link>
      </div>
    </div>
  );
}
