import { createAdminClient } from "@/lib/supabase/server";
import { handleError } from "@/utils/handleError";

export const generateToken = async (
  type: "signup" | "recovery",
  email: string,
  password?: string,
): Promise<string | null> => {
  try {
    const { auth } = await createAdminClient();

    if (password && type === "signup") {
      const { data, error } = await auth.admin.generateLink({
        type,
        email,
        password,
      });

      if (error) throw error;
      const otp = data.properties.email_otp;
      console.log("Signup OTP", otp);
    } else {
      const { data, error } = await auth.admin.generateLink({
        type: "recovery",
        email,
      });

      if (error) throw error;
      const otp = data.properties.email_otp;
      console.log("Recovery OTP", otp);
    }

    return null;
  } catch (error) {
    return handleError(error);
  }
};
