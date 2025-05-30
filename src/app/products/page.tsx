"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { ProductsType } from "@/db/schema";
import Fuse from "fuse.js";
import { Loader } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [displayProducts, setDisplayProducts] = useState<ProductsType[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!data) {
          throw new Error("Failed fetching data");
        }

        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching products:", error.message);
          setError(error.message);
        } else {
          console.error("Unknown error", error);
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = { keys: ["name", "category"], threshold: 0.3 };
  const fuse = new Fuse(products, options);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.trim());
  };

  const filterCategory = (cat: string) => {
    const results = fuse.search(cat).map((r) => r.item);
    setDisplayProducts(results);
    setSelectedCategory(cat);
  };

  useEffect(() => {
    const fuseInstance = new Fuse(products, options);
    if (query) {
      const results = fuseInstance.search(query).map((r) => r.item);
      setDisplayProducts(results);
    } else {
      setDisplayProducts(products);
    }
  }, [query, products]);

  // if (!displayProducts.length) return <div>No Products</div>;

  const previewProducts = displayProducts.map((product) => (
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
          GHC{Number(product.price).toLocaleString()}
        </span>

        <Button asChild size="sm">
          <Link href={`/order?product=${product.id}`}>Order Now</Link>
        </Button>
      </div>
    </div>
  ));

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
              value={query}
              onChange={handleSearch}
            />

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {["Seedlings", "Fertilizers", "Pesticides", "Tools"].map(
                (cat) => (
                  <Button
                    key={cat}
                    variant={`${selectedCategory === cat.toLowerCase() ? "default" : "outline"}`}
                    size="sm"
                    className={`capitalize ${selectedCategory === cat.toLowerCase() ? "bg-primary/90 text-primary-foreground" : ""}`}
                    onClick={() => filterCategory(cat.toLowerCase())}
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
        {loading ? (
          <div className="flex h-[300px] w-full items-center justify-center">
            <Loader className="text-primary h-10 w-10 animate-spin" />
          </div>
        ) : error ? (
          <p className="text-destructive text-center text-4xl font-bold md:text-6xl">
            {error}
          </p>
        ) : previewProducts.length !== 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {previewProducts}
          </div>
        ) : (
          <div className="flex h-20 w-full items-center justify-center">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </section>
    </>
  );
}
