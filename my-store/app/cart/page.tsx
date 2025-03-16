"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🛍 سبد خرید</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">سبد خرید شما خالی است.</p>
      ) : (
        <ul className="w-96 bg-white p-6 rounded-lg shadow">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {item.name} - {item.quantity}x
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:underline"
              >
                ❌ حذف
              </button>
            </li>
          ))}
        </ul>
      )}

      <br />

      <Link href="/" className="text-blue-600 hover:underline">
        🔙 بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
