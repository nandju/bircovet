"use client";

import { mockMissions } from "@/data/mockData";
import { useState } from "react";

export default function TerrainPage() {
  const [missions, setMissions] = useState(mockMissions);
  const [selectedMission, setSelectedMission] = useState<any>(null);
  const [isOffline, setIsOffline] = useState(false);

  const updateMissionStatus = (id: string, status: string) => {
    setMissions(
      missions.map((m) => (m.id === id ? { ...m, status: status as any } : m))
    );
  };

  const statusColors = {
    planifie: "bg-gray-100 text-gray-600",
    en_cours: "bg-[#019CC8]/10 text-[#019CC8]",
    termine: "bg-[#04A154]/10 text-[#04A154]",
    annule: "bg-red-100 text-red-600",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Missions Terrain
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Gestion des missions et interventions hors-site
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-stroke bg-white px-3 py-2 dark:border-stroke-dark dark:bg-gray-dark">
            <span className={`h-2 w-2 rounded-full ${isOffline ? "bg-orange-500" : "bg-[#04A154]"}`} />
            <span className="text-sm text-gray-5">
              {isOffline ? "Hors ligne" : "En ligne"}
            </span>
          </div>
          <button
            onClick={() => setIsOffline(!isOffline)}
            className="rounded-lg border border-stroke bg-white px-4 py-2 hover:bg-gray-2 dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
          >
            {isOffline ? "🔴 Simuler hors ligne" : "🟢 Simuler en ligne"}
          </button>
          <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
            + Nouvelle Mission
          </button>
        </div>
      </div>

      {/* Offline Banner */}
      {isOffline && (
        <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
          <p className="font-medium text-orange-600 dark:text-orange-400">
            ⚠️ Mode Hors Ligne Activé
          </p>
          <p className="text-sm text-orange-600 dark:text-orange-400">
            Les données seront synchronisées lors de la reconnexion
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Planifiées" value={missions.filter((m) => m.status === "planifie").length} color="gray" />
        <StatCard title="En cours" value={missions.filter((m) => m.status === "en_cours").length} color="blue" />
        <StatCard title="Terminées" value={missions.filter((m) => m.status === "termine").length} color="green" />
        <StatCard title="Annulées" value={missions.filter((m) => m.status === "annule").length} color="red" />
      </div>

      {/* Missions List */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-xl font-bold text-dark dark:text-white">
          Missions
        </h2>
        <div className="space-y-4">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              statusColors={statusColors}
              onUpdateStatus={updateMissionStatus}
              onView={() => setSelectedMission(mission)}
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
    red: "bg-red-100 text-red-600",
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

function MissionCard({
  mission,
  statusColors,
  onUpdateStatus,
  onView,
}: {
  mission: any;
  statusColors: any;
  onUpdateStatus: (id: string, status: string) => void;
  onView: () => void;
}) {
  return (
    <div className="rounded-lg border border-stroke bg-gray-2 p-4 dark:border-stroke-dark dark:bg-dark-2">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-dark dark:text-white">
              {mission.clientName}
            </h3>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                statusColors[mission.status as keyof typeof statusColors]
              }`}
            >
              {mission.status.replace(/_/g, " ").toUpperCase()}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-5">{mission.exploitation}</p>
          <p className="text-sm text-gray-5">{mission.location}</p>
          <p className="mt-2 text-sm text-gray-5">
            📅 {new Date(mission.date).toLocaleDateString("fr-FR")} • 👨‍⚕️ {mission.veterinarian}
          </p>
          <p className="text-sm text-gray-5">🎯 {mission.objective}</p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={onView}
            className="rounded-lg bg-[#04A154] px-4 py-2 text-white text-sm hover:bg-[#038343]"
          >
            Voir détails
          </button>
          {mission.status === "planifie" && (
            <button
              onClick={() => onUpdateStatus(mission.id, "en_cours")}
              className="rounded-lg border border-[#019CC8] px-4 py-2 text-[#019CC8] text-sm hover:bg-[#019CC8]/10"
            >
              Démarrer
            </button>
          )}
          {mission.status === "en_cours" && (
            <button
              onClick={() => onUpdateStatus(mission.id, "termine")}
              className="rounded-lg border border-[#04A154] px-4 py-2 text-[#04A154] text-sm hover:bg-[#04A154]/10"
            >
              Terminer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
