import { Suspense } from "react";
import { Login } from "@/components/LoginPage";

export function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
