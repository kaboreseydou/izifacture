"use client";

import React from "react";
import {
  FileText,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Coins,
} from "lucide-react";
import { DashboardStats } from "@/lib/data/mock/fixtures";
import { formatFCFA } from "@/lib/utils";

interface StatCardsProps {
  stats: DashboardStats;
}

export function StatCards({ stats }: StatCardsProps) {
  const cards = [
    {
      title: "Chiffre d'affaires facturé",
      value: formatFCFA(stats.totalBilled),
      subtitle: "+14.2% ce mois-ci",
      trend: "up",
      trendValue: "+14.2%",
      icon: Coins,
      iconBg: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
      borderColor: "border-blue-100 dark:border-blue-900/40",
    },
    {
      title: "Total Encaissé",
      value: formatFCFA(stats.totalPaid),
      subtitle: "76.9% de taux d'encaissement",
      trend: "up",
      trendValue: "+18.5%",
      icon: CheckCircle2,
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
      borderColor: "border-emerald-100 dark:border-emerald-900/40",
    },
    {
      title: "Restant à encaisser",
      value: formatFCFA(stats.totalPending),
      subtitle: `${stats.pendingCount} factures en attente`,
      trend: "down",
      trendValue: "5 impayés",
      icon: Clock,
      iconBg: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      borderColor: "border-amber-100 dark:border-amber-900/40",
    },
    {
      title: "Factures émises",
      value: `${stats.totalInvoices} factures`,
      subtitle: "Ce mois: 12 édictées",
      trend: "up",
      trendValue: "+8",
      icon: FileText,
      iconBg: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
      borderColor: "border-purple-100 dark:border-purple-900/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-white dark:bg-gray-900 border ${card.borderColor} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>

            <div>
              <div className="text-xl lg:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">
                {card.value}
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400 dark:text-gray-500 font-medium">
                  {card.subtitle}
                </span>
                <span
                  className={`inline-flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded-md ${
                    card.trend === "up"
                      ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400"
                  }`}
                >
                  {card.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  {card.trendValue}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
