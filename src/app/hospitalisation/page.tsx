"use client";

import { mockHospitalizations } from "@/data/mockData";
import Link from "next/link";

export default function HospitalisationPage() {
  const activeHospitalizations = mockHospitalizations.filter((h) => h.status === "active");
  const dischargedHospitalizations = mockHospitalizations.filter((h) => h.status === "discharged");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Hospitalisation
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Gestion des hospitalisations et plans de soins
          </p>
        </div>
        <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
          + Nouvelle Hospitalisation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Occupation"
          value={`${activeHospitalizations.length} / 10`}
          color="blue"
        />
        <StatCard
          title="Box disponibles"
          value={`${10 - activeHospitalizations.length}`}
          color="green"
        />
        <StatCard
          title="Sorties du jour"
          value="2"
          color="purple"
        />
        <StatCard
          title="Admissions du jour"
          value="1"
          color="orange"
        />
      </div>

      {/* Active Hospitalizations */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-xl font-bold text-dark dark:text-white">
          Hospitalisations en Cours ({activeHospitalizations.length})
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {activeHospitalizations.map((hospitalization) => (
            <HospitalizationCard
              key={hospitalization.id}
              hospitalization={hospitalization}
            />
          ))}
        </div>
      </div>

      {/* Box Map */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-xl font-bold text-dark dark:text-white">
          Carte des Box
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {[...Array(10)].map((_, i) => {
            const boxOccupied = activeHospitalizations.find((h) => h.box === `Box ${String.fromCharCode(65 + i)}${i + 1}`);
            return (
              <div
                key={i}
                className={`rounded-lg border-2 p-4 text-center ${
                  boxOccupied
                    ? "border-[#04A154] bg-[#04A154]/10"
                    : "border-stroke bg-gray-2 dark:border-stroke-dark dark:bg-dark-2"
                }`}
              >
                <p className="font-bold text-dark dark:text-white">
                  Box {String.fromCharCode(65 + i)}{i + 1}
                </p>
                {boxOccupied ? (
                  <>
                    <p className="mt-2 text-sm text-[#04A154]">
                      {boxOccupied.patientName}
                    </p>
                    <p className="text-xs text-gray-5">
                      {boxOccupied.clientName}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-gray-5">Disponible</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Discharges */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-xl font-bold text-dark dark:text-white">
          Sorties Récentes
        </h2>
        <div className="space-y-3">
          {dischargedHospitalizations.map((hospitalization) => (
            <Link
              key={hospitalization.id}
              href={`/hospitalisation/${hospitalization.id}`}
            >
              <div className="flex items-center justify-between rounded-lg border border-stroke bg-gray-2 p-4 hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-dark-2">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                    🏥
                  </div>
                  <div>
                    <p className="font-medium text-dark dark:text-white">
                      {hospitalization.patientName}
                    </p>
                    <p className="text-sm text-gray-5">
                      {hospitalization.reason}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-5">
                    Sortie le {new Date(hospitalization.actualDischarge!).toLocaleDateString("fr-FR")}
                  </p>
                  <p className="font-medium text-dark dark:text-white">
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "XOF",
                      minimumFractionDigits: 0,
                    }).format(hospitalization.totalCost)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  const colorClasses = {
    blue: "bg-[#019CC8]/10 text-[#019CC8]",
    green: "bg-[#04A154]/10 text-[#04A154]",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
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

function HospitalizationCard({ hospitalization }: { hospitalization: any }) {
  const completedTasks = hospitalization.carePlan.filter((t: any) => t.status === "done").length;
  const totalTasks = hospitalization.carePlan.length;

  return (
    <Link href={`/hospitalisation/${hospitalization.id}`}>
      <div className="rounded-xl border border-stroke bg-white p-5 shadow-card hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-gray-dark">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-dark dark:text-white">
              {hospitalization.patientName}
            </h3>
            <p className="text-sm text-gray-5">{hospitalization.clientName}</p>
          </div>
          <span className="rounded-full bg-[#04A154]/10 px-2 py-1 text-xs font-medium text-[#04A154]">
            {hospitalization.box}
          </span>
        </div>

        <div className="mb-4 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-5">
            <span>📋</span>
            <span>{hospitalization.reason}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-5">
            <span>📅</span>
            <span>
              Admis le {new Date(hospitalization.admissionDate).toLocaleDateString("fr-FR")}
            </span>
          </div>
          {hospitalization.expectedDischarge && (
            <div className="flex items-center gap-2 text-gray-5">
              <span>🎯</span>
              <span>
                Sortie prévue le {new Date(hospitalization.expectedDischarge).toLocaleDateString("fr-FR")}
              </span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-5">Plan de soins</span>
            <span className="font-medium text-dark dark:text-white">
              {completedTasks}/{totalTasks}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-[#04A154]"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-stroke-dark">
          <div>
            <p className="text-xs text-gray-5">Coût journalier</p>
            <p className="font-medium text-dark dark:text-white">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "XOF",
                minimumFractionDigits: 0,
              }).format(hospitalization.dailyRate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-5">Total estimé</p>
            <p className="font-medium text-dark dark:text-white">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "XOF",
                minimumFractionDigits: 0,
              }).format(hospitalization.totalCost)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
