import ProductList from "./products/page";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <ProductList />
    </div>
  );
}
