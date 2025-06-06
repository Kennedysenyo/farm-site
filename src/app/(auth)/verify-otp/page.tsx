import { VerifyOTP } from "@/components/VerifyOTP";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function VerifyOTPPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const email = cookieStore.get("email")?.value;
  console.log("==================", token, email);

  if (!token && !email) redirect("/login");
  return <VerifyOTP token={token} email={email} />;
}
