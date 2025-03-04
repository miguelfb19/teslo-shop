import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import PaypalProvider from "./providers/PaypalProvider";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Home - Teslo | Shop",
  },
  description: "Tienda virtual creada en el curso de Fernando Herrera DevTales",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <PaypalProvider>
          <SessionProvider>{children}</SessionProvider>
        </PaypalProvider>
      </body>
    </html>
  );
}
