import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/providers/modal-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ProgressProvider } from "@/providers/progress-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flexmart – E-commerce platform",
  description:
    "Reflecting flexibility and versatility in creating and managing online stores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <ModalProvider />
            <ToastProvider />
            <ProgressProvider />

            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main>{children}</main>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </QueryProvider>
  );
}
