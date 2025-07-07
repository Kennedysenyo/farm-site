"use client";

import { useEffect, useState } from "react";
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
  MapPin,
  Loader,
} from "lucide-react";
import { FarmlandType } from "@/db/schema";

export default function AdminFarmlandsPage() {
  const [farmlands, setFarmlands] = useState<FarmlandType[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFectchError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");

  useEffect(() => {
    const fetchFarmLands = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/farm-lands", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!data)
          throw new Error("An error occured fetching data, try again.");
        setFarmlands(data);
      } catch (error) {
        if (error instanceof Error) {
          setFectchError(error.message);
        } else {
          setFectchError(error as string);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFarmLands();
  }, []);

  const filteredFarmlands = farmlands.filter((farmland) => {
    const matchesSearch =
      farmland.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmland.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      regionFilter === "all" ||
      farmland.location.toLowerCase().includes(regionFilter);
    return matchesSearch && matchesRegion;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="default">Available</Badge>;
      case "reserved":
        return <Badge variant="secondary">Reserved</Badge>;
      case "sold":
        return <Badge variant="destructive">Sold</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const farmlandElements = filteredFarmlands.map((farmland) => (
    <TableRow key={farmland.id}>
      <TableCell>
        <div className="flex items-center space-x-3">
          <Image
            src={"/placeholder.svg"}
            alt={farmland.title}
            width={80}
            height={60}
            className="rounded-md object-cover"
          />
          <div>
            <div className="font-medium">{farmland.title}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>{farmland.location}</TableCell>
      <TableCell>{farmland.size} acres</TableCell>
      <TableCell>
        <div>
          <div className="font-medium">
            GHC {farmland.price.toLocaleString()}
          </div>
          <div className="text-muted-foreground text-sm">
            GHC {farmland.pricePerAcre.toLocaleString()}/acre
          </div>
        </div>
      </TableCell>
      <TableCell>{getStatusBadge(farmland.status)}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/farmlands/${farmland.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/farmlands/${farmland.id}/edit`}>
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
          <h1 className="text-3xl font-bold">Farmlands</h1>
          <p className="text-muted-foreground">
            Manage farmland listings and inquiries
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/farmlands/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Farmland
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Listings
            </CardTitle>
            <MapPin className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmlands.length}</div>
            <p className="text-muted-foreground text-xs">Active farmlands</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {farmlands.filter((f) => f.status === "available").length}
            </div>
            <p className="text-muted-foreground text-xs">Ready for sale</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              GHC{" "}
              {farmlands
                .reduce((sum, f) => sum + Number(f.price), 0)
                .toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">Portfolio value</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Farmland Listings</CardTitle>
          <CardDescription>
            View and manage all farmland properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search farmlands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="ashanti">Ashanti</SelectItem>
                  <SelectItem value="eastern">Eastern</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                  <SelectItem value="northern">Northern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Farmlands Table */}
          <div className="mt-6">
            {loading ? (
              <div className="flex h-64 flex-col items-center justify-center space-y-4">
                <Loader className="text-primary h-12 w-12 animate-spin" />
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : fetchError ? (
              <h2 className="text-destructive text-center text-2xl">
                {fetchError}
              </h2>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>

                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{farmlandElements}</TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
