"use client";

import { mockFormations } from "@/data/mockData";
import { useState } from "react";

export default function FormationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredFormations = mockFormations.filter((formation) => {
    const matchesSearch =
      formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || formation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    ouvert: "bg-[#04A154]/10 text-[#04A154]",
    complet: "bg-orange-100 text-orange-600",
    termine: "bg-gray-100 text-gray-600",
    annule: "bg-red-100 text-red-600",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Formations
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Gestion des sessions de formation
          </p>
        </div>
        <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
          + Nouvelle Formation
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Rechercher une formation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterStatus === "all"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilterStatus("ouvert")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterStatus === "ouvert"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Ouvertes
          </button>
          <button
            onClick={() => setFilterStatus("complet")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterStatus === "complet"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Complètes
          </button>
        </div>
      </div>

      {/* Formations Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredFormations.map((formation) => (
          <FormationCard
            key={formation.id}
            formation={formation}
            statusColors={statusColors}
          />
        ))}
      </div>

      {filteredFormations.length === 0 && (
        <div className="rounded-xl border border-stroke bg-white p-12 text-center dark:border-stroke-dark dark:bg-gray-dark">
          <p className="text-lg text-gray-5">Aucune formation trouvée</p>
        </div>
      )}
    </div>
  );
}

function FormationCard({
  formation,
  statusColors,
}: {
  formation: any;
  statusColors: any;
}) {
  const occupancyPercentage = (formation.currentParticipants / formation.maxParticipants) * 100;

  return (
    <div className="rounded-xl border border-stroke bg-white p-6 shadow-card hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-gray-dark">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-dark dark:text-white">
            {formation.title}
          </h3>
          <p className="mt-2 text-sm text-gray-5">{formation.description}</p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            statusColors[formation.status as keyof typeof statusColors]
          }`}
        >
          {formation.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-5">
          <span>👨‍🏫</span>
          <span>{formation.instructor}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-5">
          <span>📍</span>
          <span>{formation.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-5">
          <span>📅</span>
          <span>
            {new Date(formation.startDate).toLocaleDateString("fr-FR")} -{" "}
            {new Date(formation.endDate).toLocaleDateString("fr-FR")}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-5">Participants</span>
          <span className="font-medium text-dark dark:text-white">
            {formation.currentParticipants}/{formation.maxParticipants}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-2 rounded-full ${
              occupancyPercentage >= 100
                ? "bg-orange-500"
                : "bg-[#04A154]"
            }`}
            style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-stroke pt-4 dark:border-stroke-dark">
        <div>
          <p className="text-xs text-gray-5">Prix</p>
          <p className="font-medium text-dark dark:text-white">
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "XOF",
              minimumFractionDigits: 0,
            }).format(formation.price)}
          </p>
        </div>
        <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white text-sm hover:bg-[#038343]">
          Voir détails
        </button>
      </div>
    </div>
  );
}
