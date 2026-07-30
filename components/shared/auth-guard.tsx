"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/lib/context/app-context";
import { Loader2 } from "lucide-react";

const PUBLIC_PATHS = ["/login", "/register"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userLoading } = useApp();

  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (!userLoading && !user && !isPublicPath) {
      router.push("/login");
    }
  }, [user, userLoading, isPublicPath, router]);

  // Show loading spinner while checking session for protected routes
  if (userLoading && !isPublicPath) {
    return (
      <div className="min-h-screen bg-[#f4f5f8] dark:bg-gray-950 flex flex-col justify-center items-center p-4 text-xs font-bold text-gray-500 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span>Vérification de la session...</span>
      </div>
    );
  }

  // If trying to access protected route when logged out, hide content while redirecting
  if (!userLoading && !user && !isPublicPath) {
    return null;
  }

  return <>{children}</>;
}
