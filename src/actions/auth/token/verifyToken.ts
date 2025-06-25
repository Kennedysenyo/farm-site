"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { handleError } from "@/utils/handleError";
import { cookies } from "next/headers";
import { sendWelcomeEmail } from "../emails/emails";
import { eq } from "drizzle-orm";

type MissingField = {
  otp?: string;
};

export type OTPFormState = {
  formError: MissingField;
  success: boolean;
  errorMessage: string | null;
};

export const storeUserData = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  subscribeNewsletter: boolean,
) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  try {
    await supabase.auth.updateUser({
      data: {
        firstName,
        lastName,
        phone,
        role: user.email === "kensenyocoding@gmail.com" ? "admin" : "user",
      },
    });

    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!userExists) {
      await db.insert(users).values({
        id: user.id,
        firstName,
        lastName,
        email,
        phone,
        subscribeNewsletter,
      });
    } else if (userExists) {
      await db
        .update(users)
        .set({
          id: user.id,
          firstName,
          lastName,
          email,
          phone,
          subscribeNewsletter,
        })
        .where(eq(users.email, email));
    }

    const response = await sendWelcomeEmail(email, firstName);
    if (response) console.error(response);

    const cookieStore = await cookies();
    if (cookieStore.has("email")) cookieStore.delete("email");
    if (cookieStore.has("token")) cookieStore.delete("token");
  } catch (error) {
    console.error("Error storing user data:", error);
    throw error;
  }
};

export const verifyOTP = async (
  type: "signup" | "recovery",
  email: string,
  token: string,
): Promise<string | null> => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.verifyOtp({
      type,
      email,
      token,
    });

    if (error) throw error;

    return null;
  } catch (error) {
    return handleError(error);
  }
};

export const validateOTPForm = async (
  { type, email }: { type: "signup" | "recovery"; email: string },
  prevState: OTPFormState,
  formData: FormData,
): Promise<OTPFormState> => {
  const otp = (formData.get("otp") as string).trim();

  const formError: MissingField = {};

  if (!otp) formError.otp = "Enter OTP code";

  if (Object.keys(formError).length > 0)
    return { formError: {}, success: false, errorMessage: null };

  const errorMessage = await verifyOTP(type, email, otp);
  if (errorMessage) return { formError: {}, success: false, errorMessage };

  return { formError: {}, success: true, errorMessage: null };
};
