import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { ProductsSection } from "@/components/Products";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Hero />
      <About />
      <ProductsSection />
    </div>
  );
}
