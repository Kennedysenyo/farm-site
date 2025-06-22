"use server";

import { createClient } from "@/lib/supabase/server";

import { redirect } from "next/navigation";

type ProviderType = "google" | "apple";
const signInWith = (provider: ProviderType) => async () => {
  const { auth } = await createClient();

  const callbakURL = `${process.env.BASE_URL}/api/auth/callback/`;

  const { data, error } = await auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: callbakURL,
    },
  });
  if (!data || error) console.error(error);

  const { url } = data;
  redirect(url!);
};

export const signInWithGoogle = signInWith("google");
