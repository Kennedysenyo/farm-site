"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  MapPin,
  Ruler,
  Droplets,
  Zap,
  Car,
  Search,
  Heart,
  Share2,
  Eye,
  AlertCircle,
  Phone,
  Calendar,
  Loader,
} from "lucide-react";
import Fuse from "fuse.js";

import { FarmlandType } from "@/db/schema";

export default function FarmlandsPage() {
  const [farmlands, setFarmlands] = useState<FarmlandType[]>([]);
  const [filteredFarmlands, setFilteredFarmlands] = useState<FarmlandType[]>(
    [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sizeRange, setSizeRange] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchFarmlands = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/farm-lands", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!data) throw new Error("Failed to fetch data");
        setFarmlands(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          setError(error.message);
        }
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };
    fetchFarmlands();
  }, []);

  useEffect(() => {
    let filtered = farmlands;
    // Search filter
    const options = {
      keys: ["title", "location", "region", "description"],
      threshold: 0.3,
    };
    const fuse = new Fuse(farmlands, options);
    if (searchQuery) {
      filtered = fuse.search(searchQuery).map((r) => r.item);
    }

    // Region filter
    if (selectedRegion !== "all" && !error) {
      filtered = filtered.filter(
        (land) => land.region.toLowerCase() === selectedRegion,
      );
    }

    // Price filter
    if (priceRange !== "all" && !error) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(
        (land) =>
          Number(land.price) >= min && (max ? Number(land.price) <= max : true),
      );
    }

    // Size filter
    if (sizeRange !== "all" && !error) {
      const [min, max] = sizeRange.split("-").map(Number);
      filtered = filtered.filter(
        (land) =>
          Number(land.size) >= min && (max ? Number(land.size) <= max : true),
      );
    }

    setFilteredFarmlands(filtered);
  }, [searchQuery, selectedRegion, priceRange, sizeRange, farmlands]);

  const FarmlandCard = ({ farmland }: { farmland: FarmlandType }) => (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <Image
          src={"/placeholder.svg"}
          alt={farmland.title}
          width={400}
          height={250}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex gap-2">
          {/* {farmland.featured && (
            <Badge className="bg-yellow-500 text-white">⭐ Featured</Badge>
          )} */}
          <Badge
            variant={
              farmland.status === "available"
                ? "default"
                : farmland.status === "reserved"
                  ? "secondary"
                  : "destructive"
            }
          >
            {farmland.status.charAt(0).toUpperCase() + farmland.status.slice(1)}
          </Badge>
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute right-3 bottom-3">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Eye className="mr-1 h-3 w-3" />
            View Details
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="group-hover:text-primary line-clamp-1 text-lg font-semibold transition-colors">
              {farmland.title}
            </h3>
            <div className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
              <MapPin className="h-4 w-4" />
              {farmland.location}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Ruler className="text-primary h-4 w-4" />
              <span>{farmland.size} acres</span>
            </div>
            <div className="flex items-center gap-2">
              {farmland.waterAccess ? (
                <Droplets className="h-4 w-4 text-blue-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-gray-400" />
              )}
              <span>
                Water {farmland.waterAccess ? "Available" : "Not Available"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {farmland.electricity ? (
                <Zap className="h-4 w-4 text-yellow-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-gray-400" />
              )}
              <span>
                Electricity{" "}
                {farmland.electricity ? "Available" : "Not Available"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-green-500" />
              <span>{farmland.roadAccess} Road</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {farmland.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {farmland.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{farmland.features.length - 3} more
              </Badge>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-primary text-2xl font-bold">
                  GHC{farmland.price.toLocaleString()}
                </div>
                <div className="text-muted-foreground text-sm">
                  GHC{farmland.pricePerAcre.toLocaleString()}/acre
                </div>
              </div>
              <Button asChild disabled={farmland.status !== "available"}>
                <Link href={`/farmlands/${farmland.id}`}>
                  {farmland.status === "available"
                    ? "View Details"
                    : "Contact Us"}
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
              Available Farmlands
            </Badge>
            <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Find Your Perfect Farmland
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              Discover premium agricultural land across Ghana. From small plots
              for organic farming to large estates for commercial agriculture.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-background/80 rounded-2xl border p-6 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 lg:flex-row">
              <div className="relative max-w-md flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Search by location, title, or features..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Select
                  value={selectedRegion}
                  onValueChange={setSelectedRegion}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="ashanti">Ashanti</SelectItem>
                    <SelectItem value="eastern">Eastern</SelectItem>
                    <SelectItem value="central">Central</SelectItem>
                    <SelectItem value="western">Western</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-50000">Under GHC50K</SelectItem>
                    <SelectItem value="50000-100000">GHC50K - 100K</SelectItem>
                    <SelectItem value="100000-200000">
                      GHC100K - 200K
                    </SelectItem>
                    <SelectItem value="200000">Above GHC200K</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sizeRange} onValueChange={setSizeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    <SelectItem value="0-10">Under 10 acres</SelectItem>
                    <SelectItem value="10-25">10-25 acres</SelectItem>
                    <SelectItem value="25-50">25-50 acres</SelectItem>
                    <SelectItem value="50">Above 50 acres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-4 py-12 md:px-10">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredFarmlands.length} farmland
              {filteredFarmlands.length !== 1 ? "s" : ""} found
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedRegion("all");
                setPriceRange("all");
                setSizeRange("all");
              }}
            >
              Clear Filters
            </Button>
          </div>

          {loading ? (
            <div className="flex h-64 flex-col items-center justify-center space-y-4">
              <Loader className="text-primary h-12 w-12 animate-spin" />
              <p className="text-muted-foreground">Loading farmlands...</p>
            </div>
          ) : filteredFarmlands.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredFarmlands.map((farmland) => (
                <FarmlandCard key={farmland.id} farmland={farmland} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mb-4 text-6xl">🏞️</div>
              <h3 className="mb-2 text-2xl font-semibold">
                No farmlands found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or contact us for custom
                requirements.
              </p>
              <Button asChild>
                <Link href="/contacts">Contact Us</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground px-4 py-16 md:px-10">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Can't Find What You're Looking For?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
            We have access to exclusive farmland listings. Contact our team for
            personalized assistance in finding your perfect agricultural
            investment.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contacts">
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Link>
            </Button>
            <Button
              size="lg"
              className="hover:text-primary border border-white bg-transparent px-8 py-5 text-lg text-white hover:bg-white"
              asChild
            >
              <Link href="/contacts">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Visit
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
