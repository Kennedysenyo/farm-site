import { createAdminClient } from "@/lib/supabase/server";
import { handleError } from "@/utils/handleError";
import { sendOTPEmail } from "../emails/emails";

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

      const response = await sendOTPEmail("signup", email, otp);
      if (response) console.error(response);
    } else {
      const { data, error } = await auth.admin.generateLink({
        type: "recovery",
        email,
      });

      if (error) throw error;

      const otp = data.properties.email_otp;
      console.log("Recovery OTP", otp);

      const response = await sendOTPEmail("recovery", email, otp);
      if (response) console.error(response);
    }

    return null;
  } catch (error) {
    return handleError(error);
  }
};
