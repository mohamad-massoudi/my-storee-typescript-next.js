"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">🛍 سبد خرید</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">سبد خرید شما خالی است.</p>
      ) : (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <span className="font-semibold text-gray-800">{item.name} - {item.quantity}x</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  ❌ حذف
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={clearCart}
            className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-800 transition"
          >
            🗑 پاک کردن سبد خرید
          </button>
        </div>
      )}

      <Link href="/" className="mt-6 text-blue-600 hover:underline">
        🔙 بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
