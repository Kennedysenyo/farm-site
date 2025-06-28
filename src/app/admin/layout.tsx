import { ReactNode } from "react";

export default function AdminPage({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="flex w-full justify-center">This is a test bar</div>
      {children}
    </div>
  );
}
