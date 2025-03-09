export type Product = {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
};

export const products: Product[] = [
  { id: 1, name: "لپ‌تاپ گیمینگ", price: 25000000, isAvailable: true },
  { id: 2, name: "موبایل سامسونگ", price: 15000000, isAvailable: false },
  { id: 3, name: "تبلت آیپد", price: 20000000, isAvailable: true },
];

// کامپوننت نمایش محصولات
export default function ProductList() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">لیست محصولات</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-3 bg-white rounded-lg shadow flex justify-between items-center"
          >
            <span className="text-black">{product.name}</span>
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
