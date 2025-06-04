"use client";

import { useMobile } from "@/hooks/useMobile";
import { Menu, User, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { DarkModeToggle } from "./DarkModeToggle";

export const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products", badge: "New" },
  { name: "FarmLands", href: "/farm-lands", badge: "🔥" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contacts" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  const isMobile = useMobile();

  const user = null;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  const navElements = navItems.map((item, index) => {
    const isActive =
      pathname === item.href ||
      (item.href !== "/" && pathname.startsWith(item.href));

    return (
      <Link
        key={index}
        href={item.href}
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(false);
        }}
        className={cn(
          "relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
          "hover:bg-accent/10 hover:text-accent-foreground",
          isActive
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground",
          isMobile &&
            "border-border/50 w-full justify-between rounded-none border-b px-0 py-4",
        )}
      >
        <span className="flex items-center gap-2">
          {item.name}
          {item.badge && (
            <Badge
              variant="secondary"
              className={`${item.badge === "Hot" ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"} px-2 py-0.5 text-xs`}
            >
              {item.badge}
            </Badge>
          )}
        </span>
        {isActive && !isMobile && (
          <div className="bg-primary absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full" />
        )}
        {isMobile && <ChevronDown className="h-4 w-4 opacity-50" />}
      </Link>
    );
  });

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          "border-b backdrop-blur-xl",
          isScrolled
            ? "bg-background/80 border-border/50 shadow-sm"
            : "bg-background/60 border-transparent",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative">
                <div className="bg-primary/20 absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                <Image
                  src="/img/logo.png"
                  alt="logo"
                  width={40}
                  height={40}
                  priority
                  className="relative rounded-full transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <span className="from-primary to-primary/70 mr-2 hidden bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent sm:block">
                StartAgri
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-1 md:flex">
              {navElements}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              <DarkModeToggle />

              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-accent/10 h-9 w-9 rounded-full p-0"
                >
                  <User className="h-4 w-4" />
                </Button>
              ) : (
                <Button asChild size="sm" className="hidden sm:flex">
                  <Link href="/login">Login</Link>
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 rounded-full p-0 md:hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                <div className="relative h-5 w-5">
                  <Menu
                    className={cn(
                      "absolute inset-0 h-5 w-5 transition-all duration-200",
                      isMenuOpen
                        ? "rotate-90 opacity-0"
                        : "rotate-0 opacity-100",
                    )}
                  />
                  <X
                    className={cn(
                      "absolute inset-0 h-5 w-5 transition-all duration-200",
                      isMenuOpen
                        ? "rotate-0 opacity-100"
                        : "-rotate-90 opacity-0",
                    )}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out md:hidden",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="border-border/50 bg-background/95 border-t backdrop-blur-xl">
            <nav className="container mx-auto space-y-1 px-4 py-4">
              {navElements}

              {/* Mobile Login Button */}
              {!user && (
                <div className="border-border/50 mt-4 border-t pt-4">
                  <Button
                    asChild
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};
