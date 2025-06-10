"use server";

import { SetNewPassword } from "@/components/SetNewPassword";
import { cookies } from "next/headers";

export default async function SetNewPasswordPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("email")?.value;
  return <SetNewPassword email={email} />;
}
