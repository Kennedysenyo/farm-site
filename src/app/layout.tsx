import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Start Agri Consult",
  description:
    "Quality farm seedlings, fertilizers, and expert farming consultancy to help you grow a thriving agribusiness across Ghana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div className="flex flex-col">
        <main className="flex-1 w-full">
          <body>{children}</body>
        </main>
      </div>
    </html>
  );
}
