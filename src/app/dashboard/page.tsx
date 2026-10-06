"use client";

import { dashboardStats, mockAppointments, mockHospitalizations, mockLots } from "@/data/mockData";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Tableau de Bord
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Vue d&apos;ensemble de la clinique BIRCOVET
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/agenda"
            className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]"
          >
            Nouveau Rendez-vous
          </Link>
          <Link
            href="/consultations/nouvelle"
            className="rounded-lg border border-[#04A154] px-4 py-2 text-[#04A154] hover:bg-[#04A154]/10"
          >
            Nouvelle Consultation
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          title="File d'Attente"
          value={dashboardStats.queueToday}
          icon="📋"
          color="green"
          link="/file-attente"
        />
        <StatCard
          title="Consultations à Venir"
          value={dashboardStats.upcomingConsultations}
          icon="🩺"
          color="blue"
          link="/agenda"
        />
        <StatCard
          title="Occupation Hospitalisation"
          value={`${dashboardStats.hospitalizationOccupancy}%`}
          icon="🏥"
          color="purple"
          link="/hospitalisation"
        />
        <StatCard
          title="Alertes Stock"
          value={dashboardStats.stockAlerts}
          icon="⚠️"
          color="orange"
          link="/stock/lots"
        />
        <StatCard
          title="Urgences Terrain"
          value={dashboardStats.urgentMissions}
          icon="🚨"
          color="red"
          link="/terrain"
        />
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FinancialCard
          title="Revenus du Mois"
          amount={dashboardStats.totalRevenueMonth}
          icon="💰"
          color="green"
        />
        <FinancialCard
          title="Paiements en Attente"
          amount={dashboardStats.pendingPayments}
          icon="⏳"
          color="orange"
          link="/facturation/paiements"
        />
      </div>

      {/* Queue Today */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            File d&apos;Attente du Jour
          </h2>
          <Link
            href="/file-attente"
            className="text-sm font-medium text-[#019CC8] hover:underline"
          >
            Voir tout →
          </Link>
        </div>
        <div className="space-y-3">
          {mockAppointments.slice(0, 5).map((appointment) => (
            <AppointmentRow key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>

      {/* Hospitalization Overview */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            Hospitalisation en Cours
          </h2>
          <Link
            href="/hospitalisation"
            className="text-sm font-medium text-[#019CC8] hover:underline"
          >
            Voir tout →
          </Link>
        </div>
        <div className="space-y-3">
          {mockHospitalizations
            .filter((h) => h.status === "active")
            .map((hospitalization) => (
              <HospitalizationRow
                key={hospitalization.id}
                hospitalization={hospitalization}
              />
            ))}
        </div>
      </div>

      {/* Stock Alerts */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            Alertes Stock & Péremptions
          </h2>
          <Link
            href="/stock/lots"
            className="text-sm font-medium text-[#019CC8] hover:underline"
          >
            Voir tout →
          </Link>
        </div>
        <div className="space-y-3">
          {mockLots
            .filter((lot) => lot.quantity < 30 || lot.status === "perime")
            .slice(0, 3)
            .map((lot) => (
              <LotAlertRow key={lot.id} lot={lot} />
            ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
  link,
}: {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  link?: string;
}) {
  const colorClasses = {
    green: "bg-[#04A154]/10 text-[#04A154]",
    blue: "bg-[#019CC8]/10 text-[#019CC8]",
    purple: "bg-purple-500/10 text-purple-500",
    orange: "bg-orange-500/10 text-orange-500",
    red: "bg-red-500/10 text-red-500",
  };

  const content = (
    <div className="rounded-xl border border-stroke bg-white p-5 shadow-card dark:border-stroke-dark dark:bg-gray-dark hover:border-[#6AB391] transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-5 dark:text-gray-6">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-dark dark:text-white">
            {value}
          </p>
        </div>
        <div className={`rounded-full p-3 text-2xl ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
}

function FinancialCard({
  title,
  amount,
  icon,
  color,
  link,
}: {
  title: string;
  amount: number;
  icon: string;
  color: string;
  link?: string;
}) {
  const formattedAmount = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  }).format(amount);

  const colorClasses = {
    green: "bg-[#04A154]/10 text-[#04A154]",
    orange: "bg-orange-500/10 text-orange-500",
  };

  const content = (
    <div className="rounded-xl border border-stroke bg-white p-5 shadow-card dark:border-stroke-dark dark:bg-gray-dark hover:border-[#6AB391] transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-5 dark:text-gray-6">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-dark dark:text-white">
            {formattedAmount}
          </p>
        </div>
        <div className={`rounded-full p-3 text-2xl ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
}

function AppointmentRow({ appointment }: { appointment: any }) {
  const statusColors = {
    attendu: "bg-gray-100 text-gray-600",
    arrive: "bg-[#04A154]/10 text-[#04A154]",
    en_consultation: "bg-[#019CC8]/10 text-[#019CC8]",
    regle: "bg-purple-100 text-purple-600",
    annule: "bg-red-100 text-red-600",
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-stroke bg-gray-2 p-4 dark:border-stroke-dark dark:bg-dark-2">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-lg font-bold text-dark dark:text-white">
            {appointment.time}
          </p>
          <p className="text-xs text-gray-5">{appointment.room}</p>
        </div>
        <div className="h-10 w-px bg-stroke dark:bg-stroke-dark" />
        <div>
          <p className="font-medium text-dark dark:text-white">
            {appointment.patientName}
          </p>
          <p className="text-sm text-gray-5">{appointment.clientName}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusColors[appointment.status as keyof typeof statusColors]
          }`}
        >
          {appointment.status.replace(/_/g, " ").toUpperCase()}
        </span>
        <span className="text-sm text-gray-5">{appointment.veterinarian}</span>
      </div>
    </div>
  );
}

function HospitalizationRow({
  hospitalization,
}: {
  hospitalization: any;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-stroke bg-gray-2 p-4 dark:border-stroke-dark dark:bg-dark-2">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-[#04A154]/10 p-2 text-[#04A154]">
          🏥
        </div>
        <div>
          <p className="font-medium text-dark dark:text-white">
            {hospitalization.patientName}
          </p>
          <p className="text-sm text-gray-5">{hospitalization.box}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium text-dark dark:text-white">
          {hospitalization.reason}
        </p>
        <p className="text-sm text-gray-5">
          Depuis le {new Date(hospitalization.admissionDate).toLocaleDateString("fr-FR")}
        </p>
      </div>
    </div>
  );
}

function LotAlertRow({ lot }: { lot: any }) {
  const isLowStock = lot.quantity < 30;
  const isExpiring = new Date(lot.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <div className="flex items-center justify-between rounded-lg border border-stroke bg-gray-2 p-4 dark:border-stroke-dark dark:bg-dark-2">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-orange-500/10 p-2 text-orange-500">
          ⚠️
        </div>
        <div>
          <p className="font-medium text-dark dark:text-white">
            {lot.productName}
          </p>
          <p className="text-sm text-gray-5">
            Lot: {lot.lotNumber} | {lot.location}
          </p>
        </div>
      </div>
      <div className="text-right">
        {isLowStock && (
          <p className="text-sm font-medium text-orange-500">
            Stock faible: {lot.quantity} {lot.unit}
          </p>
        )}
        {isExpiring && (
          <p className="text-sm font-medium text-red-500">
            Péremption: {new Date(lot.expiryDate).toLocaleDateString("fr-FR")}
          </p>
        )}
      </div>
    </div>
  );
}
