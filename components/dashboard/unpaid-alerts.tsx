"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, Send, ShieldAlert, CheckCircle2 } from "lucide-react";
import { MOCK_TOP_CLIENTS } from "@/lib/data/mock/fixtures";
import { formatFCFA } from "@/lib/utils";

export function UnpaidAlerts() {
  return (
    <div className="space-y-4">
      {/* Overdue alert banner */}
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
              2 factures en retard (&gt;30j)
            </h3>
            <p className="text-xs text-rose-100 mb-3">
              Total à réclamer : <span className="font-extrabold text-white">2 800 000 FCFA</span>
            </p>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-rose-600 font-bold text-xs shadow-sm hover:bg-rose-50 transition-colors">
              <Send className="w-3.5 h-3.5" />
              <span>Envoyer relance WhatsApp / Email</span>
            </button>
          </div>
        </div>
      </div>

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

        <div className="space-y-3">
          {MOCK_TOP_CLIENTS.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800"
            >
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  {client.name}
                </p>
                <p className="text-[10px] text-gray-400">
                  {client.invoicesCount} factures émises
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-extrabold text-gray-900 dark:text-white">
                  {formatFCFA(client.totalBilled)}
                </p>
                <span
                  className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded ${
                    client.status === "actif"
                      ? "text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300"
                      : "text-rose-700 bg-rose-100 dark:bg-rose-950 dark:text-rose-300"
                  }`}
                >
                  {client.status === "actif" ? "À jour" : "Impayés en cours"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
