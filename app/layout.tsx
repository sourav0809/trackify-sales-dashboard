// app/layout.tsx (or app/layout.js)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ReduxProvider } from "@/store/provider";
import AuthGuard from "@/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sales Dashboard",
  description: "A modern sales analytics dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-50/50"}>
        <ReduxProvider>
          <AuthGuard>{children}</AuthGuard>
          <Toaster position="top-right" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
