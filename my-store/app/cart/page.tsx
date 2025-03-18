"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  // 🛒 محاسبه قیمت کل سبد خرید
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                <span className="font-semibold text-gray-800">
                  {item.name} - {item.quantity}x
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{(item.price * item.quantity).toLocaleString()} تومان</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* قیمت کل */}
          <div className="mt-6 text-xl font-bold text-center">
            💰 قیمت کل: <span className="text-green-600">{totalPrice.toLocaleString()} تومان</span>
          </div>

          {/* دکمه رفتن به صفحه پرداخت */}
          <Link
            href="/checkout"
            className="mt-6 block bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-800 transition"
          >
            🛒 ادامه فرآیند پرداخت
          </Link>

          {/* دکمه پاک کردن سبد خرید */}
          <button
            onClick={clearCart}
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-800 transition"
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
