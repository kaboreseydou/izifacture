# 📘 Documentation Officielle du Projet — `facture.izi`

Ce document sert de **référence architecturale, technique et de design** pour l'application **facture.izi** (SaaS de facturation et gestion financière conçu sur-mesure pour les entreprises de la zone UEMOA / CEMAC). Il est destiné à guider les développeurs et modèles d'IA (Antigravity, Gemini, GPT, Claude) lors de futures évolutions ou révisions du code.

---

## 📌 1. Vue d'Ensemble du Projet

**facture.izi** est une plateforme SaaS de facturation moderne, réactive et intuitive. Elle permet aux entreprises, PME et indépendants d'émettre des factures professionnelles en Franc CFA (FCFA) conformes aux normes fiscales UEMOA/CEMAC en moins d'une minute, de suivre leurs encaissements en temps réel et d'automatiser la relance des impayés.

### 🎯 Objectifs Clés
- **Expérience Utilisateur SaaS Premium** : Design moderne inspiré des meilleurs mockups Dribbble (cartes surélevées, ombres douces, micro-animations, verre dépoli `backdrop-blur`).
- **Conformité Régionale FCFA (UEMOA / CEMAC)** : Devise par défaut en FCFA (`XOF` / `XAF`), calcul automatique de la TVA UEMOA (18%), numérotation standardisée (`#FAC-2026-0049`) et mentions des NIF/RCCM.
- **Réactivité & Synchronisation Immédiate** : Modification des paramètres de l'émetteur et ajout/édition de factures synchronisés en temps réel sur l'ensemble de l'application via React Context API et persistance `localStorage`.
- **Zéro Dépendance Lourde Inutile** : Code pur Next.js 14 App Router + TailwindCSS + Lucide Icons sans surcouche inutile.

---

## 🚀 2. Fonctionnalités & Pages de l'Application

L'application comporte **5 rubriques principales** accessibles depuis la barre de navigation latérale (`Sidebar`) :

### 📊 A. Tableau de Bord (`/`)
- **Bannière d'Accueil Réactive** : Message personnalisé avec le nom de l'utilisateur et le nom de l'entreprise synchronisés depuis les Paramètres.
- **4 Cartes KPI Interactives (`StatCards`)** :
  - *Chiffre d'Affaires Total Facturé* (en FCFA).
  - *Total Encaissé* (en FCFA).
  - *Factures en Attente / En Retard* (nombre & montant).
  - *Total Clients Actifs*.
  - Clic sur une carte filtre automatiquement la table des factures en bas de page.
- **Graphique de Revenus (`RevenueChart`)** : Évolution mensuelle des facturations vs encaissements sur 6 mois via `Recharts`.
- **Alertes Impayés (`UnpaidAlerts`)** : Liste des clients prioritaires à relancer avec raccourci vers l'envoi d'un rappel.
- **Table des Dernières Factures (`RecentInvoices`)** : Table réactive avec barre de recherche dédiée (filtrage par numéro, client, entreprise ou statut).

### 📝 B. Création & Édition de Facture (`/factures/nouvelle` & `/factures/nouvelle?edit=[ID]`)
- **Mode Création & Mode Édition** : Si l'URL comporte `?edit=[ID]`, la page pré-remplit automatiquement l'intégralité du formulaire et bascule en mode modification sans créer de doublon.
- **Formulaire de Saisie Réactif** :
  - *Sélection du Client* via composant `<CustomSelect>` déroulant connecté au répertoire des clients.
  - *Date d'émission & Date d'échéance* sélectionnées via le composant interactif `<DatePicker>` Popover.
  - *Prestations & Lignes de Facture* : Ajout/suppression dynamique de lignes avec désignation, quantité, prix unitaire FCFA et taux de TVA. Total calculé automatiquement.
  - *Gestion des Remises* : Option pour appliquer une remise avec sélection du motif (*Remise de fin d'année, Remise Partenaire, Client Fidèle*).
- **Feuille d'Aperçu en Direct (`Live Preview`)** :
  - Modèle de document A4 élégant mis à jour à chaque frappe dans le formulaire.
  - Section *« Émise par »* directement synchronisée avec le Profil Entreprise de la page Paramètres.
  - Section *« Coordonnées de Paiement »* (IBAN, Wave, Orange Money) synchronisées.
- **Modal de Succès & Impression / PDF Propre** :
  - Lors de la validation (*« Créer la facture »* ou *« Mettre à jour la facture »*), un modal de succès s'affiche avec 2 options :
    1. 📥 *Télécharger la facture (PDF)* : Ferme le modal et déclenche la fonction d'impression propre avec masque CSS `@media print` (les sidebars, boutons et overlay s'effacent pour ne capturer que la feuille A4).
    2. ↩️ *Retourner aux factures* : Redirige vers `/factures`.

### 📑 C. Liste des Factures (`/factures`)
- **Tableau Synthétique Complète** : Numéro, nom du client, entreprise, dates, montant TTC FCFA et badge de statut.
- **Onglets Segmentés par Statut (*Pill Tabs*)** : Filtrage instantané entre *Toutes*, *Payées*, *Envoyées*, *Brouillons*, *En retard*.
- **Barre de Recherche Multi-critères** : Recherche par client, raison sociale ou numéro de document.
- **Navigation au Clic** : Ouverture de la page de détail `/factures/[id]`.

### 📄 D. Détail de Facture (`/factures/[id]`)
- **Affichage Complet du Document** : En-tête, informations de l'émetteur (Paramètres), client, dates, tableau des articles, sous-total HT, TVA UEMOA 18% et Total TTC.
- **Changement de Statut Réactif** : Sélecteur déroulant `<CustomSelect>` pour modifier le statut en direct (*Payée*, *Envoyée*, *Brouillon*, *En retard*).
- **Bouton Modifier** : Redirige vers `/factures/nouvelle?edit=[id]` en pré-remplissant les données.
- **Bouton Imprimer / PDF** : Impression HD propre de la facture.
- **Suppression Sécurisée** : Bouton de suppression avec **Modal de confirmation de suppression**.

### 👥 E. Répertoire des Clients (`/clients`)
- **Grille de Cartes Clients** : Cartes avec nom du contact, entreprise, email, téléphone, adresse physique, NIF, RCCM, statut et total facturé.
- **Modal d'Ajout & Édition de Client** : Formulaire modal pour ajouter un nouveau client ou modifier un contact existant.
- **Recherche Instantanée** : Filtre par nom, entreprise ou adresse email.

### ⚙️ F. Paramètres du Compte (`/parametres`)
- **Onglets Segmentés** :
  1. *Profil Entreprise* : Nom du responsable, raison sociale/nom légal, email pro, téléphone pro, adresse du siège, NIF/IFU, RCCM.
  2. *Facturation & TVA* : Devise principale (`XOF`, `XAF`, `EUR`, `USD`), taux de TVA par défaut (18%), préfixe de numérotation (`FAC-2026-`).
  3. *Modes de Règlement* : IBAN / RIB bancaire, numéro Wave Money, numéro Orange Money.
  4. *Sécurité* : Modification du mot de passe.
- **Répercussion Immédiate** : Dès l'enregistrement, ces données se mettent à jour sur l'émetteur de toutes les factures (existantes et futures).

### ❓ G. Aide & Support (`/support`)
- **Cartes de Raccourcis** : Guide de démarrage, Support WhatsApp direct (`+221 77 000 00 00`), Assistance email.
- **FAQ Accordéon Interactif** : Foire aux questions sur la TVA 18%, l'export PDF, Mobile Money et les impayés.
- **Formulaire de Contact Direct** : Envoi de message à l'équipe support avec notification toast.

---

## 🛠️ 3. Technologies & Architecture Technique

| Domaine | Technologie / Bibliothèque | Rôle |
| :--- | :--- | :--- |
| **Framework Web** | Next.js 14.2 (App Router) | Rendue React, routage par dossiers, SSR & static generation |
| **Langage** | TypeScript 5 | Typage strict de toutes les entités (`Invoice`, `Client`, `CompanyProfile`) |
| **UI Library** | React 18 | Composants réutilisables, hooks d'état et d'effets |
| **Styling** | Vanilla CSS + TailwindCSS 3.4 | Tokens CSS, utility classes, mode sombre (`dark:`), animations |
| **Icônes** | Lucide React | Icônes modernes vectorielles SVG |
| **Graphiques** | Recharts 3.x | Visualisation des données financières (facturé vs encaissé) |
| **State Management** | React Context API (`useApp`) | État réactif partagé pour les factures et le profil émetteur |
| **Persistance** | Browser `localStorage` | Sauvegarde automatique des factures et paramètres côté client |

---

## 🎨 4. Charte Graphique & Design System Unifié

Toutes les pages de l'application respectent scrupuleusement la charte établie dans la règle du projet (`.agents/AGENTS.md`) :

### A. Palette de Couleurs & Mode Sombre
- **Fond Général** : `#f4f5f8` / `bg-[#f4f5f8]` en mode clair et `#0b0f19` / `bg-gray-950` en mode sombre.
- **Couleur Primaire (Action)** : Bleu électrique `#2563eb` (`bg-blue-600 hover:bg-blue-700`). Effet ombre `shadow-blue-500/20`.
- **Cartes & Conteneurs** : Cartes blanches surélevées (`bg-white dark:bg-gray-900`), coins très arrondis (`rounded-2xl` / `rounded-3xl`), bordures ultra-fines (`border border-gray-200/80 dark:border-gray-800`), et ombres douces SaaS Dribbble (`shadow-xs` / `shadow-2xl`).

### B. Typographie & Formats Métier
- **Langue** : **100 % Français (FR)** sur tous les éléments d'interface.
- **Format Financier** : Montants obligatoirement en **Franc CFA (FCFA)** formatés sans décimales inutiles avec séparateur de milliers (`2 500 000 FCFA`).
- **Format de Date** : **Jour/Mois/Année (`JJ/MM/AAAA`)**.
- **Numérotation des Factures** : Format standard UEMOA/CEMAC (`#FAC-2026-0049`).

### C. Composants d'Interface Déclarés
1. **Inputs Outlined avec Floating Inset Labels** : Label incrusté en haut à gauche (`absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-extrabold`).
2. **Sélecteur de Date (`<DatePicker>`)** : Popover interactif avec calendrier de sélection Jour/Mois/Année et raccourci *Aujourd'hui*.
3. **Menu Déroulant sur Mesure (`<CustomSelect>`)** : Popover sur-mesure stylisé en verre dépoli (`backdrop-blur-md rounded-2xl shadow-2xl`) remplaçant les `<select>` natifs bruts.
4. **Onglets Segmentés (*Pill Tabs*)** : Conteneur arrondi gris (`bg-gray-200/70 dark:bg-gray-800/80`) avec onglets commutables sous forme de cartes blanches (`bg-white shadow-sm font-bold`).
5. **Badges de Statut Facture** :
   - *Payée* : Emerald (`bg-emerald-50 text-emerald-700 border-emerald-200`).
   - *Envoyée* : Blue (`bg-blue-50 text-blue-700 border-blue-200`).
   - *Brouillon* : Gray (`bg-gray-100 text-gray-700 border-gray-200`).
   - *En retard* : Rose (`bg-rose-50 text-rose-700 border-rose-200`).

---

## 📁 5. Arborescence du Projet

```
facture.izi/
├── .agents/
│   └── AGENTS.md                  # Règle officielle d'arrêtt, de design et de normes métier
├── app/
│   ├── clients/
│   │   └── page.tsx               # Page Répertoire des Clients
│   ├── factures/
│   │   ├── [id]/
│   │   │   └── page.tsx           # Page Détail de Facture (Impression / Supprimer / Statut)
│   │   ├── nouvelle/
│   │   │   └── page.tsx           # Page Créer / Modifier une Facture (?edit=id)
│   │   └── page.tsx               # Page Liste de Toutes les Factures
│   ├── parametres/
│   │   └── page.tsx               # Page Paramètres (Profil, TVA, Paiements, Sécurité)
│   ├── support/
│   │   └── page.tsx               # Page Centre d'Aide & Support (FAQ, Contact)
│   ├── globals.css                # Style global, variables Tailwind, custom scrollbars, print CSS
│   ├── layout.tsx                 # Root layout enveloppé par AppProvider
│   └── page.tsx                   # Page Tableau de Bord Principal (Dashboard)
├── components/
│   ├── dashboard/
│   │   ├── recent-invoices.tsx    # Table des dernières factures du Dashboard
│   │   ├── revenue-chart.tsx      # Graphique des revenus Recharts
│   │   ├── stat-cards.tsx         # 4 Cartes KPI interactives
│   │   └── unpaid-alerts.tsx      # Panneau d'alertes clients impayés
│   ├── layout/
│   │   ├── sidebar.tsx            # Barre de navigation latérale (5 rubriques + Profil)
│   │   └── topbar.tsx             # Barre supérieure avec titre et recherche
│   └── shared/
│       ├── custom-select.tsx      # Composant Select sur-mesure Dribbble avec Popover
│       ├── date-picker.tsx        # Composant DatePicker Popover interactif
│       └── status-badge.tsx       # Badge de statut de facture réutilisable
├── lib/
│   ├── context/
│   │   └── app-context.tsx        # React Context API (Invoices + CompanyProfile state + localStorage)
│   ├── data/
│   │   └── mock/
│   │       └── fixtures.ts        # Données de test et interfaces TypeScript
│   └── utils.ts                   # Utilitaires de formatage FCFA et dates
├── public/                        # Assets statiques (Logos, favicons)
├── .gitignore
├── GEMINI.md                      # Fichier de référence et documentation AI du projet
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🤖 6. Instructions pour les Futurs Modèles d'IA & Agents

Lorsque vous intervenez sur ce projet :

1. **Règle d'Arrêt Immédiat après Build** :
   - Dès que vous modifiez un fichier ou ajoutez une fonctionnalité, vous **DEVEZ** vérifier la compilation avec `npm run build`.
   - Dès que le build est validé (`✓ Generating static pages (10/10)`), **répondez immédiatement à l'utilisateur de manière concise et directe**. Ne lancez pas de boucles de vérification secondaires.

2. **Respect de l'État Global (`AppContext`)** :
   - Ne créez pas d'états isolés sans les connecter à `useApp()`. Toutes les factures et le profil émetteur doivent transiter par `lib/context/app-context.tsx`.

3. **Gestion du Mode Édition (`?edit=id`)** :
   - Lorsque l'utilisateur modifie une facture sur `/factures/nouvelle?edit=[ID]`, veillez à toujours utiliser `updateInvoice(id, payload)` pour mettre à jour l'existant sans doubler le document.

4. **Style d'Impression & PDF (`@media print`)** :
   - Toutes les pages ou composants affichant une facture doivent conserver la classe `.print-clean-invoice` et les éléments d'interface non imprimables la classe `.no-print`.

5. **Interface 100% en Français & FCFA** :
   - Aucun mot en anglais dans les boutons, titres, labels ou toasts. Montants toujours formatés via `formatFCFA(...)`.

---
*Dernière mise à jour du document : Juillet 2026.*
