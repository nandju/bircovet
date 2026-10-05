"use client";

import { mockAppointments } from "@/data/mockData";
import Link from "next/link";
import { useState } from "react";

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [viewMode, setViewMode] = useState<"day" | "week">("day");

  const todayAppointments = mockAppointments.filter(
    (apt) => apt.date === selectedDate
  );

  const statusColors = {
    attendu: "bg-gray-100 text-gray-600",
    arrive: "bg-[#04A154]/10 text-[#04A154]",
    en_consultation: "bg-[#019CC8]/10 text-[#019CC8]",
    regle: "bg-purple-100 text-purple-600",
    annule: "bg-red-100 text-red-600",
  };

  const typeColors = {
    consultation: "bg-[#04A154]/10 text-[#04A154]",
    vaccination: "bg-[#019CC8]/10 text-[#019CC8]",
    suivi: "bg-purple-100 text-purple-600",
    urgence: "bg-red-100 text-red-600",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Agenda & Planning
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Gestion des rendez-vous et planning des consultations
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-[#04A154] px-4 py-2 text-[#04A154] hover:bg-[#04A154]/10">
            📅 Calendrier
          </button>
          <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
            + Nouveau Rendez-vous
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("day")}
              className={`rounded-lg px-4 py-2 ${
                viewMode === "day"
                  ? "bg-[#04A154] text-white"
                  : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
              }`}
            >
              Jour
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`rounded-lg px-4 py-2 ${
                viewMode === "week"
                  ? "bg-[#04A154] text-white"
                  : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
              }`}
            >
              Semaine
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-stroke bg-white px-4 py-2 hover:bg-gray-2 dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2">
            ← Précédent
          </button>
          <button className="rounded-lg border border-stroke bg-white px-4 py-2 hover:bg-gray-2 dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2">
            Suivant →
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total RDV"
          value={todayAppointments.length}
          color="blue"
        />
        <StatCard
          title="En attente"
          value={todayAppointments.filter((a) => a.status === "attendu").length}
          color="gray"
        />
        <StatCard
          title="En consultation"
          value={todayAppointments.filter((a) => a.status === "en_consultation").length}
          color="blue"
        />
        <StatCard
          title="Réglés"
          value={todayAppointments.filter((a) => a.status === "regle").length}
          color="green"
        />
      </div>

      {/* Appointments List */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-xl font-bold text-dark dark:text-white">
          Rendez-vous du {new Date(selectedDate).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </h2>
        <div className="space-y-3">
          {todayAppointments.map((appointment) => (
            <AppointmentRow
              key={appointment.id}
              appointment={appointment}
              statusColors={statusColors}
              typeColors={typeColors}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link href="/file-attente">
          <div className="rounded-xl border border-stroke bg-white p-5 shadow-card hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-gray-dark">
            <h3 className="text-lg font-bold text-dark dark:text-white">
              📋 File d'Attente
            </h3>
            <p className="mt-2 text-sm text-gray-5">
              Gérer la file d'attente du jour
            </p>
          </div>
        </Link>
        <Link href="/taches">
          <div className="rounded-xl border border-stroke bg-white p-5 shadow-card hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-gray-dark">
            <h3 className="text-lg font-bold text-dark dark:text-white">
              ✅ Tâches & Rappels
            </h3>
            <p className="mt-2 text-sm text-gray-5">
              Voir les tâches et rappels automatiques
            </p>
          </div>
        </Link>
        <Link href="/consultations/nouvelle">
          <div className="rounded-xl border border-stroke bg-white p-5 shadow-card hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-gray-dark">
            <h3 className="text-lg font-bold text-dark dark:text-white">
              🩺 Consultation Rapide
            </h3>
            <p className="mt-2 text-sm text-gray-5">
              Démarrer une nouvelle consultation
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  const colorClasses = {
    blue: "bg-[#019CC8]/10 text-[#019CC8]",
    green: "bg-[#04A154]/10 text-[#04A154]",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="rounded-xl border border-stroke bg-white p-5 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
      <p className="text-sm text-gray-5">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${colorClasses[color as keyof typeof colorClasses]}`}>
        {value}
      </p>
    </div>
  );
}

function AppointmentRow({
  appointment,
  statusColors,
  typeColors,
}: {
  appointment: any;
  statusColors: any;
  typeColors: any;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-stroke bg-gray-2 p-4 hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-dark-2">
      <div className="flex items-center gap-4">
        <div className="text-center min-w-[80px]">
          <p className="text-lg font-bold text-dark dark:text-white">
            {appointment.time}
          </p>
          <p className="text-xs text-gray-5">{appointment.room}</p>
        </div>
        <div className="h-10 w-px bg-stroke dark:bg-stroke-dark" />
        <div className="flex-1">
          <p className="font-medium text-dark dark:text-white">
            {appointment.patientName}
          </p>
          <p className="text-sm text-gray-5">{appointment.clientName}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            typeColors[appointment.type as keyof typeof typeColors]
          }`}
        >
          {appointment.type.toUpperCase()}
        </span>
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            statusColors[appointment.status as keyof typeof statusColors]
          }`}
        >
          {appointment.status.replace(/_/g, " ").toUpperCase()}
        </span>
        <span className="text-sm text-gray-5">{appointment.veterinarian}</span>
        <Link
          href={`/consultations/${appointment.id}`}
          className="rounded-lg bg-[#04A154] px-3 py-1 text-white text-sm hover:bg-[#038343]"
        >
          Voir
        </Link>
      </div>
    </div>
  );
}
