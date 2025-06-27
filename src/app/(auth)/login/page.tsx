import { Suspense } from "react";
import { Login } from "@/components/LoginPage";
import { Loader } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Login />
    </Suspense>
  );
}
