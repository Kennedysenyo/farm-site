import { createAdminClient } from "@/lib/supabase/server";
import { handleError } from "@/utils/handleError";

export const generateToken = async (
  type: "signup" | "recovery",
  email: string,
  password: string,
) => {
  try {
    const { auth } = await createAdminClient();
    const { data, error } = await auth.admin.generateLink({
      type,
      email,
      password,
    });

    if (error || !data) throw error;
    const otp = data.properties.email_otp;
    console.log("Signup OTP", otp);
    return null;
  } catch (error) {
    return handleError(error);
  }
};
