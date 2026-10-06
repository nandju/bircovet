"use client";

import { useState } from "react";

export default function AssistantIAPage() {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(
        "Résumé de consultation:\n\nPatient: Rex (Berger Allemand, 5 ans)\nMotif: Vaccination annuelle\nExamen clinique: État général bon, température normale, mucosées roses.\nConstantes: Température 38.5°C, FC 90 bpm, FR 20/min.\nDiagnostic: Patient en bonne santé, vaccination recommandée.\n\nRecommandations:\n- Vaccination annuelle effectuée\n- Prochain contrôle dans 1 an\n- Maintenir l'alimentation actuelle\n- Exercice régulier recommandé"
      );
      setIsGenerating(false);
    }, 2000);
  };

  const handleValidate = () => {
    setIsValidated(true);
    // In a real app, this would save the validated content
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Assistant IA
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Génération assistée de résumés et documents
          </p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
        <p className="font-medium text-red-600 dark:text-red-400">
          ⚠️ Avertissement de Sécurité
        </p>
        <p className="text-sm text-red-600 dark:text-red-400">
          Toutes les sorties de l&apos;IA sont des brouillons qui nécessitent une validation humaine avant utilisation.
          Vérifiez toujours les informations générées.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
          <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
            Zone de saisie
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Type de génération
              </label>
              <select className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white">
                <option value="summary">Résumé de consultation</option>
                <option value="advice">Fiche conseil client</option>
                <option value="extract">Extraction de document scanné</option>
                <option value="report">Rapport médical</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Contexte / Données d&apos;entrée
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={8}
                placeholder="Collez ici les notes de consultation, les données du patient ou le texte à traiter..."
                className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="w-full rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Génération en cours..." : "Générer avec l'IA"}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
          <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
            Résultat généré
          </h2>
          {generatedContent ? (
            <div className="space-y-4">
              <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  📝 Brouillon à vérifier
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  Ce contenu est généré par l&apos;IA et doit être validé avant utilisation
                </p>
              </div>
              <textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                rows={12}
                className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleValidate}
                  disabled={isValidated}
                  className="flex-1 rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343] disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isValidated ? "✓ Validé" : "Valider et utiliser"}
                </button>
                <button
                  onClick={() => setGeneratedContent("")}
                  className="rounded-lg border border-stroke bg-white px-4 py-2 hover:bg-gray-2 dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-stroke bg-gray-2 dark:border-stroke-dark dark:bg-dark-2">
              <p className="text-center text-gray-5">
                Le contenu généré apparaîtra ici
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button className="rounded-lg border border-stroke bg-white p-4 text-left hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-gray-dark dark:hover:bg-dark-2">
            <h3 className="font-medium text-dark dark:text-white">
              📄 Résumé automatique
            </h3>
            <p className="mt-1 text-sm text-gray-5">
              Générer un résumé à partir des notes de consultation
            </p>
          </button>
          <button className="rounded-lg border border-stroke bg-white p-4 text-left hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-gray-dark dark:hover:bg-dark-2">
            <h3 className="font-medium text-dark dark:text-white">
              💡 Fiche conseil
            </h3>
            <p className="mt-1 text-sm text-gray-5">
              Créer une fiche conseil personnalisée pour le client
            </p>
          </button>
          <button className="rounded-lg border border-stroke bg-white p-4 text-left hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-gray-dark dark:hover:bg-dark-2">
            <h3 className="font-medium text-dark dark:text-white">
              🔍 Extraction document
            </h3>
            <p className="mt-1 text-sm text-gray-5">
              Extraire les informations d&apos;un document scanné
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
