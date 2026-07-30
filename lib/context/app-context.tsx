"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Invoice } from "@/lib/data/mock/fixtures";
import { supabase } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

export interface CompanyProfile {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  nif: string;
  rccm: string;
  currency: string;
  defaultTax: string;
  prefix: string;
  iban: string;
  waveNumber: string;
  orangeNumber: string;
}

const EMPTY_COMPANY_PROFILE: CompanyProfile = {
  name: "Responsable",
  company: "Mon Entreprise",
  email: "",
  phone: "+221 77 000 00 00",
  address: "Dakar, Sénégal",
  nif: "SN-DKR-2026-B-0001",
  rccm: "SN-DKR-2026-B-0001",
  currency: "XOF",
  defaultTax: "18",
  prefix: "FAC-2026-",
  iban: "SN012 01001 00000000000 00",
  waveNumber: "+221 77 000 00 00",
  orangeNumber: "+221 77 000 00 00",
};

interface DbInvoiceRow {
  id: string;
  number: string;
  client_name: string;
  client_company: string;
  client_email: string;
  issue_date: string;
  due_date: string;
  amount: number | string;
  subtotal: number | string;
  tax_amount: number | string;
  discount_amount: number | string;
  status: Invoice["status"];
  items_count: number;
  notes?: string;
  user_id?: string;
  invoice_items?: {
    id: string;
    name: string;
    quantity: number;
    unit_price: number | string;
    tax_rate: number | string;
    total: number | string;
  }[];
}

interface AppContextType {
  user: SupabaseUser | null;
  userLoading: boolean;
  invoices: Invoice[];
  companyProfile: CompanyProfile;
  addInvoice: (invoiceData: Omit<Invoice, "id">) => Invoice;
  updateInvoice: (id: string, invoiceData: Partial<Invoice>) => void;
  updateInvoiceStatus: (id: string, status: Invoice["status"]) => void;
  deleteInvoice: (id: string) => void;
  updateCompanyProfile: (profile: Partial<CompanyProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(
    EMPTY_COMPANY_PROFILE
  );

  useEffect(() => {
    // Listen for Auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);

        if (currentUser) {
          await loadUserData(currentUser);
        } else {
          setInvoices([]);
          setCompanyProfile(EMPTY_COMPANY_PROFILE);
        }
        setUserLoading(false);
      }
    );

    async function checkCurrentSession() {
      try {
        const { data } = await supabase.auth.getSession();
        const currentUser = data.session?.user || null;
        setUser(currentUser);
        if (currentUser) {
          await loadUserData(currentUser);
        } else {
          setInvoices([]);
          setCompanyProfile(EMPTY_COMPANY_PROFILE);
        }
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        setUserLoading(false);
      }
    }

    checkCurrentSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function loadUserData(currentUser: SupabaseUser) {
    const storageKey = `facture_izi_user_invoices_${currentUser.id}`;

    // 1. Instant load from local storage cache if available
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(storageKey);
      if (cached) {
        try {
          setInvoices(JSON.parse(cached));
        } catch (e) {
          console.error("Cache parse error:", e);
        }
      }
    }

    try {
      // 2. Fetch User Profile from Supabase
      const { data: profileData } = await supabase
        .from("company_profile")
        .select("*")
        .eq("user_id", currentUser.id)
        .maybeSingle();

      if (profileData) {
        setCompanyProfile({
          name: profileData.name || currentUser.user_metadata?.full_name || "Responsable",
          company: profileData.company || currentUser.user_metadata?.company_name || "Mon Entreprise",
          email: profileData.email || currentUser.email || "",
          phone: profileData.phone || "",
          address: profileData.address || "",
          nif: profileData.nif || "",
          rccm: profileData.rccm || "",
          currency: profileData.currency || "XOF",
          defaultTax: profileData.default_tax || "18",
          prefix: profileData.prefix || "FAC-2026-",
          iban: profileData.iban || "",
          waveNumber: profileData.wave_number || "",
          orangeNumber: profileData.orange_number || "",
        });
      } else {
        setCompanyProfile({
          name: currentUser.user_metadata?.full_name || currentUser.email?.split("@")[0] || "Responsable",
          company: currentUser.user_metadata?.company_name || "Mon Entreprise",
          email: currentUser.email || "",
          phone: "+221 77 000 00 00",
          address: "Dakar, Sénégal",
          nif: "SN-DKR-2026-B-0001",
          rccm: "SN-DKR-2026-B-0001",
          currency: "XOF",
          defaultTax: "18",
          prefix: "FAC-2026-",
          iban: "SN012 01001 00000000000 00",
          waveNumber: "+221 77 000 00 00",
          orangeNumber: "+221 77 000 00 00",
        });
      }

      // 3. Fetch User Invoices from Supabase
      const { data: invoicesData } = await supabase
        .from("invoices")
        .select("*, invoice_items(*)")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (invoicesData && invoicesData.length > 0) {
        const mapped: Invoice[] = (invoicesData as DbInvoiceRow[]).map((inv) => ({
          id: inv.id,
          number: inv.number,
          clientName: inv.client_name,
          clientCompany: inv.client_company,
          clientEmail: inv.client_email,
          issueDate: inv.issue_date,
          dueDate: inv.due_date,
          amount: Number(inv.amount),
          subtotal: Number(inv.subtotal),
          taxAmount: Number(inv.tax_amount),
          discountAmount: Number(inv.discount_amount),
          status: inv.status,
          itemsCount: inv.items_count,
          notes: inv.notes,
          items: inv.invoice_items
            ? inv.invoice_items.map((it) => ({
                id: it.id,
                name: it.name,
                quantity: it.quantity,
                unitPrice: Number(it.unit_price),
                taxRate: Number(it.tax_rate),
                total: Number(it.total),
              }))
            : [],
        }));
        setInvoices(mapped);

        if (typeof window !== "undefined") {
          localStorage.setItem(storageKey, JSON.stringify(mapped));
        }
      }
    } catch (err) {
      console.error("Supabase user load error:", err);
    }
  }

  const updateCompanyProfile = async (updatedFields: Partial<CompanyProfile>) => {
    const updated = { ...companyProfile, ...updatedFields };
    setCompanyProfile(updated);

    try {
      if (user) {
        await supabase.from("company_profile").upsert({
          id: user.id,
          user_id: user.id,
          name: updated.name,
          company: updated.company,
          email: updated.email,
          phone: updated.phone,
          address: updated.address,
          nif: updated.nif,
          rccm: updated.rccm,
          currency: updated.currency,
          default_tax: updated.defaultTax,
          prefix: updated.prefix,
          iban: updated.iban,
          wave_number: updated.waveNumber,
          orange_number: updated.orangeNumber,
          updated_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error("Error saving profile to Supabase:", err);
    }
  };

  const saveInvoicesToCache = (newInvoices: Invoice[]) => {
    if (user && typeof window !== "undefined") {
      const storageKey = `facture_izi_user_invoices_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(newInvoices));
    }
  };

  const addInvoice = (invoiceData: Omit<Invoice, "id">): Invoice => {
    const newId = `inv-${Date.now()}`;
    const newInvoice: Invoice = {
      ...invoiceData,
      id: newId,
    };
    const updated = [newInvoice, ...invoices];
    setInvoices(updated);
    saveInvoicesToCache(updated);

    // Save async to Supabase
    (async () => {
      try {
        const userId = user?.id || (await supabase.auth.getUser()).data.user?.id || null;

        await supabase.from("invoices").insert({
          id: newId,
          user_id: userId,
          number: newInvoice.number,
          client_name: newInvoice.clientName,
          client_company: newInvoice.clientCompany,
          client_email: newInvoice.clientEmail,
          issue_date: newInvoice.issueDate,
          due_date: newInvoice.dueDate,
          amount: newInvoice.amount,
          subtotal: newInvoice.subtotal,
          tax_amount: newInvoice.taxAmount,
          discount_amount: newInvoice.discountAmount,
          status: newInvoice.status,
          items_count: newInvoice.itemsCount,
          notes: newInvoice.notes,
        });

        if (newInvoice.items && newInvoice.items.length > 0) {
          const itemsPayload = newInvoice.items.map((it) => ({
            id: `${newId}-${it.id}`,
            invoice_id: newId,
            name: it.name,
            quantity: it.quantity,
            unit_price: it.unitPrice,
            tax_rate: it.taxRate,
            total: it.quantity * it.unitPrice,
          }));
          await supabase.from("invoice_items").insert(itemsPayload);
        }
      } catch (err) {
        console.error("Error inserting invoice to Supabase:", err);
      }
    })();

    return newInvoice;
  };

  const updateInvoice = (id: string, invoiceData: Partial<Invoice>) => {
    const updated = invoices.map((inv) =>
      inv.id === id ? { ...inv, ...invoiceData } : inv
    );
    setInvoices(updated);
    saveInvoicesToCache(updated);

    // Save async to Supabase
    (async () => {
      try {
        const updatePayload: Record<string, unknown> = {};
        if (invoiceData.number) updatePayload.number = invoiceData.number;
        if (invoiceData.clientName) updatePayload.client_name = invoiceData.clientName;
        if (invoiceData.clientCompany) updatePayload.client_company = invoiceData.clientCompany;
        if (invoiceData.clientEmail) updatePayload.client_email = invoiceData.clientEmail;
        if (invoiceData.issueDate) updatePayload.issue_date = invoiceData.issueDate;
        if (invoiceData.dueDate) updatePayload.due_date = invoiceData.dueDate;
        if (invoiceData.amount !== undefined) updatePayload.amount = invoiceData.amount;
        if (invoiceData.subtotal !== undefined) updatePayload.subtotal = invoiceData.subtotal;
        if (invoiceData.taxAmount !== undefined) updatePayload.tax_amount = invoiceData.taxAmount;
        if (invoiceData.discountAmount !== undefined) updatePayload.discount_amount = invoiceData.discountAmount;
        if (invoiceData.status) updatePayload.status = invoiceData.status;
        if (invoiceData.itemsCount !== undefined) updatePayload.items_count = invoiceData.itemsCount;

        await supabase.from("invoices").update(updatePayload).eq("id", id);

        if (invoiceData.items) {
          await supabase.from("invoice_items").delete().eq("invoice_id", id);
          const itemsPayload = invoiceData.items.map((it) => ({
            id: `${id}-${it.id}`,
            invoice_id: id,
            name: it.name,
            quantity: it.quantity,
            unit_price: it.unitPrice,
            tax_rate: it.taxRate,
            total: it.quantity * it.unitPrice,
          }));
          await supabase.from("invoice_items").insert(itemsPayload);
        }
      } catch (err) {
        console.error("Error updating invoice in Supabase:", err);
      }
    })();
  };

  const updateInvoiceStatus = (id: string, status: Invoice["status"]) => {
    const updated = invoices.map((inv) =>
      inv.id === id ? { ...inv, status } : inv
    );
    setInvoices(updated);
    saveInvoicesToCache(updated);

    // Save async to Supabase
    (async () => {
      try {
        await supabase.from("invoices").update({ status }).eq("id", id);
      } catch (err) {
        console.error("Error updating invoice status in Supabase:", err);
      }
    })();
  };

  const deleteInvoice = (id: string) => {
    const updated = invoices.filter((inv) => inv.id !== id);
    setInvoices(updated);
    saveInvoicesToCache(updated);

    // Delete async from Supabase
    (async () => {
      try {
        await supabase.from("invoices").delete().eq("id", id);
      } catch (err) {
        console.error("Error deleting invoice from Supabase:", err);
      }
    })();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        userLoading,
        invoices,
        companyProfile,
        addInvoice,
        updateInvoice,
        updateInvoiceStatus,
        deleteInvoice,
        updateCompanyProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
