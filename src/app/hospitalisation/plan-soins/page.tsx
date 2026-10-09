"use client";

import { useState } from "react";

export default function HospitalisationPlanSoinsPage() {
  const [selectedPatient, setSelectedPatient] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Plan de Soins
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Gestion des plans de soins horaires pour les patients hospitalisés
          </p>
        </div>
        <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
          + Nouveau Plan
        </button>
      </div>

      {/* Selection Filter */}
      <div className="rounded-xl border border-stroke bg-white p-4 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
          Sélectionner un patient
        </label>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
        >
          <option value="">-- Choisir un patient --</option>
          <option value="PAT-001">Rex (Box A1)</option>
          <option value="PAT-002">Minou (Box A2)</option>
          <option value="PAT-004">Luna (Box B1)</option>
        </select>
      </div>

      {selectedPatient ? (
        <div className="space-y-4">
          {/* Care Plan Grid */}
          <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
            <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
              Plan de Soins - {selectedPatient === "PAT-001" ? "Rex" : selectedPatient === "PAT-002" ? "Minou" : "Luna"}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((hour) => (
                <div
                  key={hour}
                  className="rounded-lg border border-stroke bg-gray-2 p-3 dark:border-stroke-dark dark:bg-dark-2"
                >
                  <p className="mb-2 text-sm font-medium text-dark dark:text-white">
                    {hour}:00
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`hour-${hour}-1`}
                        className="h-4 w-4 rounded border-stroke text-[#04A154] focus:ring-[#04A154]"
                      />
                      <label htmlFor={`hour-${hour}-1`} className="text-sm text-gray-5">
                        Administration médicament
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`hour-${hour}-2`}
                        className="h-4 w-4 rounded border-stroke text-[#04A154] focus:ring-[#04A154]"
                      />
                      <label htmlFor={`hour-${hour}-2`} className="text-sm text-gray-5">
                        Alimentation
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`hour-${hour}-3`}
                        className="h-4 w-4 rounded border-stroke text-[#04A154] focus:ring-[#04A154]"
                      />
                      <label htmlFor={`hour-${hour}-3`} className="text-sm text-gray-5">
                        Hygiène
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button className="rounded-lg border border-stroke bg-white px-6 py-2 hover:bg-gray-2 dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2">
              Annuler
            </button>
            <button className="rounded-lg bg-[#04A154] px-6 py-2 text-white hover:bg-[#038343]">
              Enregistrer le Plan
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-stroke bg-white p-12 text-center shadow-card dark:border-stroke-dark dark:bg-gray-dark">
          <p className="text-lg text-gray-5">
            Sélectionnez un patient pour voir son plan de soins
          </p>
        </div>
      )}
    </div>
  );
}
