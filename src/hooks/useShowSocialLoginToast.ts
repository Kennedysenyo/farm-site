"use client";

import { useEffect } from "react";
import { deleteCookie, hasCookie } from "./handleCookies";
import { showToast } from "@/utils/showToast";

export const useShowSocialLoginToast = () => {
  useEffect(() => {
    console.log("useSocialLoginToast is running...");
    const showSignInToast = async () => {
      const cookieExist = await hasCookie("signin-success");

      if (cookieExist) {
        showToast("success", "Signed In", "You have successfully signed in");

        await deleteCookie("signin-success");
      }
    };

    showSignInToast();
  }, []);
};
