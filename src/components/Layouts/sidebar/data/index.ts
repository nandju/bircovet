import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "PRINCIPAL",
    items: [
      {
        title: "Tableau de Bord",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "Vue Globale",
            url: "/dashboard",
          },
        ],
      },
      {
        title: "Patients & Clients",
        icon: Icons.PatientsIcon,
        items: [
          {
            title: "Clients",
            url: "/clients",
          },
          {
            title: "Patients",
            url: "/patients",
          },
          {
            title: "Exploitations",
            url: "/exploitations",
          },
        ],
      },
      {
        title: "Agenda & Rendez-vous",
        icon: Icons.Calendar,
        items: [
          {
            title: "Planning",
            url: "/agenda",
          },
          {
            title: "File d'Attente",
            url: "/file-attente",
          },
          {
            title: "Tâches & Rappels",
            url: "/taches",
          },
        ],
      },
      {
        title: "Consultations",
        icon: Icons.User,
        items: [
          {
            title: "Nouvelle Consultation",
            url: "/consultations/nouvelle",
          },
          {
            title: "Historique",
            url: "/consultations/historique",
          },
        ],
      },
      {
        title: "Hospitalisation",
        icon: Icons.HospitalIcon,
        items: [
          {
            title: "Vue Hospitalisation",
            url: "/hospitalisation",
          },
          {
            title: "Plan de Soins",
            url: "/hospitalisation/plan-soins",
          },
        ],
      },
    ],
  },
  {
    label: "OPÉRATIONS",
    items: [
      {
        title: "Missions Terrain",
        icon: Icons.TerrainIcon,
        items: [
          {
            title: "Missions",
            url: "/terrain",
          },
          {
            title: "Rapports",
            url: "/terrain/rapports",
          },
        ],
      },
      {
        title: "Formations",
        icon: Icons.EducationIcon,
        items: [
          {
            title: "Sessions",
            url: "/formations",
          },
          {
            title: "Inscriptions",
            url: "/formations/inscriptions",
          },
        ],
      },
      {
        title: "Pharmacie & Stock",
        icon: Icons.StockIcon,
        items: [
          {
            title: "Catalogue Produits",
            url: "/stock/catalogue",
          },
          {
            title: "Gestion des Lots",
            url: "/stock/lots",
          },
          {
            title: "Réception BLI/EDI",
            url: "/achats/reception",
          },
          {
            title: "Reconditionnement",
            url: "/stock/reconditionnement",
          },
        ],
      },
      {
        title: "Facturation & Caisse",
        icon: Icons.InvoiceIcon,
        items: [
          {
            title: "Devis & Factures",
            url: "/facturation",
          },
          {
            title: "Paiements",
            url: "/facturation/paiements",
          },
          {
            title: "Gestion Caisse",
            url: "/caisse",
          },
        ],
      },
    ],
  },
  {
    label: "ASSISTANCE & ADMIN",
    items: [
      {
        title: "Assistant IA",
        icon: Icons.AIIcon,
        items: [
          {
            title: "Zone IA",
            url: "/assistant-ia",
          },
        ],
      },
      {
        title: "Administration",
        icon: Icons.SettingsIcon,
        items: [
          {
            title: "Utilisateurs & Rôles",
            url: "/admin/utilisateurs",
          },
          {
            title: "Tarifs",
            url: "/admin/tarifs",
          },
          {
            title: "Établissements",
            url: "/admin/etablissements",
          },
        ],
      },
      {
        title: "Rapports & Audit",
        icon: Icons.ReportIcon,
        items: [
          {
            title: "Rapports",
            url: "/rapports",
          },
          {
            title: "Journal d'Audit",
            url: "/rapports/audit",
          },
        ],
      },
    ],
  },
];
