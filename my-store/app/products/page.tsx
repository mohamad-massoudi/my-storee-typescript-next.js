"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types";
import Link from "next/link";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">در حال بارگذاری...</p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">محصولات</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="p-3 bg-white rounded-lg shadow flex justify-between items-center">
            <Link href={`/products/${product.id}`} className="text-blue-600 hover:underline">
              {product.name}
            </Link>
            <span>{product.price.toLocaleString()} تومان</span>
            <span className={product.isAvailable ? "text-green-600" : "text-red-600"}>
              {product.isAvailable ? "✅ موجود" : "❌ ناموجود"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
