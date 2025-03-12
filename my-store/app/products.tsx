"use client";

import { useEffect, useState } from "react";
import { Product } from "./types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">محصولات موجود</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-3 bg-white rounded-lg shadow flex justify-between items-center"
          >
            <span>{product.name}</span>
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
