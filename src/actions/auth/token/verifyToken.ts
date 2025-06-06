"use server";

import { createClient } from "@/lib/supabase/server";
import { handleError } from "@/utils/handleError";
import { cookies } from "next/headers";

type MissingField = {
  otp?: string;
};

export type OTPFormState = {
  formError: MissingField;
  success: boolean;
  errorMessage: string | null;
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

    const cookieStore = await cookies();
    if (cookieStore.has("email")) {
      cookieStore.delete("email");
    }

    if (cookieStore.has("token")) {
      cookieStore.delete("token");
    }
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
