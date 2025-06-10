import { redis } from "@/lib/redis/redis";
import { createAdminClient } from "@/lib/supabase/server";
import { caesarCrypt } from "@/utils/caesarCrypt";
import { isCorrectFormat } from "@/utils/format-checker";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1h"),
});

export const POST = async (request: NextRequest) => {
  try {
    const { email, token } = await request.json();
    if (!email && !isCorrectFormat("email", email))
      return NextResponse.json(
        { error: { message: "Email is required" } },
        { status: 400 },
      );

    const { success } = await ratelimit.limit(email);
    if (!success) {
      return NextResponse.json(
        { error: { message: "Too many requests. Try again later." } },
        { status: 429 },
      );
    }

    if (token) {
      const res: string | null = await redis.get(`signup_token:${token}`);
      if (!res)
        return NextResponse.json(
          { error: { message: "Invalid token" } },
          { status: 400 },
        );
      const { password: encryptedPasword } =
        typeof res === "object" ? res : await JSON.parse(res);

      const decryptedPassword = caesarCrypt(
        "decrypt",
        encryptedPasword,
        encryptedPasword.length,
      );

      const { auth } = await createAdminClient();
      const { data, error } = await auth.admin.generateLink({
        type: "signup",
        email,
        password: decryptedPassword,
      });

      if (!data || error) throw error;
      const otp = data.properties.email_otp;
      console.log("Signup Code Resend:", otp);
      return NextResponse.json("Code resend successfully", { status: 200 });
    }

    const { auth } = await createAdminClient();
    const { data, error } = await auth.admin.generateLink({
      type: "recovery",
      email,
    });

    if (!data || error) throw error;
    const otp = data.properties.email_otp;
    console.log("Recovery Code Resend:", otp);
    return NextResponse.json("Code resend successfully", { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json(error.message, { status: 500 });
    }
    return NextResponse.json(error, { status: 400 });
  }
};
