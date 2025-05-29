"use client";

import { useMobile } from "@/hooks/useMobile";
import { Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { DarkModeToggle } from "./DarkModeToggle";

export const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact US", href: "/#contacts" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const user = null;

  const navElements = navItems.map((item, index) => (
    <Link
      key={index}
      href={item.href}
      scroll={item.href.startsWith("/#")}
      onClick={() => {
        setIsMenuOpen(false);
      }}
      className={`hover:text-accent rounded-md p-1 ${pathname === item.href ? "text-accent" : ""} border-border border-t border-b md:border-none`}
    >
      {item.name}
    </Link>
  ));

  return (
    <header className="bg-muted/95 supports-[backdrop-filter]:bg-muted/60 text-muted-foreground border-border sticky top-0 right-0 left-0 z-50 flex items-center justify-between gap-2 border-b px-4 py-2 backdrop-blur md:gap-4">
      <div className="container mx-auto flex w-full items-center justify-between">
        <Link href="/" className="">
          <Image
            src="/img/logo.png"
            alt="logo"
            width={70}
            height={70}
            priority
          />
        </Link>

        <div className="md:hidden">
          <Button
            variant="secondary"
            className="bg-muted text-muted-foreground"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          {isMenuOpen && (
            <nav className="bg-muted text-foreground absolute top-16 right-0 left-0 z-50 flex flex-col gap-2 p-4 shadow-md transition-all duration-300">
              {navElements}
            </nav>
          )}
        </div>

        <nav className="hidden items-center justify-center gap-3 md:flex">
          {navElements}
        </nav>
      </div>
      <DarkModeToggle />
      {user ? (
        <Button
          variant="secondary"
          className="bg-muted text-muted-foreground border-border rounded-full border"
        >
          <User />
        </Button>
      ) : (
        <Button asChild size="sm" className="px-3 py-1">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </header>
  );
};
