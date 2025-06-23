"use client";

import { showToast } from "@/utils/showToast";
import { useEffect } from "react";
import { deleteCookie, hasCookie } from "./handleCookies";

export const useShowSocialLoginToast = () => {
  useEffect(() => {
    console.log("useSocialLoginToast is running...");
    const showSignInToast = async () => {
      const signedIn = hasCookie("signin-success");

      if (signedIn) {
        showToast("success", "Signed In", "You have successfully signed in");
      }
      deleteCookie("signin-success");
    };

    showSignInToast();
  }, []);
};
