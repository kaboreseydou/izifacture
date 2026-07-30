# Standards et Directives Officiels du Projet facture.izi

## 1. Règle d'Arrêt et de Réponse Immédiate (Pas de Boucles d'Attente)
- Dès que les modifications de code sont apportées et que la compilation ou le build (`npm run build`) est validé avec succès, **l'agent doit immédiatement s'arrêter et répondre à l'utilisateur**.
- Ne jamais lancer de boucles de timers (`schedule`) ou de vérifications d'arrière-plan secondaires lorsque le travail est déjà achevé et fonctionnel.
- Présenter les résultats de manière synthétique et directe sans faire attendre l'utilisateur.

---

## 2. Charte Graphique & Design System Unifié (Basé sur le Tableau de Bord)

Toutes les nouvelles pages et tous les nouveaux composants du projet **facture.izi** doivent obligatoirement respecter l'ensemble des règles visuelles ci-dessous :

### A. Disposition & Structure de Page
- **Fond Général** : Fond gris très clair ultra-pur (`#f4f5f8` / `bg-[#f4f5f8]`) en mode clair et sombre profond (`bg-gray-950` / `#0b0f19`) en mode sombre.
- **Cartes & Conteneurs** : Cartes blanches surélevées (`bg-white dark:bg-gray-900`), coins très arrondis (`rounded-2xl` ou `rounded-3xl`), bordures ultra-fines (`border border-gray-200/80 dark:border-gray-800`), et ombres douces SaaS Dribbble (`shadow-xs` / `shadow-sm` / `shadow-2xl` pour l'aperçu).
- **Sidebar de Navigation** :
  - Logo `facture.izi` avec badge icône bleue et texte en gras.
  - Champ de recherche rapide `Rechercher... ⌘F`.
  - Élément actif du menu stylisé en **carte blanche surélevée avec bordure fine et ombre douce** (`bg-white shadow-sm font-bold text-gray-900`).
  - Carte profil utilisateur en bas de sidebar (`Kofi Mensah` / `kofi@atlantique.sn`).

### B. Typographie, Langue & Formats Métier (Obligatoires)
- **Langue de l'Interface** : **100 % Français (FR)** sur tous les boutons, titres, menus, labels et notifications.
- **Format Financier** : Montants obligatoirement en **Franc CFA (FCFA)** formatés sans décimales inutiles avec séparateur de milliers (`250 000 FCFA`).
- **Format de Date** : Dates obligatoirement affichées au format **Jour/Mois/Année (`JJ/MM/AAAA`)**.
- **Numérotation des Documents** : Format standardisé UEMOA/CEMAC (ex: `#FAC-2026-0049`).

### C. Composants d'Interface Réutilisables & Formulaires
- **Inputs Outlined avec Floating Inset Labels** :
  - Les champs de saisie doivent utiliser la structure de label incrusté en haut à gauche (`absolute -top-2.5 left-3 bg-white px-1 text-[10px] font-bold`).
- **Sélecteur de Date (DatePicker)** :
  - Utilisation systématique du composant `<DatePicker>` Popover avec calendrier interactif (sélection Jour, Mois, Année et raccourci *Aujourd'hui*) évitant tout débordement d'affichage.
- **Onglets Segmentés (Pill Tabs)** :
  - Conteneur arrondi gris clair (`p-1 rounded-2xl bg-gray-200/70`) avec onglets d'état commutables sous forme de cartes blanches (`bg-white shadow-sm font-bold`).
- **Boutons d'Action** :
  - *Bouton Principal* : Bleu électrique avec effet micro-animation (`bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold active:scale-95 shadow-md shadow-blue-500/20`).
  - *Bouton Secondaire* : Carte blanche bordée (`bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 rounded-xl font-extrabold`).

### D. Badges de Statut Facture
- **Payée** : Vert Émeraude (`bg-emerald-50 text-emerald-700 border-emerald-200`).
- **Envoyée** : Bleu Ciel / Indigo (`bg-blue-50 text-blue-700 border-blue-200`).
- **Brouillon** : Gris Neutre (`bg-gray-100 text-gray-700 border-gray-200`).
- **En retard** : Rouge Rose (`bg-rose-50 text-rose-700 border-rose-200`).

---

## 3. Méthodologie d'Implémentation pour les Nouvelles Pages
1. Importer et intégrer la `<Sidebar>` et le composant de mise en page réutilisable.
2. Utiliser la palette de couleurs et les tokens CSS définis dans `globals.css` et `tailwind.config.ts`.
3. Valider la compilation complète avec `npm run build` après chaque ajout d'écran ou de fonctionnalité.
