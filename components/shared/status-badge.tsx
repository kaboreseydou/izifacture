"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type InvoiceStatusType = "payee" | "envoyee" | "brouillon" | "en_retard";

interface StatusBadgeProps {
  status: InvoiceStatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = {
    payee: {
      label: "Payée",
      badgeClass:
        "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60",
      dotClass: "bg-emerald-500",
    },
    envoyee: {
      label: "Envoyée",
      badgeClass:
        "bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60",
      dotClass: "bg-amber-500",
    },
    brouillon: {
      label: "Brouillon",
      badgeClass:
        "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
      dotClass: "bg-gray-400",
    },
    en_retard: {
      label: "En retard",
      badgeClass:
        "bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60",
      dotClass: "bg-rose-500 animate-pulse",
    },
  };

  const item = config[status] || config.brouillon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border shadow-2xs transition-colors",
        item.badgeClass,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", item.dotClass)} />
      <span>{item.label}</span>
    </span>
  );
}
