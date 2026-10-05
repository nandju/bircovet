"use client";

import { mockClients, mockPatients, mockProducts } from "@/data/mockData";
import { useState } from "react";

export default function NouvelleConsultationPage() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [motif, setMotif] = useState("");
  const [anamnese, setAnamnese] = useState("");
  const [examen, setExamen] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  const handleAddPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      {
        id: Date.now().toString(),
        productId: "",
        productName: "",
        dosage: "",
        route: "",
        duration: "",
      },
    ]);
  };

  const handleRemovePrescription = (id: string) => {
    setPrescriptions(prescriptions.filter((p) => p.id !== id));
  };

  const handlePrescriptionChange = (id: string, field: string, value: string) => {
    setPrescriptions(
      prescriptions.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Nouvelle Consultation
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Créer une nouvelle consultation médicale
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-stroke bg-white px-4 py-2 hover:bg-gray-2 dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2">
            Annuler
          </button>
          <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
            Enregistrer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Patient Selection */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
            <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
              Sélection du Patient
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                  Patient
                </label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                >
                  <option value="">Sélectionner un patient</option>
                  {mockPatients.map((patient) => {
                    const client = mockClients.find((c) => c.id === patient.clientId);
                    return (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} - {client?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="w-full rounded-lg border border-[#04A154] px-4 py-2 text-[#04A154] hover:bg-[#04A154]/10">
                + Nouveau Patient
              </button>
            </div>
          </div>
        </div>

        {/* Consultation Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
            <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
              Consultation
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                  Motif de consultation
                </label>
                <input
                  type="text"
                  value={motif}
                  onChange={(e) => setMotif(e.target.value)}
                  placeholder="Ex: Vaccination annuelle, Douleur abdominale..."
                  className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                  Anamnèse
                </label>
                <textarea
                  value={anamnese}
                  onChange={(e) => setAnamnese(e.target.value)}
                  rows={3}
                  placeholder="Historique du patient, symptômes rapportés..."
                  className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                  Examen clinique
                </label>
                <textarea
                  value={examen}
                  onChange={(e) => setExamen(e.target.value)}
                  rows={3}
                  placeholder="Constantes, examen physique..."
                  className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                  Diagnostic
                </label>
                <textarea
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  rows={2}
                  placeholder="Diagnostic provisoire ou définitif..."
                  className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Prescription */}
          <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-dark dark:text-white">
                Ordonnance
              </h2>
              <button
                onClick={handleAddPrescription}
                className="rounded-lg bg-[#04A154] px-3 py-1 text-white text-sm hover:bg-[#038343]"
              >
                + Ajouter produit
              </button>
            </div>

            <div className="mb-4 rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                ⚠️ La prescription ne retire pas du stock
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400">
                Utilisez le module de délivrance pour retirer les produits du stock
              </p>
            </div>

            {prescriptions.length === 0 ? (
              <p className="text-center text-sm text-gray-5">
                Aucun produit prescrit
              </p>
            ) : (
              <div className="space-y-3">
                {prescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="rounded-lg border border-stroke bg-gray-2 p-4 dark:border-stroke-dark dark:bg-dark-2"
                  >
                    <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                          Produit
                        </label>
                        <select
                          value={prescription.productId}
                          onChange={(e) => {
                            const product = mockProducts.find((p) => p.id === e.target.value);
                            handlePrescriptionChange(prescription.id, "productId", e.target.value);
                            handlePrescriptionChange(prescription.id, "productName", product?.name || "");
                          }}
                          className="w-full rounded-lg border border-stroke bg-white px-3 py-1.5 text-sm outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                        >
                          <option value="">Sélectionner</option>
                          {mockProducts.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                          Voie d'administration
                        </label>
                        <select
                          value={prescription.route}
                          onChange={(e) => handlePrescriptionChange(prescription.id, "route", e.target.value)}
                          className="w-full rounded-lg border border-stroke bg-white px-3 py-1.5 text-sm outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                        >
                          <option value="">Sélectionner</option>
                          <option value="oral">Orale</option>
                          <option value="injectable">Injectable</option>
                          <option value="topique">Topique</option>
                          <option value="intraveineuse">Intraveineuse</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                          Posologie
                        </label>
                        <input
                          type="text"
                          value={prescription.dosage}
                          onChange={(e) => handlePrescriptionChange(prescription.id, "dosage", e.target.value)}
                          placeholder="Ex: 1 comprimé 2x/jour"
                          className="w-full rounded-lg border border-stroke bg-white px-3 py-1.5 text-sm outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                          Durée
                        </label>
                        <input
                          type="text"
                          value={prescription.duration}
                          onChange={(e) => handlePrescriptionChange(prescription.id, "duration", e.target.value)}
                          placeholder="Ex: 7 jours"
                          className="w-full rounded-lg border border-stroke bg-white px-3 py-1.5 text-sm outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemovePrescription(prescription.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
