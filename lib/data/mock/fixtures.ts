export interface InvoiceLineItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  avatarUrl?: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: "payee" | "envoyee" | "brouillon" | "en_retard";
  itemsCount: number;
  items?: InvoiceLineItem[];
  subtotal?: number;
  taxAmount?: number;
  discountAmount?: number;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  nif: string;
  rccm: string;
  totalBilled: number;
  invoicesCount: number;
  status: "actif" | "impaye";
}

export interface TopClient {
  id: string;
  name: string;
  company: string;
  totalBilled: number;
  invoicesCount: number;
  status: "actif" | "impaye";
}

export interface DashboardStats {
  totalInvoices: number;
  totalBilled: number;
  totalPaid: number;
  totalPending: number;
  billedGrowth: number;
  paidGrowth: number;
  pendingCount: number;
}

export interface RevenueDataPoint {
  month: string;
  facture: number;
  encaisse: number;
}

export const MOCK_STATS: DashboardStats = {
  totalInvoices: 48,
  totalBilled: 18450000,
  totalPaid: 14200000,
  totalPending: 4250000,
  billedGrowth: 14.2,
  paidGrowth: 18.5,
  pendingCount: 5,
};

export const MOCK_REVENUE_CHART: RevenueDataPoint[] = [
  { month: "Fév", facture: 2100000, encaisse: 1800000 },
  { month: "Mar", facture: 2800000, encaisse: 2400000 },
  { month: "Avr", facture: 2400000, encaisse: 2200000 },
  { month: "Mai", facture: 3500000, encaisse: 2900000 },
  { month: "Juin", facture: 3900000, encaisse: 3100000 },
  { month: "Juil", facture: 3750000, encaisse: 1800000 },
];

export const MOCK_TOP_CLIENTS: TopClient[] = [
  {
    id: "cli-01",
    name: "Dakar Construction BTP",
    company: "Dakar BTP S.A.",
    totalBilled: 5400000,
    invoicesCount: 8,
    status: "actif",
  },
  {
    id: "cli-02",
    name: "Orisha Agro-Industrie",
    company: "Orisha Group",
    totalBilled: 4200000,
    invoicesCount: 6,
    status: "actif",
  },
  {
    id: "cli-03",
    name: "Atlantique Logistics",
    company: "Atlantique SA",
    totalBilled: 2950000,
    invoicesCount: 4,
    status: "impaye",
  },
];

export const MOCK_CLIENTS: Client[] = [
  {
    id: "cli-001",
    name: "Amadou Diallo",
    company: "SahelTech Digital S.A.",
    email: "a.diallo@saheltech.sn",
    phone: "+221 77 450 12 34",
    address: "Rue 10 x Avenue Cheikh Anta Diop, Dakar",
    nif: "SN-DKR-2024-B-1402",
    rccm: "SN-DKR-2024-B-9981",
    totalBilled: 5400000,
    invoicesCount: 8,
    status: "actif",
  },
  {
    id: "cli-002",
    name: "Fatou Kéré",
    company: "Orisha Agro-Industrie",
    email: "fatou.kere@orisha-agri.ci",
    phone: "+225 07 08 45 12 90",
    address: "Boulevard VGE, Immeuble Horizon, Abidjan",
    nif: "CI-ABJ-2023-M-4810",
    rccm: "CI-ABJ-2023-B-3341",
    totalBilled: 4200000,
    invoicesCount: 6,
    status: "actif",
  },
  {
    id: "cli-003",
    name: "Koffi Mensah",
    company: "Atlantique Logistics S.A.",
    email: "koffi@atlantique-logistics.bj",
    phone: "+229 97 12 34 56",
    address: "Zone Portuaire, Lot 45, Cotonou",
    nif: "BJ-COT-2022-A-1102",
    rccm: "BJ-COT-2022-B-5520",
    totalBilled: 2950000,
    invoicesCount: 4,
    status: "impaye",
  },
  {
    id: "cli-004",
    name: "Aïcha Traoré",
    company: "Savana Design Studio",
    email: "aicha@savana-design.bf",
    phone: "+226 70 21 88 44",
    address: "Avenue Kwamé N'Krumah, Ouagadougou",
    nif: "BF-OUA-2024-M-9021",
    rccm: "BF-OUA-2024-B-1123",
    totalBilled: 1250000,
    invoicesCount: 3,
    status: "actif",
  },
  {
    id: "cli-005",
    name: "Moussa Diop",
    company: "Dakar Construction BTP",
    email: "m.diop@dakar-btp.sn",
    phone: "+221 78 332 90 00",
    address: "Zone Industrielle de Mbao, Dakar",
    nif: "SN-DKR-2021-B-3301",
    rccm: "SN-DKR-2021-B-4410",
    totalBilled: 6800000,
    invoicesCount: 9,
    status: "actif",
  },
  {
    id: "cli-006",
    name: "Yao Soro",
    company: "Ébène Consulting Côte d'Ivoire",
    email: "y.soro@ebene-consulting.ci",
    phone: "+225 05 44 99 11 22",
    address: "Cocody Ambassades, Rue des Jardins, Abidjan",
    nif: "CI-ABJ-2022-M-8890",
    rccm: "CI-ABJ-2022-B-7712",
    totalBilled: 3100000,
    invoicesCount: 5,
    status: "impaye",
  },
];

export const MOCK_RECENT_INVOICES: Invoice[] = [
  {
    id: "inv-001",
    number: "FAC-2026-0048",
    clientName: "Amadou Diallo",
    clientEmail: "a.diallo@saheltech.sn",
    clientCompany: "SahelTech Digital S.A.",
    issueDate: "2026-07-20",
    dueDate: "2026-08-20",
    amount: 1450000,
    status: "payee",
    itemsCount: 3,
    subtotal: 1228814,
    taxAmount: 221186,
    discountAmount: 0,
    notes: "Facture acquittée par virement Wave.",
    items: [
      {
        id: "li-1",
        name: "Développement Application Web SaaS",
        quantity: 1,
        unitPrice: 900000,
        taxRate: 18,
        total: 900000,
      },
      {
        id: "li-2",
        name: "Intégration API de Paiement Mobile Money",
        quantity: 1,
        unitPrice: 250000,
        taxRate: 18,
        total: 250000,
      },
      {
        id: "li-3",
        name: "Hébergement Cloud & SSL (1 An)",
        quantity: 1,
        unitPrice: 78814,
        taxRate: 18,
        total: 78814,
      },
    ],
  },
  {
    id: "inv-002",
    number: "FAC-2026-0047",
    clientName: "Fatou Kéré",
    clientEmail: "fatou.kere@orisha-agri.ci",
    clientCompany: "Orisha Agro-Industrie",
    issueDate: "2026-07-18",
    dueDate: "2026-08-18",
    amount: 2850000,
    status: "envoyee",
    itemsCount: 2,
    subtotal: 2415254,
    taxAmount: 434746,
    discountAmount: 0,
    notes: "Règlement sous 30 jours par virement bancaire.",
    items: [
      {
        id: "li-4",
        name: "Système de Gestion des Stocks Agro",
        quantity: 1,
        unitPrice: 2000000,
        taxRate: 18,
        total: 2000000,
      },
      {
        id: "li-5",
        name: "Formation des équipes utilisateurs",
        quantity: 2,
        unitPrice: 207627,
        taxRate: 18,
        total: 415254,
      },
    ],
  },
  {
    id: "inv-003",
    number: "FAC-2026-0046",
    clientName: "Koffi Mensah",
    clientEmail: "koffi@atlantique-logistics.bj",
    clientCompany: "Atlantique Logistics S.A.",
    issueDate: "2026-06-12",
    dueDate: "2026-07-12",
    amount: 950000,
    status: "en_retard",
    itemsCount: 1,
    subtotal: 805085,
    taxAmount: 144915,
    discountAmount: 0,
    notes: "Facture en souffrance — Relance effectuée.",
    items: [
      {
        id: "li-6",
        name: "Audit d'infrastructure Logistique IT",
        quantity: 1,
        unitPrice: 805085,
        taxRate: 18,
        total: 805085,
      },
    ],
  },
  {
    id: "inv-004",
    number: "FAC-2026-0045",
    clientName: "Aïcha Traoré",
    clientEmail: "aicha@savana-design.bf",
    clientCompany: "Savana Design Studio",
    issueDate: "2026-07-24",
    dueDate: "2026-08-24",
    amount: 420000,
    status: "brouillon",
    itemsCount: 1,
    subtotal: 355932,
    taxAmount: 64068,
    discountAmount: 0,
    notes: "Brouillon en cours de validation.",
    items: [
      {
        id: "li-7",
        name: "Refonte de Charte Graphique",
        quantity: 1,
        unitPrice: 355932,
        taxRate: 18,
        total: 355932,
      },
    ],
  },
  {
    id: "inv-005",
    number: "FAC-2026-0044",
    clientName: "Moussa Diop",
    clientEmail: "m.diop@dakar-btp.sn",
    clientCompany: "Dakar Construction BTP",
    issueDate: "2026-07-15",
    dueDate: "2026-08-15",
    amount: 3200000,
    status: "payee",
    itemsCount: 2,
    subtotal: 2711864,
    taxAmount: 488136,
    discountAmount: 0,
    notes: "Facture réglée par chèque certifié.",
    items: [
      {
        id: "li-8",
        name: "Supervision Chantier Numérique",
        quantity: 1,
        unitPrice: 2000000,
        taxRate: 18,
        total: 2000000,
      },
      {
        id: "li-9",
        name: "Installation Capteurs IoT BTP",
        quantity: 5,
        unitPrice: 142373,
        taxRate: 18,
        total: 711864,
      },
    ],
  },
  {
    id: "inv-006",
    number: "FAC-2026-0043",
    clientName: "Yao Soro",
    clientEmail: "y.soro@ebene-consulting.ci",
    clientCompany: "Ébène Consulting Côte d'Ivoire",
    issueDate: "2026-06-01",
    dueDate: "2026-07-01",
    amount: 1850000,
    status: "en_retard",
    itemsCount: 2,
    subtotal: 1567797,
    taxAmount: 282203,
    discountAmount: 0,
    notes: "Pénalité de retard applicable.",
    items: [
      {
        id: "li-10",
        name: "Accompagnement Stratégique Digital",
        quantity: 1,
        unitPrice: 1567797,
        taxRate: 18,
        total: 1567797,
      },
    ],
  },
];
