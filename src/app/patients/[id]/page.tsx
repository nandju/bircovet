"use client";

import { mockClients, mockConsultations, mockPatients } from "@/data/mockData";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params.id as string;

  const patient = mockPatients.find((p) => p.id === patientId);
  const client = mockClients.find((c: any) => c.id === patient?.clientId);
  const patientConsultations = mockConsultations.filter((c) => c.patientId === patientId);

  if (!patient) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-gray-5">Patient non trouvé</p>
      </div>
    );
  }

  const age = Math.floor(
    (new Date().getTime() - new Date(patient.birthDate).getTime()) /
      (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/patients"
            className="mb-2 text-sm text-[#019CC8] hover:underline"
          >
            ← Retour aux patients
          </Link>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            {patient.name}
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            {patient.species} • {patient.breed} • {patient.sex === "male" ? "Mâle" : "Femelle"}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-[#04A154] px-4 py-2 text-[#04A154] hover:bg-[#04A154]/10">
            Modifier
          </button>
          <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
            + Nouvelle Consultation
          </button>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-xl font-bold text-dark dark:text-white">
          Fiche Patient
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InfoRow label="Espèce" value={patient.species} icon="🐾" />
          <InfoRow label="Race" value={patient.breed} icon="🏷️" />
          <InfoRow label="Sexe" value={patient.sex === "male" ? "Mâle" : "Femelle"} icon={patient.sex === "male" ? "♂" : "♀"} />
          <InfoRow label="Date de naissance" value={new Date(patient.birthDate).toLocaleDateString("fr-FR")} icon="🎂" />
          <InfoRow label="Âge" value={`${age} ans`} icon="📅" />
          <InfoRow label="Poids" value={`${patient.weight} kg`} icon="⚖️" />
          {patient.chipNumber && (
            <InfoRow label="Numéro de puce" value={patient.chipNumber} icon="🔖" />
          )}
          {patient.tattooNumber && (
            <InfoRow label="Numéro de tatouage" value={patient.tattooNumber} icon="🔖" />
          )}
          <InfoRow
            label="Statut"
            value={patient.status === "actif" ? "Actif" : patient.status === "cession" ? "Cession" : "Décès"}
            icon="📋"
            valueClassName={patient.status === "actif" ? "text-[#04A154]" : "text-red-500"}
          />
        </div>

        {patient.allergies && patient.allergies.length > 0 && (
          <div className="mt-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <p className="font-medium text-red-600 dark:text-red-400">⚠️ Allergies</p>
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {patient.allergies.join(", ")}
            </p>
          </div>
        )}
      </div>

      {/* Owner Info Card */}
      {client && (
        <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
          <h2 className="mb-4 text-xl font-bold text-dark dark:text-white">
            Propriétaire
          </h2>
          <Link href={`/clients/${client.id}`}>
            <div className="flex items-center justify-between rounded-lg border border-stroke bg-gray-2 p-4 hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-dark-2">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-[#04A154]/10 p-2 text-[#04A154]">
                  👤
                </div>
                <div>
                  <p className="font-medium text-dark dark:text-white">
                    {client.name}
                  </p>
                  <p className="text-sm text-gray-5">
                    {client.type === "particulier" ? "Particulier" : "Élevage"}
                  </p>
                </div>
              </div>
              <span className="text-[#019CC8]">→</span>
            </div>
          </Link>
        </div>
      )}

      {/* Consultations History */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            Historique des Consultations ({patientConsultations.length})
          </h2>
          <Link
            href="/consultations/historique"
            className="text-sm font-medium text-[#019CC8] hover:underline"
          >
            Voir tout l&apos;historique →
          </Link>
        </div>
        <div className="space-y-3">
          {patientConsultations.map((consultation: any) => {
            const statusColors = {
              en_cours: "bg-[#019CC8]/10 text-[#019CC8]",
              termine: "bg-[#04A154]/10 text-[#04A154]",
              annule: "bg-red-100 text-red-600",
            };

            return (
              <Link key={consultation.id} href={`/consultations/${consultation.id}`}>
                <div className="flex items-center justify-between rounded-lg border border-stroke bg-gray-2 p-4 hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-dark-2">
                  <div>
                    <p className="font-medium text-dark dark:text-white">
                      {consultation.motif}
                    </p>
                    <p className="text-sm text-gray-5">
                      {new Date(consultation.date).toLocaleDateString("fr-FR")} • {consultation.veterinarian}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        statusColors[consultation.status as keyof typeof statusColors]
                      }`}
                    >
                      {consultation.status.replace(/_/g, " ").toUpperCase()}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="rounded-lg border border-orange-500 px-4 py-2 text-orange-500 hover:bg-orange-500/10">
          🔄 Cession / Transfert
        </button>
        <button className="rounded-lg border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500/10">
          💀 Décès
        </button>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
  valueClassName = "text-dark dark:text-white",
}: {
  label: string;
  value: string;
  icon: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <p className="text-sm text-gray-5">{label}</p>
        <p className={`font-medium ${valueClassName}`}>{value}</p>
      </div>
    </div>
  );
}
