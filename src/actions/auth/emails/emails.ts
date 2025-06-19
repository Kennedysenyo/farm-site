"use server";

import OTPEmail from "@/emails/OTPEmail";
import WelcomeEmail from "@/emails/WelcomeEmail";
import { handleError } from "@/utils/handleError";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**Send Welcome emails to users on signup */
export const sendWelcomeEmail = async (
  email: string,
  name: string,
): Promise<string | null> => {
  try {
    const { data, error } = await resend.emails.send({
      from: "StartAgri <welcome@kencoding.dev>",
      to: email,
      subject: "Welcome to StartAgri",
      react: WelcomeEmail({ name }),
    });

    if (!data || error) throw error;
    return null;
  } catch (error) {
    return handleError(error);
  }
};

/**Send OTP to emails of users on signup and password recovery */
export const sendOTPEmail = async (
  type: "signup" | "recovery",
  email: string,
  otp: string,
): Promise<string | null> => {
  try {
    const { data, error } = await resend.emails.send({
      from: "StartAgri <noreply@kencoding.dev>",
      to: email,
      subject: "OPT Verification",
      react: OTPEmail({ type, otp }),
    });
    if (!data || error) throw error;
    return null;
  } catch (error) {
    return handleError(error);
  }
};
