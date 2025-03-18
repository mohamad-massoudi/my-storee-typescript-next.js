"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();  // گرفتن سبد خرید
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // محاسبه قیمت کل
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // تابع پردازش پرداخت
  const handlePayment = () => {
    setIsProcessing(true);  // در حال پردازش...
    setTimeout(() => {
      setIsProcessing(false);  // پس از پردازش، موفقیت پرداخت را نشان می‌دهیم
      setPaymentSuccess(true);  // تغییر وضعیت به موفقیت
      clearCart();  // پاک کردن سبد خرید
    }, 2000);  // شبیه‌سازی مدت زمان پردازش
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">💳 پرداخت</h1>

      {paymentSuccess ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-green-600">✅ پرداخت موفقیت‌آمیز بود!</h2>
          <p className="text-gray-700 mt-4">سفارش شما با موفقیت ثبت شد. 🎉</p>
          <Link href="/" className="mt-6 inline-block text-blue-600 hover:underline">
            🔙 بازگشت به صفحه اصلی
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🛍 خلاصه سفارش</h2>

          <ul className="space-y-2 border-b pb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between text-gray-800">
                <span>{item.name} ({item.quantity}x)</span>
                <span>{(item.price * item.quantity).toLocaleString()} تومان</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-lg font-bold text-gray-900">
            💰 قیمت کل: <span className="text-green-600">{totalPrice.toLocaleString()} تومان</span>
          </div>

          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="نام و نام خانوادگی"
              className="w-full p-2 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="شماره کارت"
              className="w-full p-2 border rounded-lg"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="آدرس ارسال"
              className="w-full p-2 border rounded-lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-800 transition"
            disabled={isProcessing}
          >
            {isProcessing ? "⏳ در حال پردازش..." : "💳 پرداخت"}
          </button>
        </div>
      )}

      <Link href="/cart" className="mt-6 text-blue-600 hover:underline">
        🔙 بازگشت به سبد خرید
      </Link>
    </div>
  );
}
