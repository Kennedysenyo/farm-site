"use client";
import { useEffect, useState } from "react";

export const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(navigator.onLine);
    };

    handleOnline();

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOnline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOnline);
    };
  }, []);

  return isOnline;
};
