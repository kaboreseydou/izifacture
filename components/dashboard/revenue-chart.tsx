"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RevenueDataPoint } from "@/lib/data/mock/fixtures";
import { formatFCFA } from "@/lib/utils";
import { TrendingUp, Calendar, ArrowUpRight } from "lucide-react";

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPeriodBilled = data.reduce((acc, item) => acc + item.facture, 0);
  const totalPeriodPaid = data.reduce((acc, item) => acc + item.encaisse, 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-xs">
          <p className="font-bold text-gray-800 dark:text-white mb-1.5">{label} 2026</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-gray-500">Facturé :</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {formatFCFA(payload[0]?.value || 0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span className="text-gray-500">Encaissé :</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {formatFCFA(payload[1]?.value || 0)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Évolution du Chiffre d'Affaires
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              UEMOA/CEMAC
            </span>
          </div>
          <p className="text-xs text-gray-400">
            Comparatif entre montants facturés et encaissements réels sur 6 mois
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-gray-600 dark:text-gray-400">Facturé</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-gray-600 dark:text-gray-400">Encaissé</span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-[280px] w-full">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorFacture" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorEncaisse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
                opacity={0.5}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="facture"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorFacture)"
              />
              <Area
                type="monotone"
                dataKey="encaisse"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorEncaisse)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-xs">
            Chargement du graphique...
          </div>
        )}
      </div>

      {/* Footer metrics */}
      <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-gray-400 font-medium">Cumul Facturé (6 mois)</span>
          <p className="font-bold text-gray-900 dark:text-white text-sm">
            {formatFCFA(totalPeriodBilled)}
          </p>
        </div>
        <div>
          <span className="text-gray-400 font-medium">Cumul Encaissé (6 mois)</span>
          <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
            {formatFCFA(totalPeriodPaid)}
          </p>
        </div>
      </div>
    </div>
  );
}
