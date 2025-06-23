"use client";

import { showToast } from "@/utils/showToast";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "./handleCookies";

export const useShowSocialLoginToast = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    const showSignInToast = async () => {
      setIsSignIn(await getCookie("signin-success"));

      if (isSignIn) {
        showToast("success", "Signed In", "You have successfully signed in");
      }

      await deleteCookie("signin-success");
    };

    showSignInToast();
  }, [isSignIn]);
  return;
};
