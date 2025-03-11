// ۱️⃣ تعریف تایپ برای محصولات
export type Product = {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
};

// ۲️⃣ لیست محصولات تستی
export const products: Product[] = [
  { id: 1, name: "لپ‌تاپ گیمینگ", price: 25000000, isAvailable: true },
  { id: 2, name: "موبایل سامسونگ", price: 15000000, isAvailable: false },
  { id: 3, name: "تبلت آیپد", price: 20000000, isAvailable: true },
];

// ۳️⃣ فانکشن جنریک برای فیلتر کردن محصولات موجود
function filterAvailableProducts<T extends { isAvailable: boolean }>(items: T[]): T[] {
  return items.filter((item) => item.isAvailable);
}

// ۴️⃣ فیلتر کردن محصولات
const availableProducts = filterAvailableProducts(products);

// ۵️⃣ کامپوننت نمایش محصولات
export default function ProductList() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">محصولات موجود</h2>
      <ul className="space-y-2">
        {availableProducts.map((product) => (
          <li
            key={product.id}
            className="p-3 bg-white rounded-lg shadow flex justify-between items-center"
          >
            <span>{product.name}</span>
            <span>{product.price.toLocaleString()} تومان</span>
            <span className="text-green-600">✅ موجود</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
