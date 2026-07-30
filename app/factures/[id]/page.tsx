"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { StatusBadge } from "@/components/shared/status-badge";
import { CustomSelect } from "@/components/shared/custom-select";
import { useApp } from "@/lib/context/app-context";
import { Invoice } from "@/lib/data/mock/fixtures";
import { formatFCFA, formatDate } from "@/lib/utils";
import {
  ChevronRight,
  Download,
  Edit,
  Trash2,
  CheckCircle,
  Menu,
  Receipt,
  ArrowLeft,
  AlertTriangle,
  X,
  Tag,
} from "lucide-react";

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { invoices, companyProfile, updateInvoiceStatus, deleteInvoice } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Find invoice from app context or fallback
  const invId = params?.id as string;
  const initialInv =
    invoices.find((i) => i.id === invId) || invoices[0];

  const [invoice, setInvoice] = useState<Invoice>(initialInv);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto trigger download PDF if ?download=true
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("download") === "true") {
        const timer = setTimeout(() => {
          window.print();
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleStatusChange = (newStatusStr: string) => {
    const newStatus = newStatusStr as Invoice["status"];
    setInvoice({ ...invoice, status: newStatus });
    updateInvoiceStatus(invoice.id, newStatus);
    setToastMessage(`Statut mis à jour : ${newStatus.toUpperCase()}`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleDeleteConfirmed = () => {
    deleteInvoice(invoice.id);
    setShowDeleteModal(false);
    setToastMessage("Facture supprimée avec succès !");
    setTimeout(() => {
      setToastMessage(null);
      router.push("/factures");
    }, 1500);
  };

  const subtotal = invoice?.subtotal || Math.round((invoice?.amount || 0) / 1.18);
  const taxAmount = invoice?.taxAmount || (invoice?.amount || 0) - subtotal;
  const grandTotal = invoice?.amount || 0;

  const statusOptions = [
    { value: "payee", label: "Marquer comme Payée" },
    { value: "envoyee", label: "Marquer comme Envoyée" },
    { value: "brouillon", label: "Marquer comme Brouillon" },
    { value: "en_retard", label: "Marquer comme En retard" },
  ];

  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen bg-[#f4f5f8] dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 select-none">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce no-print">
            <CheckCircle className="w-4 h-4 stroke-[3]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal de Confirmation de Suppression */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs no-print">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                  Supprimer la facture #{invoice?.number} ?
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Cette action est irréversible. Toutes les données associées à cette facture seront définitivement supprimées.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xs hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white font-extrabold text-xs hover:bg-rose-700 shadow-md shadow-rose-500/20 active:scale-95"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Top Navigation & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="md:hidden mr-1"
                >
                  <Menu className="w-4 h-4 text-gray-600" />
                </button>
                <Link href="/factures" className="hover:underline flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Factures
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Détail Facture #{invoice?.number}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Facture #{invoice?.number}
                </h1>
                <StatusBadge status={invoice?.status} />
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Statut Custom Select */}
              <div className="w-52">
                <CustomSelect
                  options={statusOptions}
                  value={invoice?.status}
                  onChange={handleStatusChange}
                  icon={<Tag className="w-3.5 h-3.5 text-blue-600" />}
                />
              </div>

              {/* Modifier link passing ?edit=invoice.id */}
              <Link
                href={`/factures/nouvelle?edit=${invoice?.id}`}
                className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-xs font-extrabold shadow-xs hover:bg-gray-50 flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Modifier</span>
              </Link>

              {/* Télécharger la facture (PDF) */}
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger la facture (PDF)</span>
              </button>

              {/* Supprimer */}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-3.5 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-extrabold hover:bg-rose-100 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Supprimer</span>
              </button>
            </div>
          </div>

          {/* Clean Printable A4 Document Content Card */}
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/90 dark:border-gray-800 shadow-xl space-y-8 print-clean-invoice">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 dark:border-gray-800 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">
                    facture<span className="text-blue-600">.izi</span>
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  SaaS de Facturation UEMOA / CEMAC
                </p>
              </div>

              <div className="text-right space-y-1">
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest block">
                  FACTURE N°
                </span>
                <span className="text-base font-mono font-extrabold text-gray-900 dark:text-white block">
                  #{invoice?.number}
                </span>
              </div>
            </div>

            {/* Vendor & Client Info */}
            <div className="grid grid-cols-2 gap-8 text-xs">
              <div className="space-y-1 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                <span className="text-gray-400 font-bold block text-[10px] uppercase tracking-wider">
                  Émise par :
                </span>
                <p className="font-extrabold text-gray-900 dark:text-white text-sm">
                  {companyProfile.name}
                </p>
                <p className="text-gray-600 font-semibold">{companyProfile.company}</p>
                <p className="text-gray-400">{companyProfile.email}</p>
                <p className="text-gray-400 text-[10px]">
                  {companyProfile.address} — NIF: {companyProfile.nif}
                </p>
              </div>

              <div className="space-y-1 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                <span className="text-gray-400 font-bold block text-[10px] uppercase tracking-wider">
                  Facturé à :
                </span>
                <p className="font-extrabold text-gray-900 dark:text-white text-sm">
                  {invoice?.clientName}
                </p>
                <p className="text-gray-600 font-semibold">{invoice?.clientCompany}</p>
                <p className="text-gray-400">{invoice?.clientEmail}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-8 text-xs py-3 border-y border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-gray-400 font-bold block text-[10px]">
                  Date d&apos;émission :
                </span>
                <span className="font-extrabold text-gray-900 dark:text-white">
                  {formatDate(invoice?.issueDate)}
                </span>
              </div>
              <div>
                <span className="text-gray-400 font-bold block text-[10px]">
                  Date d&apos;échéance :
                </span>
                <span className="font-extrabold text-blue-600 dark:text-blue-400">
                  {formatDate(invoice?.dueDate)}
                </span>
              </div>
            </div>

            {/* Lines Table */}
            <div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="text-gray-400 font-bold text-[10px] uppercase border-b border-gray-200 dark:border-gray-800">
                    <th className="py-3 px-2">Désignation</th>
                    <th className="py-3 px-2 text-center">Quantité</th>
                    <th className="py-3 px-2 text-center">TVA</th>
                    <th className="py-3 px-2 text-right">Montant HT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-semibold text-gray-800 dark:text-gray-200">
                  {(invoice?.items && invoice.items.length > 0
                    ? invoice.items
                    : [
                        {
                          id: "default-1",
                          name: "Prestation de services informatiques",
                          quantity: 1,
                          taxRate: 18,
                          unitPrice: subtotal,
                          total: subtotal,
                        },
                      ]
                  ).map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 px-2 font-bold">{item.name}</td>
                      <td className="py-3 px-2 text-center text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="py-3 px-2 text-center text-gray-500">
                        {item.taxRate}%
                      </td>
                      <td className="py-3 px-2 text-right font-extrabold text-gray-900 dark:text-white">
                        {formatFCFA(item.quantity * item.unitPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2 text-xs">
              <div className="flex justify-between text-gray-500 font-semibold">
                <span>Sous-total HT :</span>
                <span className="text-gray-900 dark:text-white font-bold">
                  {formatFCFA(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 font-semibold">
                <span>TVA UEMOA (18%) :</span>
                <span className="text-gray-900 dark:text-white font-bold">
                  {formatFCFA(taxAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center text-base pt-3 border-t border-gray-200 dark:border-gray-800 font-extrabold text-gray-900 dark:text-white">
                <span>Total TTC à régler :</span>
                <span className="text-blue-600 dark:text-blue-400 text-xl font-black">
                  {formatFCFA(grandTotal)}
                </span>
              </div>
            </div>

            {/* Footer Coords */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400 font-medium">
              <p>Merci pour votre confiance !</p>
              <p className="font-mono text-[10px]">
                IBAN : {companyProfile.iban || "SN..."} | Wave : {companyProfile.waveNumber || "—"}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
