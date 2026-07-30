"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { DatePicker } from "@/components/shared/date-picker";
import { CustomSelect } from "@/components/shared/custom-select";
import { useApp } from "@/lib/context/app-context";
import { supabase } from "@/lib/supabase/client";
import { Invoice } from "@/lib/data/mock/fixtures";
import {
  ChevronRight,
  Plus,
  Trash2,
  User,
  Hash,
  Globe,
  Boxes,
  Percent,
  Coins,
  Menu,
  Receipt,
  Download,
  ArrowLeft,
  CheckCircle,
  FileCheck,
  Save,
  RotateCcw,
} from "lucide-react";
import { formatFCFA, formatDate } from "@/lib/utils";

interface ItemRow {
  id: string;
  name: string;
  quantity: number;
  taxRate: number;
  unitPrice: number;
}

interface DbClientOption {
  id: string;
  name: string;
  company: string;
  email: string;
}

const LOCAL_STORAGE_DRAFT_KEY = "facture_izi_invoice_draft";

export default function CreateOrEditInvoicePage() {
  const router = useRouter();
  const { user, invoices, addInvoice, updateInvoice, companyProfile } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<"standard" | "split" | "recurring">("standard");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Edit Mode State
  const [editId, setEditId] = useState<string | null>(null);
  const isEditMode = Boolean(editId);

  // Real Clients from Supabase
  const [userClients, setUserClients] = useState<DbClientOption[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");

  // Form Dates
  const todayStr = new Date().toISOString().split("T")[0];
  const nextMonthStr = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [issueDate, setIssueDate] = useState(todayStr);
  const [dueDate, setDueDate] = useState(nextMonthStr);
  const [invoiceNumber, setInvoiceNumber] = useState(
    `${companyProfile.prefix || "FAC-2026-"}0049`
  );

  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const [currency, setCurrency] = useState(companyProfile.currency || "XOF");
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discountValue] = useState(250000);
  const [discountReason, setDiscountReason] = useState("Remise de fin d'année");

  // Items State
  const [items, setItems] = useState<ItemRow[]>([
    {
      id: "1",
      name: "Prestation de service / Conseil",
      quantity: 1,
      taxRate: Number(companyProfile.defaultTax) || 18,
      unitPrice: 250000,
    },
  ]);

  // Fetch logged-in user's clients from Supabase
  useEffect(() => {
    async function loadUserClients() {
      if (!user) return;
      try {
        const { data } = await supabase
          .from("clients")
          .select("id, name, company, email")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          setUserClients(data);
          if (!selectedClientId && !isEditMode) {
            setSelectedClientId(data[0].id);
            setClientName(data[0].name);
            setClientCompany(data[0].company);
            setClientEmail(data[0].email);
          }
        } else {
          setUserClients([]);
        }
      } catch (err) {
        console.error("Error fetching user clients:", err);
      }
    }
    loadUserClients();
  }, [user, isEditMode, selectedClientId]);

  // Restore draft from localStorage or target invoice if in edit mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const targetId = params.get("edit");

      if (targetId) {
        setEditId(targetId);
        const targetInv = invoices.find((inv) => inv.id === targetId);
        if (targetInv) {
          setInvoiceNumber(targetInv.number);
          setClientName(targetInv.clientName);
          setClientCompany(targetInv.clientCompany);
          setClientEmail(targetInv.clientEmail);
          setIssueDate(targetInv.issueDate);
          setDueDate(targetInv.dueDate);
          if (targetInv.items && targetInv.items.length > 0) {
            setItems(
              targetInv.items.map((it) => ({
                id: it.id,
                name: it.name,
                quantity: it.quantity,
                taxRate: it.taxRate,
                unitPrice: it.unitPrice,
              }))
            );
          }
        }
      } else {
        // Load draft invoice from localStorage if present
        const savedDraft = localStorage.getItem(LOCAL_STORAGE_DRAFT_KEY);
        if (savedDraft) {
          try {
            const parsed = JSON.parse(savedDraft);
            if (parsed.clientName) setClientName(parsed.clientName);
            if (parsed.clientCompany) setClientCompany(parsed.clientCompany);
            if (parsed.clientEmail) setClientEmail(parsed.clientEmail);
            if (parsed.invoiceNumber) setInvoiceNumber(parsed.invoiceNumber);
            if (parsed.issueDate) setIssueDate(parsed.issueDate);
            if (parsed.dueDate) setDueDate(parsed.dueDate);
            if (parsed.items && parsed.items.length > 0) setItems(parsed.items);
            if (parsed.currency) setCurrency(parsed.currency);
            if (parsed.hasDiscount !== undefined) setHasDiscount(parsed.hasDiscount);
          } catch (e) {
            console.error("Draft load error:", e);
          }
        }
      }
    }
  }, [invoices]);

  // Auto-Save draft to localStorage as user types
  useEffect(() => {
    if (!isEditMode && typeof window !== "undefined") {
      const draftData = {
        clientName,
        clientCompany,
        clientEmail,
        invoiceNumber,
        issueDate,
        dueDate,
        currency,
        hasDiscount,
        items,
      };
      localStorage.setItem(LOCAL_STORAGE_DRAFT_KEY, JSON.stringify(draftData));
    }
  }, [
    isEditMode,
    clientName,
    clientCompany,
    clientEmail,
    invoiceNumber,
    issueDate,
    dueDate,
    currency,
    hasDiscount,
    items,
  ]);

  const handleResetForm = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
    }
    setClientName("");
    setClientCompany("");
    setClientEmail("");
    setSelectedClientId("");
    setInvoiceNumber(`${companyProfile.prefix || "FAC-2026-"}0049`);
    setItems([
      {
        id: "1",
        name: "Prestation de service",
        quantity: 1,
        taxRate: Number(companyProfile.defaultTax) || 18,
        unitPrice: 250000,
      },
    ]);
  };

  const handleClientSelect = (id: string) => {
    setSelectedClientId(id);
    const target = userClients.find((c) => c.id === id);
    if (target) {
      setClientName(target.name);
      setClientCompany(target.company);
      setClientEmail(target.email);
    }
  };

  // Calculations: Calculate item-level TVA dynamically
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const discountAmount = hasDiscount ? discountValue : 0;
  const taxable = Math.max(0, subtotal - discountAmount);

  // Sum item-level tax amounts
  const rawTaxTotal = items.reduce(
    (sum, item) => sum + (item.quantity * item.unitPrice * (Number(item.taxRate) || 0)) / 100,
    0
  );
  const discountRatio = subtotal > 0 ? taxable / subtotal : 1;
  const taxAmount = Math.round(rawTaxTotal * discountRatio);
  const grandTotal = taxable + taxAmount;

  const handleAddItem = () => {
    const newItem: ItemRow = {
      id: Date.now().toString(),
      name: "Nouvelle prestation de service",
      quantity: 1,
      taxRate: Number(companyProfile.defaultTax) || 18,
      unitPrice: 250000,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleUpdateItem = (
    id: string,
    field: keyof ItemRow,
    value: string | number
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleSaveInvoice = (status: "envoyee" | "brouillon" = "envoyee") => {
    const invoicePayload: Omit<Invoice, "id"> = {
      number: invoiceNumber,
      clientName: clientName || "Client",
      clientCompany: clientCompany || "Entreprise",
      clientEmail: clientEmail || "client@entreprise.sn",
      issueDate,
      dueDate,
      amount: grandTotal,
      status,
      itemsCount: items.length,
      subtotal,
      taxAmount,
      discountAmount,
      notes: "Facture générée via facture.izi",
      items: items.map((it) => ({
        id: it.id,
        name: it.name,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        taxRate: it.taxRate,
        total: it.quantity * it.unitPrice,
      })),
    };

    if (isEditMode && editId) {
      updateInvoice(editId, invoicePayload);
    } else {
      addInvoice(invoicePayload);
      if (typeof window !== "undefined") {
        localStorage.removeItem(LOCAL_STORAGE_DRAFT_KEY);
      }
    }

    setShowSuccessModal(true);
  };

  const handleDownloadPdf = () => {
    setShowSuccessModal(false);
    setShowPreview(true);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Client Options for Dropdown
  const clientOptions =
    userClients.length > 0
      ? userClients.map((c) => ({
          value: c.id,
          label: c.company,
          sublabel: c.name,
        }))
      : [
          {
            value: "none",
            label: "Aucun client dans votre répertoire",
            sublabel: "Ajoutez un client dans le Répertoire des clients",
          },
        ];

  const currencyOptions = [
    { value: "XOF", label: "XOF — Franc CFA (UEMOA)" },
    { value: "XAF", label: "XAF — Franc CFA (CEMAC)" },
    { value: "EUR", label: "EUR — Euro (€)" },
    { value: "USD", label: "USD — US Dollar ($)" },
  ];

  const discountReasonOptions = [
    { value: "Remise de fin d'année", label: "Remise de fin d'année" },
    { value: "Remise Partenaire", label: "Remise Partenaire" },
    { value: "Client Fidèle", label: "Client Fidèle" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f5f8] dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 select-none">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Modal de Succès Après Enregistrement/Modification */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs no-print">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl border border-gray-200 dark:border-gray-800 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                  {isEditMode
                    ? "Facture mise à jour avec succès !"
                    : "Facture créée avec succès !"}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  La facture <span className="font-mono font-bold text-gray-900 dark:text-white">#{invoiceNumber}</span> a été enregistrée.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs font-bold">
                <span className="text-gray-500">Montant Total TTC :</span>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-black">
                  {formatFCFA(grandTotal)}
                </span>
              </div>

              {/* Boutons d'Action */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger la facture (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/factures")}
                  className="w-full py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-extrabold text-xs hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retourner aux factures</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Top Breadcrumb & Page Header */}
          <div className="flex items-center justify-between no-print">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="md:hidden mr-1"
                >
                  <Menu className="w-4 h-4 text-gray-600" />
                </button>
                <Link href="/factures" className="hover:underline">
                  Factures
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {isEditMode ? "Modifier la Facture" : "Créer une Facture"}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {isEditMode ? `Modifier la Facture #${invoiceNumber}` : "Créer une Facture"}
              </h1>
              <p className="text-xs text-gray-400">
                {isEditMode
                  ? "Modifiez les informations et prestations de cette facture."
                  : "Émettez une facture professionnelle conforme UEMOA/CEMAC en moins d'une minute."}
              </p>
            </div>

            {/* Show Preview Switcher & Reset Button */}
            <div className="flex items-center gap-3">
              {!isEditMode && (
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 flex items-center gap-1.5"
                  title="Réinitialiser le brouillon"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Effacer brouillon</span>
                </button>
              )}

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Aperçu
                </span>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    showPreview ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      showPreview ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Form & Live Preview Grid */}
          <div
            className={`grid grid-cols-1 ${
              showPreview ? "lg:grid-cols-12" : "lg:grid-cols-1"
            } gap-8 items-start`}
          >
            {/* Left Form Area */}
            <div
              className={`${
                showPreview ? "lg:col-span-6" : "lg:col-span-12"
              } space-y-6 no-print`}
            >
              {/* Segmented Control Pill Tabs */}
              <div className="p-1 rounded-2xl bg-gray-200/70 dark:bg-gray-800/80 flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-300">
                {[
                  { id: "standard", label: "Standard" },
                  { id: "split", label: "Échelonné" },
                  { id: "recurring", label: "Récurrent" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setActiveTab(tab.id as "standard" | "split" | "recurring")
                    }
                    className={`flex-1 py-2 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                        : "hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Section 1: Informations de la Facture */}
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-5">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                  Informations Générales
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Real Clients Select Dropdown */}
                  <div className="sm:col-span-2">
                    <CustomSelect
                      label="Sélectionner un Client dans le Répertoire *"
                      labelColor="text-blue-600"
                      options={clientOptions}
                      value={selectedClientId}
                      onChange={handleClientSelect}
                      icon={<User className="w-4 h-4 text-blue-600" />}
                    />
                  </div>

                  {/* Nom du Client */}
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                      Nom du Contact *
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <input
                        type="text"
                        placeholder="Ex: Amadou Diallo"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Entreprise Client */}
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-orange-500">
                      Entreprise Client *
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <input
                        type="text"
                        placeholder="Ex: SahelTech S.A."
                        value={clientCompany}
                        onChange={(e) => setClientCompany(e.target.value)}
                        className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Date d'émission */}
                  <DatePicker
                    label="Date d'émission *"
                    value={issueDate}
                    onChange={setIssueDate}
                    labelColor="text-blue-600"
                  />

                  {/* Date d'échéance */}
                  <DatePicker
                    label="Date d'échéance *"
                    value={dueDate}
                    onChange={setDueDate}
                    labelColor="text-amber-500"
                  />

                  {/* Numéro de Facture */}
                  <div className="sm:col-span-2 relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                      Numéro de Facture
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <Hash className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        className="w-full text-xs font-bold font-mono text-gray-700 dark:text-gray-300 bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Prestations & Services */}
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-5">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                  Prestations & Services
                </h2>

                {/* Devise */}
                <CustomSelect
                  label="Devise de Facturation *"
                  labelColor="text-gray-500"
                  options={currencyOptions}
                  value={currency}
                  onChange={setCurrency}
                  icon={<Globe className="w-4 h-4 text-blue-600" />}
                />

                {/* Liste des Lignes */}
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/70 dark:border-gray-700 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-gray-800 dark:text-gray-200">
                          Prestation #{idx + 1}
                        </span>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Libellé */}
                      <div className="relative">
                        <label className="absolute -top-2.5 left-3 bg-gray-50 dark:bg-gray-800 px-1 text-[10px] font-bold text-gray-500">
                          Désignation de la prestation
                        </label>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                          <Boxes className="w-4 h-4 text-gray-400 shrink-0" />
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) =>
                              handleUpdateItem(item.id, "name", e.target.value)
                            }
                            className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Qté, TVA, Montant */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="relative">
                          <label className="absolute -top-2.5 left-2 bg-gray-50 dark:bg-gray-800 px-1 text-[9px] font-bold text-gray-500">
                            Quantité
                          </label>
                          <div className="flex items-center gap-1 px-2 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleUpdateItem(
                                  item.id,
                                  "quantity",
                                  Math.max(1, Number(e.target.value))
                                )
                              }
                              className="w-full text-xs font-bold text-center text-gray-900 dark:text-white bg-transparent focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="relative">
                          <label className="absolute -top-2.5 left-2 bg-gray-50 dark:bg-gray-800 px-1 text-[9px] font-bold text-blue-600">
                            TVA (%) *
                          </label>
                          <div className="flex items-center gap-1 px-2 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500/20">
                            <Percent className="w-3 h-3 text-blue-600 shrink-0" />
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={item.taxRate}
                              onChange={(e) =>
                                handleUpdateItem(
                                  item.id,
                                  "taxRate",
                                  Math.max(0, Number(e.target.value))
                                )
                              }
                              className="w-full text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-transparent focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="relative">
                          <label className="absolute -top-2.5 left-2 bg-gray-50 dark:bg-gray-800 px-1 text-[9px] font-bold text-gray-500">
                            Prix unitaire ({currency})
                          </label>
                          <div className="flex items-center gap-1 px-2 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                            <Coins className="w-3 h-3 text-gray-400 shrink-0" />
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) =>
                                handleUpdateItem(
                                  item.id,
                                  "unitPrice",
                                  Number(e.target.value)
                                )
                              }
                              className="w-full text-xs font-extrabold text-right text-gray-900 dark:text-white bg-transparent focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bouton Ajouter */}
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="w-full py-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-extrabold text-xs hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Ajouter une prestation</span>
                </button>
              </div>

              {/* Remise */}
              <div className="flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="discount-box"
                    checked={hasDiscount}
                    onChange={(e) => setHasDiscount(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="discount-box"
                    className="text-xs font-extrabold text-gray-900 dark:text-white cursor-pointer"
                  >
                    Appliquer une remise
                  </label>
                </div>

                {hasDiscount && (
                  <div className="w-48">
                    <CustomSelect
                      options={discountReasonOptions}
                      value={discountReason}
                      onChange={setDiscountReason}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: Invoice Live Preview Card */}
            {showPreview && (
              <div className="lg:col-span-6 sticky top-8 space-y-4 print-clean-invoice">
                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2 no-print">
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-900 dark:text-white">
                    <span>Aperçu en direct</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSaveInvoice("brouillon")}
                      className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-xs font-extrabold shadow-xs hover:bg-gray-50"
                    >
                      Brouillon
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveInvoice("envoyee")}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      {isEditMode ? <Save className="w-4 h-4" /> : <FileCheck className="w-4 h-4" />}
                      <span>{isEditMode ? "Mettre à jour la facture" : "Créer la facture"}</span>
                    </button>
                  </div>
                </div>

                {/* A4 Invoice Preview */}
                <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/90 dark:border-gray-800 shadow-2xl space-y-6 text-xs relative overflow-hidden select-none">
                  {/* Header */}
                  <div className="flex items-start justify-between border-b border-gray-100 dark:border-gray-800 pb-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                          <Receipt className="w-4 h-4" />
                        </div>
                        <span className="font-extrabold text-base tracking-tight text-gray-900 dark:text-white">
                          facture<span className="text-blue-600">.izi</span>
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">
                        SaaS de Facturation UEMOA / CEMAC
                      </p>
                    </div>

                    <div className="text-right space-y-1">
                      <span className="text-xs font-black text-blue-600 uppercase tracking-widest block">
                        FACTURE N°
                      </span>
                      <span className="text-sm font-mono font-bold text-gray-900 dark:text-white block">
                        #{invoiceNumber}
                      </span>
                    </div>
                  </div>

                  {/* Vendor & Client Info */}
                  <div className="grid grid-cols-2 gap-6 text-[11px]">
                    <div className="space-y-1 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400 font-bold block text-[10px] uppercase tracking-wider">
                        Émise par :
                      </span>
                      <p className="font-extrabold text-gray-900 dark:text-white text-xs">
                        {companyProfile.name}
                      </p>
                      <p className="text-gray-600 font-semibold">{companyProfile.company}</p>
                      <p className="text-gray-400 text-[10px]">{companyProfile.email}</p>
                      <p className="text-gray-400 text-[10px]">{companyProfile.phone}</p>
                    </div>

                    <div className="space-y-1 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400 font-bold block text-[10px] uppercase tracking-wider">
                        Facturé à :
                      </span>
                      <p className="font-extrabold text-gray-900 dark:text-white text-xs">
                        {clientName || "Nom du Client"}
                      </p>
                      <p className="text-gray-600 font-semibold">
                        {clientCompany || "Entreprise du client"}
                      </p>
                      <p className="text-gray-400 text-[10px]">{clientEmail}</p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-6 text-[11px] py-2 border-y border-gray-100 dark:border-gray-800">
                    <div>
                      <span className="text-gray-400 font-bold block text-[10px]">
                        Date d&apos;émission :
                      </span>
                      <span className="font-extrabold text-gray-900 dark:text-white">
                        {formatDate(issueDate)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block text-[10px]">
                        Date d&apos;échéance :
                      </span>
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">
                        {formatDate(dueDate)}
                      </span>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div>
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead>
                        <tr className="text-gray-400 font-bold text-[10px] uppercase border-b border-gray-200 dark:border-gray-800">
                          <th className="py-2">Prestation</th>
                          <th className="py-2 text-center">Qté</th>
                          <th className="py-2 text-center">TVA</th>
                          <th className="py-2 text-right">Montant HT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-semibold text-gray-800 dark:text-gray-200">
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td className="py-2.5 font-bold">{item.name}</td>
                            <td className="py-2.5 text-center text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="py-2.5 text-center text-gray-500">
                              {item.taxRate}%
                            </td>
                            <td className="py-2.5 text-right font-extrabold text-gray-900 dark:text-white">
                              {formatFCFA(item.quantity * item.unitPrice)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary Totals (Dynamically calculated based on TVA) */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2 text-xs">
                    <div className="flex justify-between text-gray-500 font-semibold">
                      <span>Sous-total HT :</span>
                      <span className="text-gray-900 dark:text-white font-bold">
                        {formatFCFA(subtotal)}
                      </span>
                    </div>

                    {hasDiscount && (
                      <div className="flex justify-between text-amber-600 font-semibold">
                        <span>Remise accordée :</span>
                        <span className="font-bold">- {formatFCFA(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-500 font-semibold">
                      <span>Total TVA Calculé :</span>
                      <span className="text-blue-600 dark:text-blue-400 font-extrabold">
                        {formatFCFA(taxAmount)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-base pt-3 border-t border-gray-200 dark:border-gray-800 font-extrabold text-gray-900 dark:text-white">
                      <span>Total TTC à régler ({currency}) :</span>
                      <span className="text-blue-600 dark:text-blue-400 text-lg font-black">
                        {formatFCFA(grandTotal)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Coords */}
                  <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-gray-400 font-medium">
                    <p>Merci pour votre confiance !</p>
                    <p className="font-mono">
                      IBAN : {companyProfile.iban || "SN..."} | Wave : {companyProfile.waveNumber || "—"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
