import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <>
      <section className="w-full px-4 py-10 md:px-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold md:text-5xl">Available Supplies</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Browse quality farming essentials — ready to be delivered to your
            farm.
          </p>
          <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-between">
            {/* Search Input */}
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full md:w-[300px]"
              // onChange={handleSearch}
            />

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {["Seedlings", "Fertilizers", "Pesticides", "Tools"].map(
                (cat) => (
                  <Button
                    key={cat}
                    variant="outline"
                    size="sm"
                    className="capitalize"
                    // onClick={() => filterCategory(cat.toLowerCase())}
                  >
                    {cat}
                  </Button>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-4 pb-20 md:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-background border-border flex flex-col justify-between gap-4 rounded-lg border p-4 shadow-sm hover:shadow-md"
            >
              <Image
                src=""
                alt={product.name}
                width={400}
                height={250}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {product.description}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-primary font-bold">
                  GHC{Number(50).toLocaleString()}
                </span>
                <Button asChild size="sm">
                  <Link href={`/order?product=${product.name}`}>Order Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
