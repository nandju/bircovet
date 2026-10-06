"use client";

import { useState } from "react";

const roles = [
  { id: "dg_veterinaire", label: "DG Vétérinaire", description: "Accès complet" },
  { id: "veterinaire", label: "Vétérinaire Habilité", description: "Consultations, prescriptions" },
  { id: "assistant_technique", label: "Assistant Technique", description: "Soins, missions terrain" },
  { id: "accueil_stock", label: "Accueil & Stock", description: "File d'attente, réception" },
  { id: "confrere_refere", label: "Confrère Référé", description: "Portail restreint" },
];

export function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState("dg_veterinaire");

  return (
    <div className="rounded-xl border border-stroke bg-white p-4 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
      <div className="mb-3">
        <label className="block text-sm font-medium text-dark dark:text-white">
          Sélecteur de Rôle (Test)
        </label>
        <p className="text-xs text-gray-5">
          Permet de tester l&apos;interface selon différents profils d&apos;accès
        </p>
      </div>
      <div className="space-y-2">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`w-full rounded-lg border p-3 text-left transition-colors ${
              selectedRole === role.id
                ? "border-[#04A154] bg-[#04A154]/10"
                : "border-stroke bg-white hover:bg-gray-2 dark:border-stroke-dark dark:bg-gray-dark dark:hover:bg-dark-2"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-dark dark:text-white">
                  {role.label}
                </p>
                <p className="text-xs text-gray-5">{role.description}</p>
              </div>
              {selectedRole === role.id && (
                <span className="text-[#04A154]">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
