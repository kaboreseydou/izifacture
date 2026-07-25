"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Wallet,
  ArrowLeftRight,
  PieChart,
  BarChart3,
  HelpCircle,
  Settings,
  Search,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
  PlusCircle,
  Receipt,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { label: "Tableau de bord", href: "/", icon: LayoutDashboard },
    { label: "Factures", href: "/factures", icon: FileText, badge: "48" },
    { label: "Devis", href: "/devis", icon: PieChart },
    { label: "Transactions", href: "/transactions", icon: ArrowLeftRight },
    { label: "Trésorerie", href: "/tresorerie", icon: Wallet },
    { label: "Rapports", href: "/rapports", icon: BarChart3 },
  ];

  const secondaryItems = [
    { label: "Aide & Support", href: "/support", icon: HelpCircle },
    { label: "Paramètres", href: "/parametres", icon: Settings },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#f4f5f8] dark:bg-gray-900 border-r border-gray-200/80 dark:border-gray-800 w-64 p-4 transition-all duration-300">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-2 py-2 mb-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">
              facture<span className="text-blue-600">.izi</span>
            </span>
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-gray-400">
              SaaS UEMOA / CEMAC
            </span>
          </div>
        </Link>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Quick Search Input */}
      <div className="relative mb-5 px-1">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full pl-9 pr-10 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-600">
          ⌘F
        </kbd>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto space-y-6 px-1">
        <div>
          <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase px-3 block mb-2">
            MENU
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
                    "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150",
                    isActive
                      ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border border-gray-200/60 dark:border-gray-700/60"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-200/60 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
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
                  {item.badge && (
                    <span
                      className={cn(
                        "px-2 py-0.5 text-[10px] font-bold rounded-full",
                        isActive
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                          : "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
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
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200/60 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white transition-colors",
                    isActive && "bg-white dark:bg-gray-800 text-gray-900 shadow-sm"
                  )}
                >
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400">
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

      {/* User Account Card at Bottom */}
      <div className="pt-3 border-t border-gray-200/60 dark:border-gray-800 mt-auto">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/70 dark:border-gray-700/60 shadow-sm">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
              KM
            </div>
            <div className="overflow-hidden text-left">
              <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                Kofi Mensah
              </p>
              <p className="text-[10px] text-gray-400 truncate">
                kofi@atlantique.sn
              </p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block h-screen sticky top-0 shrink-0">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={onMobileClose}
          />
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
}
