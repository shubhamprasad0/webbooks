import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ContextProviders from "./providers";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebBooks",
  description: "Create and manage books and authors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ContextProviders>
          <Header />
          {children}
          <Toaster />
        </ContextProviders>
      </body>
    </html>
  );
}
