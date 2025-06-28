import { ReactNode } from "react";

export default function AdminPage({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="">This is a test bar</div>
      <div>{children}</div>
    </div>
  );
}
