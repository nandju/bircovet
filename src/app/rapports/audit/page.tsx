"use client";

import { mockAuditLogs } from "@/data/mockData";
import { useState } from "react";

export default function AuditLogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState<string>("all");

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === "all" || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  const actionColors = {
    CREATE: "bg-[#04A154]/10 text-[#04A154]",
    UPDATE: "bg-[#019CC8]/10 text-[#019CC8]",
    DELETE: "bg-red-100 text-red-600",
    READ: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Journal d&apos;Audit
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Historique complet et inaltérable des actions
          </p>
        </div>
        <button className="rounded-lg border border-stroke bg-white px-4 py-2 hover:bg-gray-2 dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2">
          📥 Exporter
        </button>
      </div>

      {/* Security Notice */}
      <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
        <p className="font-medium text-red-600 dark:text-red-400">
          🔒 Journal d&apos;Audit Inaltérable
        </p>
        <p className="text-sm text-red-600 dark:text-red-400">
          Ce journal est protégé contre toute modification. Toutes les actions sont enregistrées de manière irréversible.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Rechercher dans le journal (utilisateur, action, entité...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterAction("all")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterAction === "all"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilterAction("CREATE")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterAction === "CREATE"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Créations
          </button>
          <button
            onClick={() => setFilterAction("UPDATE")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterAction === "UPDATE"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Modifications
          </button>
          <button
            onClick={() => setFilterAction("DELETE")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterAction === "DELETE"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Suppressions
          </button>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-xl border border-stroke bg-white shadow-card dark:border-stroke-dark dark:bg-gray-dark overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-2 dark:bg-dark-2">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Horodatage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Entité
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                ID Entité
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Détails
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                <td className="px-6 py-4 text-sm text-gray-5">
                  {new Date(log.timestamp).toLocaleString("fr-FR")}
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-dark dark:text-white">
                    {log.userName}
                  </p>
                  <p className="text-sm text-gray-5">{log.userId}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      actionColors[log.action as keyof typeof actionColors]
                    }`}
                  >
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-5">
                  {log.entity}
                </td>
                <td className="px-6 py-4 text-sm font-mono text-gray-5">
                  {log.entityId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-5">
                  {log.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLogs.length === 0 && (
        <div className="rounded-xl border border-stroke bg-white p-12 text-center dark:border-stroke-dark dark:bg-gray-dark">
          <p className="text-lg text-gray-5">Aucune entrée trouvée</p>
        </div>
      )}
    </div>
  );
}
