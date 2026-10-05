"use client";

import { mockClients, mockPatients } from "@/data/mockData";
import Link from "next/link";
import { useState } from "react";

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecies, setFilterSpecies] = useState<string>("all");

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.chipNumber && patient.chipNumber.includes(searchTerm));
    const matchesSpecies = filterSpecies === "all" || patient.species === filterSpecies;
    return matchesSearch && matchesSpecies;
  });

  const speciesList = Array.from(new Set(mockPatients.map((p) => p.species)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Dossiers Patients
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Gestion des dossiers médicaux des animaux
          </p>
        </div>
        <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
          + Nouveau Patient
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Rechercher un patient (nom, race, puce...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterSpecies("all")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterSpecies === "all"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Toutes espèces
          </button>
          {speciesList.map((species) => (
            <button
              key={species}
              onClick={() => setFilterSpecies(species)}
              className={`rounded-lg px-3 py-2 text-sm capitalize ${
                filterSpecies === species
                  ? "bg-[#04A154] text-white"
                  : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
              }`}
            >
              {species}
            </button>
          ))}
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map((patient) => {
          const client = mockClients.find((c) => c.id === patient.clientId);
          return <PatientCard key={patient.id} patient={patient} client={client} />;
        })}
      </div>

      {filteredPatients.length === 0 && (
        <div className="rounded-xl border border-stroke bg-white p-12 text-center dark:border-stroke-dark dark:bg-gray-dark">
          <p className="text-lg text-gray-5">Aucun patient trouvé</p>
        </div>
      )}
    </div>
  );
}

function PatientCard({ patient, client }: { patient: any; client: any }) {
  const age = Math.floor(
    (new Date().getTime() - new Date(patient.birthDate).getTime()) /
      (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <Link href={`/patients/${patient.id}`}>
      <div className="rounded-xl border border-stroke bg-white p-5 shadow-card hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-gray-dark">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-dark dark:text-white">
              {patient.name}
            </h3>
            <p className="text-sm text-gray-5 capitalize">
              {patient.species} • {patient.breed}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                patient.status === "actif"
                  ? "bg-[#04A154]/10 text-[#04A154]"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {patient.status.toUpperCase()}
            </span>
            <span className="text-lg">{patient.sex === "male" ? "♂" : "♀"}</span>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-5">
            <span>🎂</span>
            <span>{age} ans</span>
          </div>
          <div className="flex items-center gap-2 text-gray-5">
            <span>⚖️</span>
            <span>{patient.weight} kg</span>
          </div>
          {patient.chipNumber && (
            <div className="flex items-center gap-2 text-gray-5">
              <span>🔖</span>
              <span className="font-mono text-xs">{patient.chipNumber}</span>
            </div>
          )}
          {patient.tattooNumber && (
            <div className="flex items-center gap-2 text-gray-5">
              <span>🔖</span>
              <span className="font-mono text-xs">{patient.tattooNumber}</span>
            </div>
          )}
          {patient.allergies && patient.allergies.length > 0 && (
            <div className="flex items-center gap-2 text-red-500">
              <span>⚠️</span>
              <span className="text-xs">{patient.allergies.join(", ")}</span>
            </div>
          )}
        </div>

        <div className="mt-4 border-t border-stroke pt-4 dark:border-stroke-dark">
          <p className="text-sm text-gray-5">Propriétaire</p>
          <p className="font-medium text-dark dark:text-white">
            {client?.name || "Inconnu"}
          </p>
        </div>

        {patient.lastConsultation && (
          <div className="mt-2 text-xs text-gray-5">
            Dernière consultation: {new Date(patient.lastConsultation).toLocaleDateString("fr-FR")}
          </div>
        )}
      </div>
    </Link>
  );
}
