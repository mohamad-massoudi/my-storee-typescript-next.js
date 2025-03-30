"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types";
import Link from "next/link";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<number | null>(null);

  // بارگذاری محصولات از API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // فیلتر محصولات بر اساس قیمت و جستجو
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter ? product.price <= priceFilter : true;
    return matchesSearch && matchesPrice;
  });

  if (loading) {
    return <p className="text-center text-gray-500 mt-20 text-lg">⏳ در حال بارگذاری محصولات...</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen ">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        🛍 فروشگاه محصولات
      </h2>

      {/* فیلتر جستجو */}
      <div className="mb-6 flex justify-center space-x-4">
        <input
          type="text"
          placeholder="جستجو محصول..."
          className="p-3 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="number"
          placeholder="حداکثر قیمت"
          className="p-3 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-blue-500"
          value={priceFilter || ""}
          onChange={(e) => setPriceFilter(Number(e.target.value) || null)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="group">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              {/* نام محصول */}
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700">
                {product.name}
              </h3>

              {/* قیمت محصول */}
              <p className="text-gray-700 mt-3 text-lg font-medium">
                {product.price.toLocaleString()} تومان
              </p>

              {/* وضعیت محصول */}
              <span
                className={`inline-block mt-4 px-4 py-1 text-sm font-semibold rounded-full ${
                  product.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {product.isAvailable ? "✅ موجود" : "❌ ناموجود"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
