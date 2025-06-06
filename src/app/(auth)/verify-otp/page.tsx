import { VerifyOTP } from "@/components/VerifyOTP";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function VerifyOTPPage() {
  const cookieStore = await cookies();
  const signupObject = cookieStore.get("signup")?.value;
  const recoveryEmail = cookieStore.get("email")?.value;

  if (!signupObject && !recoveryEmail) redirect("/login");
  return <VerifyOTP />;
}
