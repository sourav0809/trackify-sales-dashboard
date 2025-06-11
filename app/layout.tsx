// app/layout.tsx (or app/layout.js)
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

// Setup Poppins with a variable name (optional)
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sales Dashboard",
  description: "Modern sales dashboard with analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-gray-50/50">
        <Sidebar />
        <main>{children}</main>
      </body>
    </html>
  );
}
