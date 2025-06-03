"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { products } from "@/lib/data";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, Star } from "lucide-react";

export const ProductsSection = () => {
  const productPreview = products.map((product) => (
    <Card
      key={product.id}
      className="from-muted/40 to-background group bg-gradient-to-r transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={200}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-6">
        <h3 className="group-hover:text-primary mb-2 text-center text-lg font-semibold transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground line-clamp-2 text-center text-sm">
          {product.description}
        </p>
      </CardContent>
    </Card>
  ));

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">
            Our Products
          </Badge>
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
            Popular Supplies
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
            Explore some of our top agricultural essentials — from high-quality
            seedlings to trusted farm inputs. You can conveniently place an
            order online and get them delivered to your location.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {productPreview}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/products">
              View All Supplies <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
