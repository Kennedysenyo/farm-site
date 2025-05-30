import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { products } from "@/lib/data";

export const ProductsSection = () => {
  const productPreview = products.slice(0, 4).map((product) => (
    <Link key={product.id} href={`/order?id=${product.id}`}>
      <div className="border-border hover:bg-background group flex flex-col overflow-hidden rounded-lg border p-4 shadow-sm transition hover:shadow-md">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className="mb-4 h-40 w-full rounded-md object-cover"
        />
        <h3 className="text-foreground group-hover:text-primary text-lg font-semibold">
          {product.name}
        </h3>
        <p className="text-muted-foreground mt-1 text-sm">
          {product.description}
        </p>
      </div>
    </Link>
  ));

  return (
    <section className="bg-muted w-full px-4 py-16 md:px-10">
      <div className="container mx-auto space-y-8 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Popular Supplies
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg">
            Explore some of our top agricultural essentials — from high-quality
            seedlings to trusted farm inputs. You can conveniently place an
            order online and get them delivered to your location.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productPreview}
        </div>

        <Button asChild className="mt-6">
          <Link href="/products">Browse Supplies</Link>
        </Button>
      </div>
    </section>
  );
};
