"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Loader,
} from "lucide-react";
import { ProductsType } from "@/db/schema";
import Fuse from "fuse.js";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductsType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!data) throw Error("Failed to fecth Products");
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.trim());
  };

  useEffect(() => {
    let filtered = products;
    const options = {
      keys: ["name", "category", "description"],
      threshold: 0.3,
    };

    // Apply category filter
    if (
      categoryFilter &&
      categoryFilter !== "all" &&
      filteredProducts.length > 0
    ) {
      filtered = products.filter(
        (product) =>
          product.category.toLowerCase() === categoryFilter.toLowerCase(),
      );
    }

    // Apply search filter
    if (searchQuery) {
      const fuseInstance = new Fuse(filtered, options);
      filtered = fuseInstance.search(searchQuery).map((r) => r.item);
    }
    setFilteredProducts(filtered);
  }, [searchQuery, products, categoryFilter]);

  const productsElements = filteredProducts.map((product) => (
    <TableRow key={product.id}>
      <TableCell>
        <div className="flex items-center space-x-3">
          <Image
            src={"/placeholder.svg"}
            alt={product.name}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
          <div>
            <div className="font-medium">{product.name}</div>
            <div className="text-muted-foreground text-sm">
              ID: {product.id}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>GHC {product.price}</TableCell>

      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/products/${product.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/products/${product.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your agricultural products and inventory
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-muted-foreground text-xs">Active listings</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>View and manage all your products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleQuery}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="seedlings">Seedlings</SelectItem>
                  <SelectItem value="fertilizers">Fertilizers</SelectItem>
                  <SelectItem value="pesticides">Pesticides</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Table */}
          <div className="mt-6">
            {loading ? (
              <div className="flex h-64 flex-col items-center justify-center space-y-4">
                <Loader className="text-primary h-12 w-12 animate-spin" />
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{productsElements}</TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
