"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { type ChangeEvent, useEffect, useState } from "react";
import Fuse from "fuse.js";
import {
  Loader,
  Search,
  Star,
  Package,
  AlertCircle,
  Grid3X3,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/useMobile";
import { ProductsType } from "@/db/schema";

// Mock ProductsType - replace with your actual type

const categories = [
  { name: "All", value: "", icon: Grid3X3, color: "bg-slate-500" },
  {
    name: "Seedlings",
    value: "seedlings",
    icon: Package,
    color: "bg-green-500",
  },
  {
    name: "Fertilizers",
    value: "fertilizers",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    name: "Pesticides",
    value: "pesticides",
    icon: Package,
    color: "bg-red-500",
  },
  { name: "Tools", value: "tools", icon: Package, color: "bg-yellow-500" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [displayProducts, setDisplayProducts] = useState<ProductsType[]>([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const isMobile = useMobile();

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

        const mockProducts: ProductsType[] = await response.json();
        if (!mockProducts) throw new Error("Failed fetching data");
        setProducts(mockProducts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.trim());
  };

  const filterCategory = (cat: string) => {
    setSelectedCategory(cat);
  };

  useEffect(() => {
    let filtered = products;
    const options = {
      keys: ["name", "category", "description"],
      threshold: 0.3,
    };

    // Apply category filter
    if (selectedCategory && displayProducts.length > 0) {
      filtered = products.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // Apply search filter
    if (query) {
      const fuseInstance = new Fuse(filtered, options);
      filtered = fuseInstance.search(query).map((r) => r.item);
    }
    setDisplayProducts(filtered);
  }, [query, products, selectedCategory]);

  const ProductCard = ({ product }: { product: ProductsType }) => (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <Image
          src="/placeholder.svg?height=200&width=300"
          alt={product.name}
          width={300}
          height={200}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {!product.inStock && (
            <Badge variant="destructive" className="text-xs">
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="group-hover:text-primary line-clamp-1 text-lg font-semibold transition-colors">
              {product.name}
            </h3>
            <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-primary text-2xl font-bold">
                GHC{Number(product.price).toLocaleString()}
              </span>
              <span className="text-muted-foreground ml-1 text-sm">
                per unit
              </span>
            </div>

            <Button
              asChild
              size="sm"
              disabled={!product.inStock}
              className="min-w-[100px]"
            >
              <Link href={`/order?product=${product.id}`}>
                {product.inStock ? "Order Now" : "Notify Me"}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProductListItem = ({ product }: { product: ProductsType }) => (
    <Card className="group transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex gap-6">
          <Image
            src="/placeholder.svg?height=120&width=120"
            alt={product.name}
            width={120}
            height={120}
            className="flex-shrink-0 rounded-lg object-cover"
          />

          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="group-hover:text-primary text-xl font-semibold transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {product.description}
                </p>
              </div>

              <div className="text-right">
                <div className="text-primary text-2xl font-bold">
                  GHC{Number(product.price).toLocaleString()}
                </div>
                <div className="text-muted-foreground text-sm">per unit</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>
                )}

                <Badge variant={product.inStock ? "default" : "destructive"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              <Button asChild disabled={!product.inStock}>
                <Link href={`/order?product=${product.id}`}>
                  {product.inStock ? "Order Now" : "Notify Me"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="from-background to-muted/30 min-h-screen bg-gradient-to-b">
      {/* Hero Section */}
      <section className="from-primary/10 to-primary/5 bg-gradient-to-r px-4 py-16 md:px-10">
        <div className="container mx-auto">
          <div className="mb-12 space-y-6 text-center">
            <Badge variant="outline" className="mb-4">
              Our Products
            </Badge>
            <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Available Supplies
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              Browse quality farming essentials — ready to be delivered to your
              farm. From premium seedlings to professional tools, we have
              everything you need.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-background/80 mb-8 rounded-2xl border p-6 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6 lg:flex-row">
              {/* Search */}
              <div className="relative max-w-md flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="h-12 pl-10"
                  value={query}
                  onChange={handleSearch}
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Button
                      key={cat.value}
                      variant={
                        selectedCategory === cat.value ? "default" : "outline"
                      }
                      size="sm"
                      className="h-10"
                      disabled={loading}
                      onClick={() => filterCategory(cat.value)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {cat.name}
                    </Button>
                  );
                })}
              </div>

              {/* View Toggle */}
              {!isMobile && (
                <div className="flex items-center gap-2 rounded-lg border p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Products Section */}
      <section className="px-4 py-12 pb-20 md:px-10">
        {!loading && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              {displayProducts.length} product
              {displayProducts.length !== 1 ? "s" : ""} found
              {selectedCategory &&
                ` in ${categories.find((c) => c.value === selectedCategory)?.name}`}
              {query && ` for "${query}"`}
            </p>

            {(selectedCategory || query) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory("");
                  setQuery("");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
        <div className="container mx-auto">
          {loading ? (
            <div className="flex h-64 flex-col items-center justify-center space-y-4">
              <Loader className="text-primary h-12 w-12 animate-spin" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : error ? (
            <div className="flex h-64 flex-col items-center justify-center space-y-4">
              <AlertCircle className="text-destructive h-16 w-16" />
              <p className="text-destructive text-xl font-semibold">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : displayProducts.length > 0 ? (
            <div
              className={cn(
                "gap-6",
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-4",
              )}
            >
              {displayProducts.map((product) =>
                viewMode === "grid" ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ProductListItem key={product.id} product={product} />
                ),
              )}
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center space-y-4">
              <Package className="text-muted-foreground h-16 w-16" />
              <h3 className="text-xl font-semibold">No products found</h3>
              <p className="text-muted-foreground max-w-md text-center">
                {query || selectedCategory
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "We're currently updating our inventory. Please check back soon!"}
              </p>
              {(query || selectedCategory) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("");
                    setQuery("");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
