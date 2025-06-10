"use server";

import { createClient } from "@/lib/supabase/server";
import { isCorrectFormat } from "@/utils/format-checker";
import { handleError } from "@/utils/handleError";
import { cookies } from "next/headers";

type FormErrors = {
  password?: string;
  confirmPassword?: string;
};

export type FormState = {
  errors: FormErrors;
  success: boolean;
  errorMessage: string | null;
};

const updatePassword = async (password: string): Promise<string | null> => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.updateUser({ password });
    if (error) throw error;
    return null;
  } catch (error) {
    return handleError(error);
  }
};

export const validateSetNewPassword = async (
  preveState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const password = (formData.get("password") as string).trim();
  const confirmPassword = (formData.get("confirm-password") as string).trim();

  const errors: FormErrors = {};

  if (!password) errors.password = "Password is required";
  else if (!isCorrectFormat("password", password))
    errors.password = "Set a stronger password";
  if (!confirmPassword) errors.confirmPassword = "Confirm password";
  else if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do NOT match";

  if (Object.keys(errors).length > 0)
    return { errors, success: false, errorMessage: null };

  const errorMessage = await updatePassword(password);
  if (errorMessage) return { errors: {}, success: false, errorMessage };

  const cookieStore = await cookies();
  if (cookieStore.has("email")) cookieStore.delete("email");

  return { errors: {}, success: true, errorMessage: null };
};
