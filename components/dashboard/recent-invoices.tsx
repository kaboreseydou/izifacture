"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Eye,
  Download,
  Send,
  Filter,
  CheckCircle2,
  FileText,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { Invoice } from "@/lib/data/mock/fixtures";
import { StatusBadge, InvoiceStatusType } from "@/components/shared/status-badge";
import { formatFCFA, formatDate } from "@/lib/utils";

interface RecentInvoicesProps {
  invoices: Invoice[];
}

export function RecentInvoices({ invoices }: RecentInvoicesProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredInvoices = invoices.filter((inv) => {
    const matchesStatus =
      selectedStatus === "all" || inv.status === selectedStatus;
    const matchesSearch =
      inv.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.clientCompany.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm flex flex-col justify-between">
      {/* Table Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Dernières Factures
          </h2>
          <p className="text-xs text-gray-400">
            Suivi des factures émises et des états de paiement
          </p>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-semibold">
            {[
              { id: "all", label: "Toutes" },
              { id: "payee", label: "Payées" },
              { id: "envoyee", label: "Envoyées" },
              { id: "en_retard", label: "En retard" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedStatus === tab.id
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm font-bold"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Link
            href="/factures"
            className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline px-2 py-1.5"
          >
            <span>Voir tout</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Invoice Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Numéro</th>
              <th className="py-3 px-3">Client</th>
              <th className="py-3 px-3">Émission</th>
              <th className="py-3 px-3">Échéance</th>
              <th className="py-3 px-3 text-right">Montant Total</th>
              <th className="py-3 px-3 text-center">Statut</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors group"
                >
                  {/* Invoice Number */}
                  <td className="py-3.5 px-3 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 shrink-0">
                      <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <Link
                      href={`/factures/${inv.id}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {inv.number}
                    </Link>
                  </td>

                  {/* Client Info */}
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {inv.clientName}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {inv.clientCompany}
                    </p>
                  </td>

                  {/* Issue Date */}
                  <td className="py-3.5 px-3 text-gray-600 dark:text-gray-400 font-medium">
                    {formatDate(inv.issueDate)}
                  </td>

                  {/* Due Date */}
                  <td className="py-3.5 px-3 font-medium">
                    <span
                      className={
                        inv.status === "en_retard"
                          ? "text-rose-600 font-bold"
                          : "text-gray-600 dark:text-gray-400"
                      }
                    >
                      {formatDate(inv.dueDate)}
                    </span>
                  </td>

                  {/* Amount in FCFA */}
                  <td className="py-3.5 px-3 text-right font-extrabold text-gray-900 dark:text-white">
                    {formatFCFA(inv.amount)}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3 text-center">
                    <StatusBadge status={inv.status} />
                  </td>

                  {/* Quick Action */}
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/factures/${inv.id}`}
                        title="Voir détails"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        title="Télécharger PDF"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-gray-400 text-xs"
                >
                  Aucune facture ne correspond à ces critères.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
