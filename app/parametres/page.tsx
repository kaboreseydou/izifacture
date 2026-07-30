"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/sidebar";
import { CustomSelect } from "@/components/shared/custom-select";
import { useApp } from "@/lib/context/app-context";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle,
  Menu,
  ChevronRight,
  User,
  Hash,
  Shield,
  Save,
  Globe,
} from "lucide-react";

export default function SettingsPage() {
  const { companyProfile, updateCompanyProfile } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"profil" | "facturation" | "paiement" | "securite">("profil");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State initialized with context profile
  const [profile, setProfile] = useState(companyProfile);

  useEffect(() => {
    setProfile(companyProfile);
  }, [companyProfile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfile(profile);
    setToastMessage("Paramètres enregistrés et répercutés sur toutes vos factures !");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const currencyOptions = [
    { value: "XOF", label: "XOF — Franc CFA (UEMOA)" },
    { value: "XAF", label: "XAF — Franc CFA (CEMAC)" },
    { value: "EUR", label: "EUR — Euro (€)" },
    { value: "USD", label: "USD — US Dollar ($)" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f5f8] dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 select-none">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
            <CheckCircle className="w-4 h-4 stroke-[3]" />
            <span>{toastMessage}</span>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="md:hidden mr-1"
                >
                  <Menu className="w-4 h-4 text-gray-600" />
                </button>
                <Link href="/" className="hover:underline">
                  Tableau de bord
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Paramètres
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Paramètres de votre Compte
              </h1>
              <p className="text-xs text-gray-400">
                Les informations modifiées ici se répercutent automatiquement sur l&apos;émetteur de vos factures.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer les modifications</span>
            </button>
          </div>

          {/* Segmented Control Pill Tabs */}
          <div className="p-1 rounded-2xl bg-gray-200/70 dark:bg-gray-800/80 flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-300 overflow-x-auto max-w-xl">
            {[
              { id: "profil", label: "Profil Entreprise" },
              { id: "facturation", label: "Facturation & TVA" },
              { id: "paiement", label: "Modes de Règlement" },
              { id: "securite", label: "Sécurité" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as "profil" | "facturation" | "paiement" | "securite")}
                className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm font-extrabold"
                    : "hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
            {/* Tab 1: Profil Entreprise */}
            {activeTab === "profil" && (
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-5">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                  Informations Émetteur (Affichées sur la Facture)
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nom du dirigeant */}
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                      Nom complet du responsable *
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <User className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Raison sociale */}
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-blue-600">
                      Raison Sociale / Nom Légal *
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <input
                        type="text"
                        value={profile.company}
                        onChange={(e) =>
                          setProfile({ ...profile, company: e.target.value })
                        }
                        className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                      Email de Facturation Pro *
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Téléphone Pro */}
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                      Téléphone Pro *
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* NIF */}
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                      Numéro NIF / IFU
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <Hash className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        value={profile.nif}
                        onChange={(e) =>
                          setProfile({ ...profile, nif: e.target.value })
                        }
                        className="w-full text-xs font-bold font-mono text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* RCCM */}
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                      Registre de Commerce (RCCM)
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <Hash className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        value={profile.rccm}
                        onChange={(e) =>
                          setProfile({ ...profile, rccm: e.target.value })
                        }
                        className="w-full text-xs font-bold font-mono text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Adresse Siege */}
                  <div className="sm:col-span-2 relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                      Adresse complète du siège social
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) =>
                          setProfile({ ...profile, address: e.target.value })
                        }
                        className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Facturation & TVA */}
            {activeTab === "facturation" && (
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-5">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                  Préférences de Facturation & Numérotation
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomSelect
                    label="Devise Principale *"
                    labelColor="text-gray-500"
                    options={currencyOptions}
                    value={profile.currency}
                    onChange={(val) => setProfile({ ...profile, currency: val })}
                    icon={<Globe className="w-4 h-4 text-blue-600" />}
                  />

                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                      Taux de TVA par défaut (%)
                    </label>
                    <input
                      type="number"
                      value={profile.defaultTax}
                      onChange={(e) =>
                        setProfile({ ...profile, defaultTax: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                      Préfixe de Numérotation Facture
                    </label>
                    <input
                      type="text"
                      value={profile.prefix}
                      onChange={(e) =>
                        setProfile({ ...profile, prefix: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-mono font-bold text-gray-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Modes de Règlement */}
            {activeTab === "paiement" && (
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-5">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                  Coordonnées Bancaires & Mobile Money (Affichées en bas de Facture)
                </h2>

                <div className="space-y-4">
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                      IBAN / RIB Bancaire
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                      <input
                        type="text"
                        value={profile.iban}
                        onChange={(e) =>
                          setProfile({ ...profile, iban: e.target.value })
                        }
                        className="w-full text-xs font-mono font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-sky-500">
                        Numéro Wave Money
                      </label>
                      <input
                        type="text"
                        value={profile.waveNumber}
                        onChange={(e) =>
                          setProfile({ ...profile, waveNumber: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white focus:outline-none"
                      />
                    </div>

                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-orange-500">
                        Numéro Orange Money
                      </label>
                      <input
                        type="text"
                        value={profile.orangeNumber}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            orangeNumber: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Sécurité */}
            {activeTab === "securite" && (
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-5">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                  Sécurité du Compte & Mot de Passe
                </h2>

                <div className="space-y-4">
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                      Mot de passe actuel
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <Shield className="w-4 h-4 text-gray-400 shrink-0" />
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full text-xs font-bold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        placeholder="Nouveau mot de passe"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white focus:outline-none"
                      />
                    </div>

                    <div className="relative">
                      <label className="absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold text-gray-500">
                        Confirmer le mot de passe
                      </label>
                      <input
                        type="password"
                        placeholder="Confirmer mot de passe"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-bold text-gray-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
