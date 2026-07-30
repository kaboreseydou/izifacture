"use client";

import React, { useState } from "react";
import {
  FileText,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Coins,
  Check,
} from "lucide-react";
import { DashboardStats } from "@/lib/data/mock/fixtures";
import { formatFCFA } from "@/lib/utils";

interface StatCardsProps {
  stats: DashboardStats;
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
}

export function StatCards({ stats, activeFilter, onFilterChange }: StatCardsProps) {
  const [clickedCardId, setClickedCardId] = useState<string | null>(null);

  const collectionRate =
    stats.totalBilled > 0
      ? ((stats.totalPaid / stats.totalBilled) * 100).toFixed(1)
      : "0";

  const cards = [
    {
      id: "all",
      title: "Chiffre d'affaires facturé",
      value: formatFCFA(stats.totalBilled),
      subtitle: `${stats.totalInvoices} document${stats.totalInvoices > 1 ? "s" : ""}`,
      trend: "up",
      trendValue: `${stats.totalInvoices} éditée${stats.totalInvoices > 1 ? "s" : ""}`,
      icon: Coins,
      iconBg: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
      activeRing: "ring-2 ring-blue-500 border-blue-500 shadow-md shadow-blue-500/10",
      borderColor: "border-blue-100 dark:border-blue-900/40",
    },
    {
      id: "payee",
      title: "Total Encaissé",
      value: formatFCFA(stats.totalPaid),
      subtitle: `${collectionRate}% de taux d'encaissement`,
      trend: "up",
      trendValue: `${collectionRate}%`,
      icon: CheckCircle2,
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
      activeRing: "ring-2 ring-emerald-500 border-emerald-500 shadow-md shadow-emerald-500/10",
      borderColor: "border-emerald-100 dark:border-emerald-900/40",
    },
    {
      id: "en_retard",
      title: "Restant à encaisser",
      value: formatFCFA(stats.totalPending),
      subtitle: `${stats.pendingCount} en attente`,
      trend: stats.pendingCount > 0 ? "down" : "up",
      trendValue: `${stats.pendingCount} à régler`,
      icon: Clock,
      iconBg: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      activeRing: "ring-2 ring-amber-500 border-amber-500 shadow-md shadow-amber-500/10",
      borderColor: "border-amber-100 dark:border-amber-900/40",
    },
    {
      id: "envoyee",
      title: "Factures émises",
      value: `${stats.totalInvoices} facture${stats.totalInvoices > 1 ? "s" : ""}`,
      subtitle: "Total du compte",
      trend: "up",
      trendValue: `${stats.totalInvoices}`,
      icon: FileText,
      iconBg: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
      activeRing: "ring-2 ring-purple-500 border-purple-500 shadow-md shadow-purple-500/10",
      borderColor: "border-purple-100 dark:border-purple-900/40",
    },
  ];

  const handleCardClick = (id: string) => {
    setClickedCardId(id);
    setTimeout(() => setClickedCardId(null), 300);
    if (onFilterChange) {
      onFilterChange(id);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = activeFilter === card.id;
        const isClicked = clickedCardId === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => handleCardClick(card.id)}
            className={`p-5 rounded-2xl bg-white dark:bg-gray-900 border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer select-none group relative overflow-hidden ${
              isSelected ? card.activeRing : `${card.borderColor} hover:shadow-md hover:-translate-y-0.5`
            } ${isClicked ? "scale-95 duration-75" : ""}`}
          >
            {/* Background ripple highlight when active */}
            {isSelected && (
              <span className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                <Check className="w-3 h-3 stroke-[3]" /> Actif
              </span>
            )}

            <div className="flex items-center justify-between mb-3 w-full">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {card.title}
              </span>
              <div
                className={`p-2.5 rounded-xl transition-transform duration-200 group-hover:scale-110 ${card.iconBg}`}
              >
                <Icon className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>

            <div>
              <div className="text-xl lg:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
          </button>
        );
      })}
    </div>
  );
}
