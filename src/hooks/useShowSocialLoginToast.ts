"use client";

import { showToast } from "@/utils/showToast";
import { useEffect } from "react";
import { deleteCookie, hasCookie } from "./handleCookies";

export const useShowSocialLoginToast = () => {
  useEffect(() => {
    const showSignInToast = async () => {
      const signedIn = await hasCookie("signin-success");

      if (signedIn) {
        showToast("success", "Signed In", "You have successfully signed in");
        await deleteCookie("signin-success");
      }
    };

    showSignInToast();
  }, []);
};
