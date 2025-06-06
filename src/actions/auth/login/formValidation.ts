"use server";

import { cookies } from "next/headers";
import { loginAction } from "./loginAction";
import { redis } from "@/lib/redis/redis";
import { caesarCript } from "@/utils/caesarCript";

type LoginFormError = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type LoginFormState = {
  formErrors: LoginFormError;
  success: boolean;
  errorMessage: string | null;
};

export const validateLogin = async (
  prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> => {
  const email = (formData.get("email") as string).trim();
  const password = (formData.get("password") as string).trim();

  const formErrors: LoginFormError = {};

  if (!email) formErrors.email = "Emaail is required";
  if (!password) formErrors.password = "Password is required";

  if (Object.keys(formErrors).length > 0)
    return { formErrors, success: false, errorMessage: null };

  const errorMessage = await loginAction(email, password);
  if (errorMessage) return { formErrors: {}, success: false, errorMessage };

  const token = crypto.randomUUID();
  console.log("The redis token is ", token);
  await redis.set(
    `signup_token:${token}`,
    caesarCript("encrypt", password, password.length),
    {
      ex: 15 * 60,
    },
  );

  console.log(
    "This is the password: ",
    caesarCript("encrypt", password, password.length),
  );

  const cookieStore = await cookies();
  cookieStore.set("signup", JSON.stringify({ email, password }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });

  cookieStore.set("token", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });

  return { formErrors: {}, success: true, errorMessage: null };
};
