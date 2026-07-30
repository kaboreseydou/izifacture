"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Send, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useApp } from "@/lib/context/app-context";
import { formatFCFA } from "@/lib/utils";

export function UnpaidAlerts() {
  const { invoices } = useApp();

  const overdueInvoices = invoices.filter((inv) => inv.status === "en_retard");
  const overdueTotal = overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0);

  // Group top clients from invoices
  const clientTotals = invoices.reduce((acc, inv) => {
    const key = inv.clientCompany || inv.clientName;
    if (!acc[key]) {
      acc[key] = { name: key, total: 0, count: 0, hasOverdue: false };
    }
    acc[key].total += inv.amount;
    acc[key].count += 1;
    if (inv.status === "en_retard") acc[key].hasOverdue = true;
    return acc;
  }, {} as Record<string, { name: string; total: number; count: number; hasOverdue: boolean }>);

  const topClients = Object.values(clientTotals)
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Overdue alert banner */}
      {overdueInvoices.length > 0 ? (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-md shadow-rose-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-start gap-3 relative z-10">
            <div className="p-2 rounded-xl bg-white/20 shrink-0">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-100 block">
                Relance urgente
              </span>
              <h3 className="text-sm font-extrabold mb-1">
                {overdueInvoices.length} facture{overdueInvoices.length > 1 ? "s" : ""} en retard
              </h3>
              <p className="text-xs text-rose-100 mb-3">
                Total à réclamer : <span className="font-extrabold text-white">{formatFCFA(overdueTotal)}</span>
              </p>
              <Link
                href="/factures?status=en_retard"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-rose-600 font-bold text-xs shadow-sm hover:bg-rose-50 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Voir les relances</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold">
                Aucun impayé en retard !
              </h3>
              <p className="text-[11px] opacity-80">
                Toutes vos factures émises sont réglées ou dans leurs délais de paiement.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top clients card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Top Clients Facturés
            </h3>
            <p className="text-[11px] text-gray-400">Zone UEMOA</p>
          </div>
          <Link
            href="/clients"
            className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-0.5"
          >
            <span>Voir tout</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {topClients.length === 0 ? (
          <p className="text-xs text-gray-400 py-3 text-center">
            Aucun client facturé pour le moment.
          </p>
        ) : (
          <div className="space-y-3">
            {topClients.map((client, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800"
              >
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    {client.name}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {client.count} facture{client.count > 1 ? "s" : ""} émise{client.count > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-extrabold text-gray-900 dark:text-white">
                    {formatFCFA(client.total)}
                  </p>
                  <span
                    className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      !client.hasOverdue
                        ? "text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300"
                        : "text-rose-700 bg-rose-100 dark:bg-rose-950 dark:text-rose-300"
                    }`}
                  >
                    {!client.hasOverdue ? "À jour" : "Impayé"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
