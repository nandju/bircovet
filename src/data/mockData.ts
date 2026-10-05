// Mock Data for BIRCOVET Veterinary Clinic Management System
// All amounts in XOF (Francs CFA)

export interface Client {
  id: string;
  name: string;
  type: "particulier" | "elevage";
  phone: string;
  email?: string;
  address: string;
  city: string;
  balance: number; // XOF
  totalInvoices: number;
  lastVisit: string;
  patientCount: number;
}

export interface Patient {
  id: string;
  clientId: string;
  name: string;
  species: "chien" | "chat" | "bovin" | "ovin" | "caprin" | "equin" | "lapin" | "autre";
  breed: string;
  birthDate: string;
  sex: "male" | "femelle";
  chipNumber?: string;
  tattooNumber?: string;
  weight: number; // kg
  allergies?: string[];
  isActive: boolean;
  status: "actif" | "cession" | "deces";
  lastConsultation?: string;
}

export interface Consultation {
  id: string;
  patientId: string;
  patientName: string;
  clientId: string;
  clientName: string;
  date: string;
  veterinarian: string;
  motif: string;
  anamnese: string;
  examination: string;
  diagnosis: string;
  prescriptions: Prescription[];
  status: "en_cours" | "termine" | "annule";
  amount: number; // XOF
}

export interface Prescription {
  id: string;
  productId: string;
  productName: string;
  dosage: string;
  route: string;
  duration: string;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  category: "medicament" | "vaccin" | "aliment" | "accessoire" | "consommable";
  unitAchat: string;
  unitStock: string;
  unitVente: string;
  conversionFactor: number;
  priceAchat: number; // XOF
  priceVente: number; // XOF
  isActive: boolean;
  stockAlert: number;
}

export interface Lot {
  id: string;
  productId: string;
  productName: string;
  lotNumber: string;
  expiryDate: string;
  quantity: number;
  unit: string;
  location: string;
  supplier: string;
  receptionDate: string;
  status: "disponible" | "quarantaine" | "perime";
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number; // XOF
  discount: number; // XOF
  total: number; // XOF
  paidAmount: number; // XOF
  status: "brouillon" | "envoyee" | "payee" | "impayee" | "annulee";
  fneStatus: "none" | "pending" | "validated" | "rejected";
  paymentMethod?: "especes" | "mobile_money" | "cheque" | "carte" | "virement";
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number; // XOF
  total: number; // XOF
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  clientId: string;
  clientName: string;
  date: string;
  time: string;
  veterinarian: string;
  room: string;
  type: "consultation" | "vaccination" | "suivi" | "urgence";
  status: "attendu" | "arrive" | "en_consultation" | "regle" | "annule";
  notes?: string;
}

export interface Hospitalization {
  id: string;
  patientId: string;
  patientName: string;
  clientId: string;
  clientName: string;
  admissionDate: string;
  expectedDischarge?: string;
  actualDischarge?: string;
  box: string;
  reason: string;
  dailyRate: number; // XOF
  carePlan: CarePlan[];
  status: "active" | "discharged" | "transferred";
  totalCost: number; // XOF
}

export interface CarePlan {
  id: string;
  time: string;
  task: string;
  status: "pending" | "done" | "skipped";
  performedBy?: string;
}

export interface Mission {
  id: string;
  clientId: string;
  clientName: string;
  exploitation: string;
  date: string;
  location: string;
  objective: string;
  veterinarian: string;
  stock: MissionStock[];
  status: "planifie" | "en_cours" | "termine" | "annule";
  report?: string;
}

export interface MissionStock {
  lotId: string;
  productName: string;
  quantityTaken: number;
  quantityUsed: number;
  quantityReturned: number;
  unit: string;
}

export interface Formation {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  instructor: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number; // XOF
  status: "ouvert" | "complet" | "termine" | "annule";
}

export interface FormationParticipant {
  id: string;
  formationId: string;
  participantName: string;
  participantType: "veterinaire" | "assistant" | "technicien";
  payerClientId?: string;
  payerName?: string;
  isPaid: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "dg_veterinaire" | "veterinaire" | "assistant_technique" | "accueil_stock" | "confrere_refere";
  establishment: string;
  isActive: boolean;
  lastLogin: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
  details: string;
}

// Mock Data Arrays

export const mockClients: Client[] = [
  {
    id: "CLI-001",
    name: "Kouassi Jean-Pierre",
    type: "particulier",
    phone: "+225 07 01 23 45 67",
    email: "kouassi.jean@example.com",
    address: "23 Rue des Écoles, Cocody",
    city: "Abidjan",
    balance: 15000,
    totalInvoices: 12,
    lastVisit: "2025-10-01",
    patientCount: 2,
  },
  {
    id: "CLI-002",
    name: "Élevage AKPAKPA",
    type: "elevage",
    phone: "+225 07 02 34 56 78",
    address: "Route de Bassam, PK 15",
    city: "Abidjan",
    balance: 0,
    totalInvoices: 45,
    lastVisit: "2025-09-28",
    patientCount: 150,
  },
  {
    id: "CLI-003",
    name: "Touré Fatou",
    type: "particulier",
    phone: "+225 07 03 45 67 89",
    email: "fatou.toure@example.com",
    address: "Quartier France, Plateau",
    city: "Abidjan",
    balance: 25000,
    totalInvoices: 8,
    lastVisit: "2025-09-25",
    patientCount: 1,
  },
  {
    id: "CLI-004",
    name: "Ferme ELLITE",
    type: "elevage",
    phone: "+225 07 04 56 78 90",
    address: "Zone Industrielle, Yopougon",
    city: "Abidjan",
    balance: 75000,
    totalInvoices: 67,
    lastVisit: "2025-10-02",
    patientCount: 320,
  },
  {
    id: "CLI-005",
    name: "Koné Amani",
    type: "particulier",
    phone: "+225 07 05 67 89 01",
    address: "Rue 12, Marcory",
    city: "Abidjan",
    balance: 0,
    totalInvoices: 5,
    lastVisit: "2025-09-30",
    patientCount: 3,
  },
];

export const mockPatients: Patient[] = [
  {
    id: "PAT-001",
    clientId: "CLI-001",
    name: "Rex",
    species: "chien",
    breed: "Berger Allemand",
    birthDate: "2020-05-15",
    sex: "male",
    chipNumber: "250123456789012",
    weight: 32,
    allergies: ["Pénicilline"],
    isActive: true,
    status: "actif",
    lastConsultation: "2025-10-01",
  },
  {
    id: "PAT-002",
    clientId: "CLI-001",
    name: "Minou",
    species: "chat",
    breed: "Siamois",
    birthDate: "2022-02-20",
    sex: "femelle",
    weight: 4.5,
    isActive: true,
    status: "actif",
    lastConsultation: "2025-09-15",
  },
  {
    id: "PAT-003",
    clientId: "CLI-002",
    name: "BOV-001",
    species: "bovin",
    breed: "Brahman",
    birthDate: "2021-03-10",
    sex: "male",
    tattooNumber: "CI20210310AB12",
    weight: 650,
    isActive: true,
    status: "actif",
    lastConsultation: "2025-09-28",
  },
  {
    id: "PAT-004",
    clientId: "CLI-003",
    name: "Luna",
    species: "chien",
    breed: "Golden Retriever",
    birthDate: "2021-08-05",
    sex: "femelle",
    chipNumber: "250123456789013",
    weight: 28,
    isActive: true,
    status: "actif",
    lastConsultation: "2025-09-25",
  },
  {
    id: "PAT-005",
    clientId: "CLI-004",
    name: "BOV-BATCH-01",
    species: "bovin",
    breed: "Montbéliard",
    birthDate: "2022-01-15",
    sex: "femelle",
    weight: 580,
    isActive: true,
    status: "actif",
    lastConsultation: "2025-10-02",
  },
];

export const mockProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Amoxicilline 500mg",
    category: "medicament",
    unitAchat: "boîte",
    unitStock: "comprimé",
    unitVente: "comprimé",
    conversionFactor: 20,
    priceAchat: 15000,
    priceVente: 1000,
    isActive: true,
    stockAlert: 50,
  },
  {
    id: "PRD-002",
    name: "Vaccin Rage (canin)",
    category: "vaccin",
    unitAchat: "flacon",
    unitStock: "dose",
    unitVente: "dose",
    conversionFactor: 10,
    priceAchat: 25000,
    priceVente: 5000,
    isActive: true,
    stockAlert: 20,
  },
  {
    id: "PRD-003",
    name: "Ivermectine 1%",
    category: "medicament",
    unitAchat: "flacon",
    unitStock: "ml",
    unitVente: "ml",
    conversionFactor: 500,
    priceAchat: 45000,
    priceVente: 200,
    isActive: true,
    stockAlert: 100,
  },
  {
    id: "PRD-004",
    name: "Aliment Chien Premium 15kg",
    category: "aliment",
    unitAchat: "sac",
    unitStock: "kg",
    unitVente: "kg",
    conversionFactor: 15,
    priceAchat: 30000,
    priceVente: 3500,
    isActive: true,
    stockAlert: 100,
  },
  {
    id: "PRD-005",
    name: "Seringue 5ml",
    category: "consommable",
    unitAchat: "boîte",
    unitStock: "unité",
    unitVente: "unité",
    conversionFactor: 100,
    priceAchat: 5000,
    priceVente: 100,
    isActive: true,
    stockAlert: 200,
  },
];

export const mockLots: Lot[] = [
  {
    id: "LOT-001",
    productId: "PRD-001",
    productName: "Amoxicilline 500mg",
    lotNumber: "AMX20250101",
    expiryDate: "2026-01-15",
    quantity: 150,
    unit: "comprimé",
    location: "Pharmacie A1",
    supplier: "PharmaCo SA",
    receptionDate: "2025-01-20",
    status: "disponible",
  },
  {
    id: "LOT-002",
    productId: "PRD-002",
    productName: "Vaccin Rage (canin)",
    lotNumber: "VAC20250201",
    expiryDate: "2025-12-31",
    quantity: 45,
    unit: "dose",
    location: "Réfrigérateur R1",
    supplier: "VetVaccins CI",
    receptionDate: "2025-02-15",
    status: "disponible",
  },
  {
    id: "LOT-003",
    productId: "PRD-003",
    productName: "Ivermectine 1%",
    lotNumber: "IVE20250301",
    expiryDate: "2026-06-30",
    quantity: 320,
    unit: "ml",
    location: "Pharmacie B2",
    supplier: "AgroVet Ltd",
    receptionDate: "2025-03-10",
    status: "disponible",
  },
  {
    id: "LOT-004",
    productId: "PRD-001",
    productName: "Amoxicilline 500mg",
    lotNumber: "AMX20240801",
    expiryDate: "2025-10-15",
    quantity: 25,
    unit: "comprimé",
    location: "Pharmacie A1",
    supplier: "PharmaCo SA",
    receptionDate: "2024-08-20",
    status: "disponible",
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "FAC-2025-001",
    clientId: "CLI-001",
    clientName: "Kouassi Jean-Pierre",
    date: "2025-10-01",
    dueDate: "2025-10-15",
    items: [
      {
        id: "ITM-001",
        description: "Consultation générale",
        quantity: 1,
        unitPrice: 10000,
        total: 10000,
      },
      {
        id: "ITM-002",
        description: "Vaccin Rage",
        quantity: 1,
        unitPrice: 5000,
        total: 5000,
      },
    ],
    subtotal: 15000,
    discount: 0,
    total: 15000,
    paidAmount: 15000,
    status: "payee",
    fneStatus: "validated",
    paymentMethod: "mobile_money",
  },
  {
    id: "FAC-2025-002",
    clientId: "CLI-002",
    clientName: "Élevage AKPAKPA",
    date: "2025-09-28",
    dueDate: "2025-10-12",
    items: [
      {
        id: "ITM-003",
        description: "Visite de lot (50 bovins)",
        quantity: 1,
        unitPrice: 75000,
        total: 75000,
      },
      {
        id: "ITM-004",
        description: "Ivermectine 500ml",
        quantity: 1,
        unitPrice: 100000,
        total: 100000,
      },
    ],
    subtotal: 175000,
    discount: 8750,
    total: 166250,
    paidAmount: 100000,
    status: "impayee",
    fneStatus: "pending",
    paymentMethod: "especes",
  },
  {
    id: "FAC-2025-003",
    clientId: "CLI-003",
    clientName: "Touré Fatou",
    date: "2025-09-25",
    dueDate: "2025-10-09",
    items: [
      {
        id: "ITM-005",
        description: "Consultation urgence",
        quantity: 1,
        unitPrice: 15000,
        total: 15000,
      },
      {
        id: "ITM-006",
        description: "Amoxicilline 10cp",
        quantity: 10,
        unitPrice: 1000,
        total: 10000,
      },
    ],
    subtotal: 25000,
    discount: 0,
    total: 25000,
    paidAmount: 0,
    status: "impayee",
    fneStatus: "none",
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "RDV-001",
    patientId: "PAT-001",
    patientName: "Rex",
    clientId: "CLI-001",
    clientName: "Kouassi Jean-Pierre",
    date: "2025-10-05",
    time: "09:00",
    veterinarian: "Dr. Marc Hervé",
    room: "Salle 1",
    type: "consultation",
    status: "arrive",
    notes: "Vaccination annuelle",
  },
  {
    id: "RDV-002",
    patientId: "PAT-004",
    patientName: "Luna",
    clientId: "CLI-003",
    clientName: "Touré Fatou",
    date: "2025-10-05",
    time: "10:30",
    veterinarian: "Dr. Marc Hervé",
    room: "Salle 1",
    type: "vaccination",
    status: "attendu",
  },
  {
    id: "RDV-003",
    patientId: "PAT-002",
    patientName: "Minou",
    clientId: "CLI-001",
    clientName: "Kouassi Jean-Pierre",
    date: "2025-10-05",
    time: "11:00",
    veterinarian: "Dr. Sophie Kouassi",
    room: "Salle 2",
    type: "suivi",
    status: "en_consultation",
  },
  {
    id: "RDV-004",
    patientId: "PAT-005",
    patientName: "BOV-BATCH-01",
    clientId: "CLI-004",
    clientName: "Ferme ELLITE",
    date: "2025-10-05",
    time: "14:00",
    veterinarian: "Dr. Marc Hervé",
    room: "Salle 3",
    type: "consultation",
    status: "attendu",
  },
];

export const mockConsultations: Consultation[] = [
  {
    id: "CONS-2025-001",
    patientId: "PAT-001",
    patientName: "Rex",
    clientId: "CLI-001",
    clientName: "Kouassi Jean-Pierre",
    date: "2025-10-01",
    veterinarian: "Dr. Marc Hervé",
    motif: "Vaccination annuelle",
    anamnese: "Patient vacciné l'année dernière, bon état général",
    examination: "Température 38.5°C, FC 90 bpm, FR 20/min. Mucosées roses.",
    diagnosis: "Patient en bonne santé, vaccination recommandée",
    prescriptions: [],
    status: "termine",
    amount: 10000,
  },
  {
    id: "CONS-2025-002",
    patientId: "PAT-004",
    patientName: "Luna",
    clientId: "CLI-003",
    clientName: "Touré Fatou",
    date: "2025-09-25",
    veterinarian: "Dr. Sophie Kouassi",
    motif: "Consultation urgence",
    anamnese: "Patient présente des vomissements depuis 24h",
    examination: "Température 39.2°C, léger déshydratation",
    diagnosis: "Gastro-entérite probable",
    prescriptions: [],
    status: "termine",
    amount: 15000,
  },
];

export const mockHospitalizations: Hospitalization[] = [
  {
    id: "HOSP-001",
    patientId: "PAT-001",
    patientName: "Rex",
    clientId: "CLI-001",
    clientName: "Kouassi Jean-Pierre",
    admissionDate: "2025-10-03",
    expectedDischarge: "2025-10-06",
    box: "Box A1",
    reason: "Fracture patte postérieure - Chirurgie",
    dailyRate: 15000,
    carePlan: [
      {
        id: "CP-001",
        time: "08:00",
        task: "Administration antidouleur",
        status: "done",
        performedBy: "Ass. Yasmine",
      },
      {
        id: "CP-002",
        time: "12:00",
        task: "Pansement et vérification",
        status: "pending",
      },
      {
        id: "CP-003",
        time: "18:00",
        task: "Administration antidouleur",
        status: "pending",
      },
    ],
    status: "active",
    totalCost: 45000,
  },
  {
    id: "HOSP-002",
    patientId: "PAT-003",
    patientName: "BOV-001",
    clientId: "CLI-002",
    clientName: "Élevage AKPAKPA",
    admissionDate: "2025-09-30",
    actualDischarge: "2025-10-02",
    box: "Box B1",
    reason: "Observation post-opératoire",
    dailyRate: 20000,
    carePlan: [],
    status: "discharged",
    totalCost: 60000,
  },
];

export const mockMissions: Mission[] = [
  {
    id: "MIS-001",
    clientId: "CLI-002",
    clientName: "Élevage AKPAKPA",
    exploitation: "Ferme principale",
    date: "2025-10-08",
    location: "Route de Bassam, PK 15",
    objective: "Vaccination annuelle troupeau bovin",
    veterinarian: "Dr. Marc Hervé",
    stock: [
      {
        lotId: "LOT-002",
        productName: "Vaccin Rage (canin)",
        quantityTaken: 20,
        quantityUsed: 0,
        quantityReturned: 0,
        unit: "dose",
      },
    ],
    status: "planifie",
  },
  {
    id: "MIS-002",
    clientId: "CLI-004",
    clientName: "Ferme ELLITE",
    exploitation: "Site Yopougon",
    date: "2025-10-10",
    location: "Zone Industrielle, Yopougon",
    objective: "Traitement antiparasitaire",
    veterinarian: "Dr. Sophie Kouassi",
    stock: [
      {
        lotId: "LOT-003",
        productName: "Ivermectine 1%",
        quantityTaken: 100,
        quantityUsed: 0,
        quantityReturned: 0,
        unit: "ml",
      },
    ],
    status: "planifie",
  },
];

export const mockFormations: Formation[] = [
  {
    id: "FOR-001",
    title: "Formation en Chirurgie Vétérinaire Avancée",
    description: "Techniques chirurgicales pour animaux de compagnie",
    startDate: "2025-11-15",
    endDate: "2025-11-17",
    location: "Centre de Formation BIRCOVET, Abidjan",
    instructor: "Pr. Dubois",
    maxParticipants: 20,
    currentParticipants: 15,
    price: 150000,
    status: "ouvert",
  },
  {
    id: "FOR-002",
    title: "Gestion Sanitaire des Troupeaux Bovins",
    description: "Protocoles de prévention et traitement des maladies bovines",
    startDate: "2025-12-05",
    endDate: "2025-12-06",
    location: "Ferme École, Bouaké",
    instructor: "Dr. Konan",
    maxParticipants: 25,
    currentParticipants: 25,
    price: 75000,
    status: "complet",
  },
];

export const mockUsers: User[] = [
  {
    id: "USR-001",
    name: "Dr. Marc Hervé",
    email: "marc.herve@bircovet.ci",
    role: "dg_veterinaire",
    establishment: "BIRCOVET Abidjan",
    isActive: true,
    lastLogin: "2025-10-05T08:30:00",
  },
  {
    id: "USR-002",
    name: "Dr. Sophie Kouassi",
    email: "sophie.kouassi@bircovet.ci",
    role: "veterinaire",
    establishment: "BIRCOVET Abidjan",
    isActive: true,
    lastLogin: "2025-10-05T07:45:00",
  },
  {
    id: "USR-003",
    name: "Yasmine Diop",
    email: "yasmine.diop@bircovet.ci",
    role: "assistant_technique",
    establishment: "BIRCOVET Abidjan",
    isActive: true,
    lastLogin: "2025-10-05T08:00:00",
  },
  {
    id: "USR-004",
    name: "Awa Touré",
    email: "awa.toure@bircovet.ci",
    role: "accueil_stock",
    establishment: "BIRCOVET Abidjan",
    isActive: true,
    lastLogin: "2025-10-05T07:30:00",
  },
  {
    id: "USR-005",
    name: "Dr. Emmanuel Adou",
    email: "emmanuel.adou@clinique-partenaire.ci",
    role: "confrere_refere",
    establishment: "Clinique Partenaire",
    isActive: true,
    lastLogin: "2025-10-04T16:20:00",
  },
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "LOG-001",
    userId: "USR-001",
    userName: "Dr. Marc Hervé",
    action: "CREATE",
    entity: "Invoice",
    entityId: "FAC-2025-001",
    timestamp: "2025-10-01T14:30:00",
    details: "Création de facture pour client Kouassi Jean-Pierre",
  },
  {
    id: "LOG-002",
    userId: "USR-004",
    userName: "Awa Touré",
    action: "UPDATE",
    entity: "Lot",
    entityId: "LOT-002",
    timestamp: "2025-10-02T10:15:00",
    details: "Réception de lot VAC20250201 - 45 doses reçues",
  },
  {
    id: "LOG-003",
    userId: "USR-002",
    userName: "Dr. Sophie Kouassi",
    action: "CREATE",
    entity: "Consultation",
    entityId: "CONS-2025-045",
    timestamp: "2025-10-03T09:00:00",
    details: "Consultation pour patient Luna (PAT-004)",
  },
  {
    id: "LOG-004",
    userId: "USR-003",
    userName: "Yasmine Diop",
    action: "UPDATE",
    entity: "Hospitalization",
    entityId: "HOSP-001",
    timestamp: "2025-10-05T08:00:00",
    details: "Administration antidouleur pour patient Rex",
  },
];

// Dashboard Statistics
export const dashboardStats = {
  queueToday: 8,
  upcomingConsultations: 12,
  hospitalizationOccupancy: 75,
  stockAlerts: 3,
  urgentMissions: 2,
  totalRevenueMonth: 2500000,
  pendingPayments: 325000,
};
