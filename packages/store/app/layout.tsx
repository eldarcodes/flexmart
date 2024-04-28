import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import "./globals.css";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "A store for all your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
