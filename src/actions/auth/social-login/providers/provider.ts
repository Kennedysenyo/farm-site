"use server";

import { createClient } from "@/lib/supabase/server";

import { redirect } from "next/navigation";

type ProviderType = "google" | "apple";
const signInWith = (provider: ProviderType) => async () => {
  const origin =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.BASE_URL!;

  const { auth } = await createClient();

  const callbackURL = `${origin}/api/auth/callback/`;

  const { data, error } = await auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: callbackURL,
    },
  });
  if (!data || error) console.error(error);

  const { url } = data;
  redirect(url!);
};

export const signInWithGoogle = signInWith("google");
