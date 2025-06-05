"use server";

type SignupFormError = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: boolean;
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
  return { formErrors: {}, success: true, errorMessage: null };
};
