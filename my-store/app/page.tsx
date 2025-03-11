import ProductList from "./products";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">فروشگاه آنلاین کوچک</h1>
      <ProductList />
    </div>
  );
}
