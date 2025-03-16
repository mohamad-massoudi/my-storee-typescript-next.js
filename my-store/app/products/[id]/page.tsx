import { Product } from "@/app/types";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails"; // ✅ ایمپورت کامپوننت کلاینتی

type ProductPageProps = {
  params: { id: string };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
  const product: Product | { error: string } = await res.json();

  if ("error" in product) {
    return notFound();
  }

  return <ProductDetails product={product} />;
}
