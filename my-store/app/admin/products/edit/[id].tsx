"use client"; // برای مشخص کردن که این کامپوننت به صورت Client Component است

import { useState, useEffect } from "react";
import { Product } from "@/app/types";
import { useRouter } from "next/router";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // بارگذاری اطلاعات محصول بر اساس ID
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError("خطا در بارگذاری محصول");
        });
    }
  }, [id]);

  // مدیریت ویرایش محصول
  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (product) {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        alert("محصول با موفقیت ویرایش شد");
        router.push("/admin"); // برگشت به پنل ادمین بعد از ویرایش
      } else {
        setError("ویرایش محصول با خطا مواجه شد.");
      }
    }
  };

  // نمایش پیام لودینگ
  if (loading) {
    return <p>در حال بارگذاری محصول...</p>;
  }

  // نمایش پیام خطا
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">ویرایش محصول</h2>

      {product && (
        <form onSubmit={handleEditProduct}>
          <div className="mb-4">
            <label>نام محصول</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="p-2 border-2 border-gray-300 rounded-lg w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label>قیمت محصول</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
              className="p-2 border-2 border-gray-300 rounded-lg w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label>وضعیت موجودی</label>
            <select
              value={product.isAvailable ? "true" : "false"}
              onChange={(e) => setProduct({ ...product, isAvailable: e.target.value === "true" })}
              className="p-2 border-2 border-gray-300 rounded-lg w-full"
            >
              <option value="true">موجود</option>
              <option value="false">ناموجود</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-4 w-full"
            disabled={loading}
          >
            {loading ? "در حال ویرایش..." : "ویرایش محصول"}
          </button>
        </form>
      )}
    </div>
  );
}
