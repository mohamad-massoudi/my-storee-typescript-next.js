import { Product } from "@/app/types";
import { notFound } from "next/navigation";
import Link from "next/link";

type ProductPageProps = {
  params: { id: string };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
  const product: Product | { error: string } = await res.json();

  if ("error" in product) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 text-lg">{product.price.toLocaleString()} تومان</p>
        <p className={`mt-2 text-lg ${product.isAvailable ? "text-green-600" : "text-red-600"}`}>
          {product.isAvailable ? "✅ موجود" : "❌ ناموجود"}
        </p>
        <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
          🔙 بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
