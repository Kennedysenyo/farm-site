"use client";

import { logOut } from "@/actions/auth/log-out/logout";
import { Button } from "./ui/button";
import { showToast } from "@/utils/showToast";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const LogOutButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOutClick = async () => {
    const errorMessage = await logOut();
    if (errorMessage) {
      showToast(
        "error",
        "Error!",
        errorMessage === "fetch failed"
          ? "Failed to log out. Try again"
          : errorMessage,
      );
    } else if (!errorMessage) {
      showToast("success", "Logged Out", "You have successfully signed out.");
      if (pathname === "/order" || pathname === "/admin") router.replace("/");
    }
  };

  return (
    <Button
      variant="outline"
      className="from-accent/80 to-muted/80 cursor-pointer bg-gradient-to-br"
      onClick={handleLogOutClick}
    >
      Log Out
    </Button>
  );
};
