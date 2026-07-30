"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/sidebar";
import { Client } from "@/lib/data/mock/fixtures";
import { formatFCFA } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import { useApp } from "@/lib/context/app-context";
import {
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Menu,
  ChevronRight,
  CheckCircle,
  X,
  UserCheck,
} from "lucide-react";

interface DbClientRow {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  nif?: string;
  rccm?: string;
  status?: string;
  total_billed?: number;
  invoices_count?: number;
}

export default function ClientsPage() {
  const { user } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    nif: "",
    rccm: "",
  });

  const saveClientsToCache = (newClients: Client[]) => {
    if (user && typeof window !== "undefined") {
      const storageKey = `facture_izi_user_clients_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(newClients));
    }
  };

  // Fetch clients from cache and Supabase on mount or user change
  useEffect(() => {
    async function loadClients() {
      if (!user) {
        setClients([]);
        return;
      }

      const storageKey = `facture_izi_user_clients_${user.id}`;

      // 1. Instant load from local cache if available
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          try {
            setClients(JSON.parse(cached));
          } catch (e) {
            console.error("Client cache parse error:", e);
          }
        }
      }

      // 2. Load from Supabase database
      try {
        const { data } = await supabase
          .from("clients")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          const mapped: Client[] = (data as DbClientRow[]).map((c) => ({
            id: c.id,
            name: c.name,
            company: c.company,
            email: c.email,
            phone: c.phone,
            address: c.address,
            nif: c.nif || "",
            rccm: c.rccm || "",
            status: (c.status === "impaye" ? "impaye" : "actif") as Client["status"],
            totalBilled: Number(c.total_billed || 0),
            invoicesCount: Number(c.invoices_count || 0),
          }));
          setClients(mapped);
          if (typeof window !== "undefined") {
            localStorage.setItem(storageKey, JSON.stringify(mapped));
          }
        }
      } catch (err) {
        console.error("Error loading clients from Supabase:", err);
      }
    }
    loadClients();
  }, [user]);

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingClient(null);
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      nif: "",
      rccm: "",
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (c: Client) => {
    setEditingClient(c);
    setFormData({
      name: c.name,
      company: c.company,
      email: c.email,
      phone: c.phone,
      address: c.address,
      nif: c.nif,
      rccm: c.rccm,
    });
    setShowAddModal(true);
  };

  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = user?.id || (await supabase.auth.getUser()).data.user?.id || null;

    if (editingClient) {
      const updatedClients = clients.map((c) =>
        c.id === editingClient.id ? { ...c, ...formData } : c
      );
      setClients(updatedClients);
      saveClientsToCache(updatedClients);
      setToastMessage("Client mis à jour avec succès !");

      await supabase.from("clients").update({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        nif: formData.nif,
        rccm: formData.rccm,
      }).eq("id", editingClient.id);

    } else {
      const newId = `cli-${Date.now()}`;
      const newClient: Client = {
        id: newId,
        ...formData,
        totalBilled: 0,
        invoicesCount: 0,
        status: "actif",
      };
      const updatedClients = [newClient, ...clients];
      setClients(updatedClients);
      saveClientsToCache(updatedClients);
      setToastMessage("Nouveau client ajouté avec succès !");

      await supabase.from("clients").insert({
        id: newId,
        user_id: userId,
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        nif: formData.nif,
        rccm: formData.rccm,
        status: "actif",
        total_billed: 0,
        invoices_count: 0,
      });
    }

    setShowAddModal(false);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleDeleteClient = async (id: string) => {
    const updated = clients.filter((c) => c.id !== id);
    setClients(updated);
    saveClientsToCache(updated);
    setToastMessage("Client supprimé avec succès.");
    await supabase.from("clients").delete().eq("id", id);
    setTimeout(() => setToastMessage(null), 2000);
  };

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

        {/* Modal Ajouter / Modifier Client */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl border border-gray-200 dark:border-gray-800 animate-in zoom-in-95 duration-150 my-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                    {editingClient ? "Modifier le Client" : "Nouveau Client"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveClient} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Nom du Contact *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Amadou Diallo"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Entreprise *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: SahelTech S.A."
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contact@entreprise.sn"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Téléphone *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+221 77 000 00 00"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Adresse physique
                  </label>
                  <input
                    type="text"
                    placeholder="Dakar, Sénégal"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      NIF / IFU
                    </label>
                    <input
                      type="text"
                      placeholder="SN-DKR-2024-B-1402"
                      value={formData.nif}
                      onChange={(e) =>
                        setFormData({ ...formData, nif: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      RCCM
                    </label>
                    <input
                      type="text"
                      placeholder="SN-DKR-2024-B-9981"
                      value={formData.rccm}
                      onChange={(e) =>
                        setFormData({ ...formData, rccm: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    {editingClient ? "Enregistrer les modifications" : "Ajouter le client"}
                  </button>
                </div>
              </form>
            </div>
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
                  Gestion des Clients
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Répertoire des Clients
              </h1>
              <p className="text-xs text-gray-400">
                Gérez vos contacts professionnels, adresses et historiques d&apos;encaissements.
              </p>
            </div>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Nouveau Client</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, entreprise ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Empty State or Clients Grid */}
          {filteredClients.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center mx-auto">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                Aucun client dans votre répertoire
              </h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Ajoutez votre premier client pour commencer à émettre des factures professionnelles en FCFA.
              </p>
              <button
                onClick={handleOpenAdd}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Ajouter un premier client</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    {/* Top Client Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm shrink-0">
                          {client.company.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-sm font-extrabold text-gray-900 dark:text-white leading-tight">
                            {client.company}
                          </h3>
                          <p className="text-xs text-gray-400 font-medium">
                            {client.name}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                          client.status === "actif"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400"
                            : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-400"
                        }`}
                      >
                        {client.status === "actif" ? "Actif" : "Impayé"}
                      </span>
                    </div>

                    {/* Contact Infos */}
                    <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800 font-medium">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{client.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Billed Stats & Actions */}
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 block uppercase">
                        Total Facturé
                      </span>
                      <span className="text-xs font-black text-gray-900 dark:text-white">
                        {formatFCFA(client.totalBilled)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(client)}
                        className="p-2 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
