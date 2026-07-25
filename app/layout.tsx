import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "facture.izi — SaaS de facturation UEMOA / CEMAC",
  description:
    "Facturez en 1 minute, suivez vos encaissements et gérez vos impayés sans prise de tête.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable}`}>
      <body className="bg-[#f7f8fc] dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
