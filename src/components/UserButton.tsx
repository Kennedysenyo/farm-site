"use client";
import { ChevronDown, User } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOutButton } from "./LogOutButton";

export const UserButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>();

  useEffect(() => {
    const handleClickOutsie = () => {
      if (isOpen) setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutsie);
    return () => document.removeEventListener("click", handleClickOutsie);
  }, [isOpen]);
  return (
    <>
      <div className="relative flex-col transition-all duration-200">
        <Button
          variant="ghost"
          size="sm"
          className={`${isOpen ? "bg-accent/40" : ""} hover:bg-accent/10 h-9 w-9 rounded-full p-0`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <User className="h-4 w-4" />
        </Button>
        {isOpen && (
          <div className="border-border/50 bg-muted/80 slide-in-from-top-20 absolute top-12 -left-38 z-50 flex w-[300px] flex-col gap-2 rounded-b-lg border-t p-2 backdrop-blur-xl transition-all md:-left-50 lg:-left-45">
            <Link
              className="border-border hover:bg-accent/30 hover:text-accent-foreground flex justify-between border-b py-1 pl-4 text-sm"
              href="/profile"
            >
              Profile
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Link>
            <Link
              className="border-border hover:bg-accent/30 hover:text-accent-foreground flex justify-between border-b py-1 pl-4 text-sm"
              href="/orders"
            >
              Orders
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Link>
            <LogOutButton />
          </div>
        )}{" "}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      )}
    </>
  );
};
