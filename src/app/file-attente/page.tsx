"use client";

import { mockAppointments } from "@/data/mockData";
import { useState } from "react";

export default function FileAttentePage() {
  const [appointments, setAppointments] = useState(mockAppointments);

  const updateStatus = (id: string, newStatus: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus as any } : apt
      )
    );
  };

  const statusColors = {
    attendu: "bg-gray-100 text-gray-600",
    arrive: "bg-[#04A154]/10 text-[#04A154]",
    en_consultation: "bg-[#019CC8]/10 text-[#019CC8]",
    regle: "bg-purple-100 text-purple-600",
    annule: "bg-red-100 text-red-600",
  };

  const statusLabels = {
    attendu: "Attendu",
    arrive: "Arrivé",
    en_consultation: "En consultation",
    regle: "Réglé",
    annule: "Annulé",
  };

  const statusFlow = {
    attendu: ["arrive", "annule"],
    arrive: ["en_consultation", "annule"],
    en_consultation: ["regle"],
    regle: [],
    annule: [],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            File d'Attente
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Gestion de la file d'attente du jour
          </p>
        </div>
        <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
          + Ajouter à la file
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total"
          value={appointments.length}
          color="blue"
        />
        <StatCard
          title="Attendus"
          value={appointments.filter((a) => a.status === "attendu").length}
          color="gray"
        />
        <StatCard
          title="Arrivés"
          value={appointments.filter((a) => a.status === "arrive").length}
          color="green"
        />
        <StatCard
          title="En consultation"
          value={appointments.filter((a) => a.status === "en_consultation").length}
          color="blue"
        />
        <StatCard
          title="Réglés"
          value={appointments.filter((a) => a.status === "regle").length}
          color="purple"
        />
      </div>

      {/* Queue List */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-xl font-bold text-dark dark:text-white">
          File du Jour
        </h2>
        <div className="space-y-3">
          {appointments.map((appointment, index) => (
            <QueueRow
              key={appointment.id}
              appointment={appointment}
              index={index}
              statusColors={statusColors}
              statusLabels={statusLabels}
              statusFlow={statusFlow}
              onUpdateStatus={updateStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  const colorClasses = {
    blue: "bg-[#019CC8]/10 text-[#019CC8]",
    green: "bg-[#04A154]/10 text-[#04A154]",
    gray: "bg-gray-100 text-gray-600",
    purple: "bg-purple-100 text-purple-600",
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

function QueueRow({
  appointment,
  index,
  statusColors,
  statusLabels,
  statusFlow,
  onUpdateStatus,
}: {
  appointment: any;
  index: number;
  statusColors: any;
  statusLabels: any;
  statusFlow: any;
  onUpdateStatus: (id: string, status: string) => void;
}) {
  const nextStatuses = statusFlow[appointment.status as keyof typeof statusFlow] || [];

  return (
    <div className="flex items-center justify-between rounded-lg border border-stroke bg-gray-2 p-4 dark:border-stroke-dark dark:bg-dark-2">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#04A154] text-white font-bold">
          {index + 1}
        </div>
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
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusColors[appointment.status as keyof typeof statusColors]
          }`}
        >
          {statusLabels[appointment.status as keyof typeof statusLabels]}
        </span>
        <div className="flex gap-2">
          {nextStatuses.map((nextStatus: string) => (
            <button
              key={nextStatus}
              onClick={() => onUpdateStatus(appointment.id, nextStatus)}
              className="rounded-lg bg-[#04A154] px-3 py-1 text-white text-sm hover:bg-[#038343]"
            >
              {statusLabels[nextStatus as keyof typeof statusLabels]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
