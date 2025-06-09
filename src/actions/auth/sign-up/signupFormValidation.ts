"use server";

import { isCorrectFormat } from "@/utils/format-checker";
import { generateToken } from "../token/generateToken";
import { cookies } from "next/headers";
import { caesarCrypt } from "@/utils/caesarCrypt";
import { redis } from "@/lib/redis/redis";

type SignupFormError = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  subscribeNewsletter?: string;
};

export type SignupFormState = {
  formErrors: SignupFormError;
  success: boolean;
  errorMessage: string | null;
};

export const validateSignUp = async (
  prevState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> => {
  const firstName = (formData.get("first-name") as string).trim();
  const lastName = (formData.get("last-name") as string).trim();
  const email = (formData.get("email") as string).trim();
  const phone = (formData.get("phone") as string).trim();
  const password = (formData.get("password") as string).trim();
  const agreeToTerms = formData.get("agreeToTerms");
  const confirmPassword = (formData.get("confirm-password") as string).trim();

  const formErrors: SignupFormError = {};

  if (!firstName) formErrors.firstName = "First name is required";
  if (!lastName) formErrors.lastName = "Last name is required";
  if (!email) formErrors.email = "Enmail is required";
  if (!phone) formErrors.phone = "Phone is required";
  if (!agreeToTerms) formErrors.agreeToTerms = "Agree to terms";
  if (!password) formErrors.password = "Password is required";
  else if (!isCorrectFormat("password", password))
    formErrors.password =
      "Password MUST be at least 8 characters, have numbers, and special characters";
  if (!confirmPassword) formErrors.confirmPassword = "Confirm Password";
  else if (confirmPassword !== password)
    formErrors.confirmPassword = "Does not match password";

  if (Object.keys(formErrors).length > 0)
    return { formErrors, success: false, errorMessage: null };

  const errorMessage = await generateToken("signup", email, password);

  if (errorMessage) return { formErrors: {}, success: false, errorMessage };

  const cryptedPassword = caesarCrypt("encrypt", password, password.length);
  const token = crypto.randomUUID();

  await redis.set(
    `signup_token:${token}`,
    { password: cryptedPassword },
    {
      ex: 15 * 60,
    },
  );

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });

  cookieStore.set("email", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });

  return { formErrors: {}, success: true, errorMessage: null };
};
