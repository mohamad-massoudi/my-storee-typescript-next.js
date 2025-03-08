export type Product = {
    id: number;
    name: string;
    price: number;
    isAvailable: boolean;
  };
  
  // لیست محصولات
  export const products: Product[] = [
    { id: 1, name: "لپ‌تاپ گیمینگ", price: 25000000, isAvailable: true },
    { id: 2, name: "موبایل سامسونگ", price: 15000000, isAvailable: false },
    { id: 3, name: "تبلت آیپد", price: 20000000, isAvailable: true },
  ];
  
  // 🔹 فانکشن قالب‌بندی قیمت
  function formatPrice(price: number): string {
    return price.toLocaleString("fa-IR") + " تومان";
  }
  
  // کامپوننت نمایش محصولات
  export default function ProductList() {
    return (
      <div>
        <h2>لیست محصولات</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {formatPrice(product.price)} - {product.isAvailable ? "✅ موجود" : "❌ ناموجود"}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  