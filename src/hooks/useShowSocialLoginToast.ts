"use client";

import { useEffect, useState } from "react";
import { hasCookie } from "./handleCookies";

export const useShowSocialLoginToast = () => {
  const [cookieExist, setCookieExist] = useState(false);
  useEffect(() => {
    console.log("useSocialLoginToast is running...");
    const showSignInToast = async () => {
      setCookieExist(hasCookie("signin-success"));
    };

    showSignInToast();
  }, []);
  return cookieExist;
};
