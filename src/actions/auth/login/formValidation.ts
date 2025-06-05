"use server";

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
  return { formErrors: {}, success: true, errorMessage: null };
};
