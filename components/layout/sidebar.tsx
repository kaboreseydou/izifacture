"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/lib/context/app-context";
import { supabase } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  FileText,
  Users,
  HelpCircle,
  Settings,
  Search,
  Moon,
  Sun,
  X,
  Sparkles,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { companyProfile } = useApp();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    { label: "Tableau de bord", href: "/", icon: LayoutDashboard },
    { label: "Factures", href: "/factures", icon: FileText },
    { label: "Clients", href: "/clients", icon: Users },
  ];

  const secondaryItems = [
    { label: "Paramètres", href: "/parametres", icon: Settings },
    { label: "Aide & Support", href: "/support", icon: HelpCircle },
  ];

  // Initials for Avatar
  const nameParts = (companyProfile.name || "Responsable").trim().split(" ");
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : nameParts[0].substring(0, 2).toUpperCase();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block h-screen sticky top-0 shrink-0">
        <div className="flex flex-col h-full bg-[#f4f5f8] dark:bg-gray-900 border-r border-gray-200/70 dark:border-gray-800 w-64 p-4 transition-all duration-300 select-none">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 py-2 mb-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 fill-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">
                facture<span className="text-blue-600">.izi</span>
              </span>
            </Link>
          </div>

          {/* Quick Search Input */}
          <div className="relative mb-5 px-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-9 pr-9 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-600">
              ⌘F
            </kbd>
          </div>

          {/* Navigation List */}
          <div className="flex-1 overflow-y-auto space-y-6 px-1">
            <div>
              <span className="text-[11px] font-extrabold tracking-wider text-gray-400 uppercase px-3 block mb-2">
                MENU PRINCIPAL
              </span>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onMobileClose}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150",
                        isActive
                          ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border border-gray-200/70 dark:border-gray-700 font-bold"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            "w-4 h-4",
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-500"
                          )}
                        />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Secondary Links */}
            <div className="pt-2 border-t border-gray-200/60 dark:border-gray-800">
              <nav className="space-y-1">
                {secondaryItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onMobileClose}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white transition-colors",
                        isActive && "bg-white dark:bg-gray-800 text-gray-900 shadow-sm font-bold"
                      )}
                    >
                      <Icon className="w-4 h-4 text-gray-500" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    {darkMode ? (
                      <Moon className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Sun className="w-4 h-4 text-amber-500" />
                    )}
                    <span>Mode sombre</span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleDarkMode}
                    className={cn(
                      "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                      darkMode ? "bg-blue-600" : "bg-gray-300"
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        darkMode ? "translate-x-4" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* User Account Card with Sign Out Button */}
          <div className="pt-3 border-t border-gray-200/60 dark:border-gray-800 mt-auto">
            <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 shadow-sm">
              <Link href="/parametres" className="flex items-center gap-2.5 overflow-hidden flex-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                  {initials}
                </div>
                <div className="overflow-hidden text-left">
                  <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {companyProfile.name}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate">
                    {companyProfile.email}
                  </p>
                </div>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                title="Déconnexion"
                className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={onMobileClose}
          />
          <div className="relative z-10">
            <div className="flex flex-col h-full bg-[#f4f5f8] dark:bg-gray-900 border-r border-gray-200/70 dark:border-gray-800 w-64 p-4">
              <div className="flex items-center justify-between px-2 py-2 mb-4">
                <Link href="/" className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md">
                    <Sparkles className="w-4 h-4 fill-white" />
                  </div>
                  <span className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">
                    facture<span className="text-blue-600">.izi</span>
                  </span>
                </Link>
                <button
                  onClick={onMobileClose}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6">
                <nav className="space-y-1">
                  {[...navItems, ...secondaryItems].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onMobileClose}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold",
                        pathname === item.href
                          ? "bg-white text-gray-900 font-bold shadow-sm"
                          : "text-gray-600"
                      )}
                    >
                      <item.icon className="w-4 h-4 text-blue-600" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-800 mt-auto">
                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
