"use server";

import { isCorrectFormat } from "@/utils/format-checker";
import { generateToken } from "../token/generateToken";
import { cookies } from "next/headers";

type MissingField = {
  email?: string;
};

export type FormState = {
  error: MissingField;
  success: boolean;
  errorMessage: string | null;
};

export const validateForgotPassword = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const email = (formData.get("email") as string).trim();

  const error: MissingField = {};

  if (!email) error.email = "Email is required";
  else if (!isCorrectFormat("email", email))
    error.email = "Enter a valid email";

  if (Object.keys(error).length > 0)
    return { error, success: false, errorMessage: null };

  const errorMessage = await generateToken("recovery", email);
  if (errorMessage) return { error: {}, success: false, errorMessage };

  const cookiesStore = await cookies();
  cookiesStore.set("email", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });

  cookiesStore.set("recoveryMode", "true", {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production",
    maxAge: 15 * 60,
    path: "/",
  });

  return { error: {}, success: true, errorMessage: null };
};
