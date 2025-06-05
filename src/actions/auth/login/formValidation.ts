"use server";

import { loginAction } from "./loginAction";

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

  return { formErrors: {}, success: true, errorMessage: null };
};
