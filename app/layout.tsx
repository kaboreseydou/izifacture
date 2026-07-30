import type { Metadata } from "next";
import { AppProvider } from "@/lib/context/app-context";
import { AuthGuard } from "@/components/shared/auth-guard";
import "./globals.css";

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
    <html lang="fr">
      <body className="bg-[#f7f8fc] dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen antialiased selection:bg-blue-600 selection:text-white font-sans">
        <AppProvider>
          <AuthGuard>{children}</AuthGuard>
        </AppProvider>
      </body>
    </html>
  );
}
