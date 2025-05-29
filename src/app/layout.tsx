import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/providers/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="w-full flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
