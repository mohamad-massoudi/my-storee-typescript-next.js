"use client"; // برای مشخص کردن که این کامپوننت به صورت Client Component است

import { useState, useEffect } from "react";
import { Product } from "@/app/types";
import Link from "next/link";

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    isAvailable: true,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  // بارگذاری محصولات از API
  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setMessage("خطا در بارگذاری محصولات");
      });
  }, []);

  const handleAddProduct = async () => {
    setLoading(true);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (res.ok) {
      const addedProduct = await res.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ id: 0, name: "", price: 0, isAvailable: true });
      setMessage("محصول با موفقیت اضافه شد!");
    } else {
      setMessage("اضافه کردن محصول با خطا مواجه شد.");
    }
    setLoading(false);
  };

  const handleDeleteProduct = async (id: number) => {
    setLoading(true);  // برای نشان دادن لودینگ
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
  
    if (res.ok) {
      setProducts(products.filter((product) => product.id !== id));
      setMessage("محصول با موفقیت حذف شد!");
    } else {
      setMessage("حذف محصول با خطا مواجه شد.");
    }
  
    setLoading(false);  // برای مخفی کردن لودینگ
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        🛠️ پنل مدیریت محصولات
      </h2>

      {/* نمایش پیام موفقیت یا خطا */}
      {message && (
        <div className="text-center text-lg font-semibold text-green-600 mb-6">
          {message}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-semibold">اضافه کردن محصول جدید</h3>
        <div className="mt-4">
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="نام محصول"
            className="p-2 border-2 border-gray-300 rounded-lg"
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
            }
            placeholder="قیمت محصول"
            className="p-2 border-2 border-gray-300 rounded-lg ml-4"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white p-2 rounded-lg ml-4"
            disabled={loading}
          >
            {loading ? "در حال اضافه کردن..." : "اضافه کردن محصول"}
          </button>
        </div>
      </div>

      <h3 className="text-2xl font-semibold">لیست محصولات</h3>
      <div className="mt-6">
        {loading ? (
          <p className="text-center text-gray-500 mt-20 text-lg">در حال بارگذاری...</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center mb-4 p-4 bg-white shadow-md rounded-lg"
            >
              <div>
                <h4 className="text-xl">{product.name}</h4>
                <p className="text-gray-700">{product.price} تومان</p>
              </div>
              <div>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white p-2 rounded-lg"
                  disabled={loading}
                >
                  حذف
                </button>
                <Link href={`/admin/products/edit/${product.id}`}>
                  <button className="bg-yellow-500 text-white p-2 rounded-lg ml-4">
                    ویرایش
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
