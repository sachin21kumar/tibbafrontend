import Image from "next/image";
import MenuPage from "./components/products/getAllProducts";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen  justify-center bg-zinc-50 font-sans dark:bg-black">
    <Suspense fallback={<p>Loading...</p>}>
      <MenuPage />
    </Suspense>
    </div>
  );
}
