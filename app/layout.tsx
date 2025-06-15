import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ReduxProvider } from "@/store/provider";
import { cn } from "@/lib/utils";

// Initialize Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trackify",
  description: "Trackify is a platform for tracking and analyzing data",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(poppins.variable, "font-sans antialiased")}
      suppressHydrationWarning
    >
      <body className={cn("min-h-screen bg-background antialiased")}>
        <ReduxProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            expand
            visibleToasts={6}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
