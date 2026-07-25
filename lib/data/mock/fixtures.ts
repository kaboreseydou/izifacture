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

export interface TopClient {
  id: string;
  name: string;
  company: string;
  totalBilled: number;
  invoicesCount: number;
  status: "actif" | "impaye";
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

export const MOCK_RECENT_INVOICES: Invoice[] = [
  {
    id: "inv-001",
    number: "FAC-2026-0048",
    clientName: "Amadou Diallo",
    clientEmail: "a.diallo@saheltech.sn",
    clientCompany: "SahelTech Digital",
    issueDate: "2026-07-20",
    dueDate: "2026-08-20",
    amount: 1450000,
    status: "payee",
    itemsCount: 3,
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
    itemsCount: 5,
  },
  {
    id: "inv-003",
    number: "FAC-2026-0046",
    clientName: "Koffi Mensah",
    clientEmail: "koffi@atlantique-logistics.bj",
    clientCompany: "Atlantique Logistics",
    issueDate: "2026-06-12",
    dueDate: "2026-07-12",
    amount: 950000,
    status: "en_retard",
    itemsCount: 2,
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
    itemsCount: 6,
  },
  {
    id: "inv-006",
    number: "FAC-2026-0043",
    clientName: "Yao Soro",
    clientEmail: "y.soro@ebene-consulting.ci",
    clientCompany: "Ébène Consulting",
    issueDate: "2026-06-01",
    dueDate: "2026-07-01",
    amount: 1850000,
    status: "en_retard",
    itemsCount: 4,
  },
  {
    id: "inv-007",
    number: "FAC-2026-0042",
    clientName: "Saliou Camara",
    clientEmail: "s.camara@guinee-solar.gn",
    clientCompany: "Guinée Solar Solutions",
    issueDate: "2026-07-10",
    dueDate: "2026-08-10",
    amount: 680000,
    status: "envoyee",
    itemsCount: 2,
  },
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
