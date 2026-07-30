"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/sidebar";
import {
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  ChevronDown,
  Send,
  CheckCircle,
  Menu,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export default function SupportPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    subject: "",
    message: "",
    email: "kofi@atlantique.sn",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("Votre message a été envoyé à l'équipe support !");
    setForm({ subject: "", message: "", email: "kofi@atlantique.sn" });
    setTimeout(() => setToastMessage(null), 2500);
  };

  const faqs = [
    {
      question: "Comment est calculée la TVA UEMOA (18%) sur facture.izi ?",
      answer:
        "La TVA UEMOA/CEMAC est automatiquement calculée à hauteur de 18% sur le montant Hors Taxes (HT) de vos prestations. Vous pouvez personnaliser ou exonérer la TVA directement ligne par ligne.",
    },
    {
      question: "Comment exporter mes factures au format PDF ?",
      answer:
        "Sur n'importe quelle facture dans votre espace, cliquez sur le bouton « PDF » ou « Imprimer » en haut à droite du document pour télécharger une version HD prête à être imprimée ou envoyée.",
    },
    {
      question: "Comment recevoir mes paiements par Wave ou Orange Money ?",
      answer:
        "Allez dans Paramètres > Modes de Règlement et renseignez vos numéros Wave et Orange Money. Ils apparaîtront automatiquement au bas de vos factures pour vos clients.",
    },
    {
      question: "Que faire en cas d'impayé ou de retard de paiement ?",
      answer:
        "La plateforme identifie automatiquement les factures échues et affiche une alerte sur votre tableau de bord. Vous pouvez envoyer une relance automatique par mail en 1 clic.",
    },
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
          <div className="flex items-center justify-between">
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
                  Aide & Support
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Centre d&apos;Aide & Support
              </h1>
              <p className="text-xs text-gray-400">
                Trouvez rapidement des réponses ou contactez notre équipe disponible 7j/7.
              </p>
            </div>
          </div>

          {/* Quick Help Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                Guide de Démarrage
              </h3>
              <p className="text-xs text-gray-400">
                Apprenez à paramétrer vos factures, vos devises et votre NIF en 3 minutes.
              </p>
              <span className="text-xs font-bold text-blue-600 cursor-pointer hover:underline inline-block">
                Consulter le guide →
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                Support WhatsApp
              </h3>
              <p className="text-xs text-gray-400">
                Assistance directe via WhatsApp avec nos experts comptables UEMOA.
              </p>
              <span className="text-xs font-bold text-emerald-600 cursor-pointer hover:underline inline-block">
                +221 77 000 00 00 →
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                Assistance Email
              </h3>
              <p className="text-xs text-gray-400">
                Envoyez-nous un message, réponse garantie en moins de 2 heures.
              </p>
              <span className="text-xs font-bold text-indigo-600 cursor-pointer hover:underline inline-block">
                support@facture.izi →
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* FAQ Accordion Left */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
                <h2 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Foire Aux Questions (FAQ)</span>
                </h2>

                <div className="divide-y divide-gray-100 dark:divide-gray-800 space-y-2 pt-2">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="pt-3">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenFaqIndex(isOpen ? null : idx)
                          }
                          className="w-full flex items-center justify-between text-left py-2 text-xs font-extrabold text-gray-900 dark:text-white hover:text-blue-600 transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
                              isOpen ? "rotate-180 text-blue-600" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="pb-3 text-xs text-gray-500 leading-relaxed font-medium animate-in fade-in-50 duration-150">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form Right */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
                <h2 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span>Envoyer un message au support</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Votre Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Sujet du message *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Question sur l'export PDF"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Décrivez votre demande..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer le message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
