"use client";

import { mockLots } from "@/data/mockData";
import { useState } from "react";

export default function StockLotsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredLots = mockLots.filter((lot) => {
    const matchesSearch =
      lot.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.lotNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || lot.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    disponible: "bg-[#04A154]/10 text-[#04A154]",
    quarantaine: "bg-orange-100 text-orange-600",
    perime: "bg-red-100 text-red-600",
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Gestion des Lots
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Suivi FEFO et gestion des péremptions
          </p>
        </div>
        <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
          + Nouveau Lot
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Rechercher un lot (produit, numéro...)"
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
            Tous
          </button>
          <button
            onClick={() => setFilterStatus("disponible")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterStatus === "disponible"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Disponibles
          </button>
          <button
            onClick={() => setFilterStatus("quarantaine")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterStatus === "quarantaine"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Quarantaine
          </button>
          <button
            onClick={() => setFilterStatus("perime")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterStatus === "perime"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Périmés
          </button>
        </div>
      </div>

      {/* Lots Table */}
      <div className="rounded-xl border border-stroke bg-white shadow-card dark:border-stroke-dark dark:bg-gray-dark overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-2 dark:bg-dark-2">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Produit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Lot
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Quantité
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Péremption
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Emplacement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Fournisseur
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-5 uppercase">
                Statut
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-5 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
            {filteredLots.map((lot) => {
              const expiringSoon = isExpiringSoon(lot.expiryDate);
              const expired = isExpired(lot.expiryDate);

              return (
                <tr
                  key={lot.id}
                  className={`hover:bg-gray-2 dark:hover:bg-dark-2 ${
                    expired ? "bg-red-50 dark:bg-red-900/10" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-dark dark:text-white">
                      {lot.productName}
                    </p>
                    <p className="text-sm text-gray-5">{lot.productId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-mono text-sm text-dark dark:text-white">
                      {lot.lotNumber}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-dark dark:text-white">
                      {lot.quantity} {lot.unit}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className={`text-sm ${
                        expired
                          ? "text-red-600 font-medium"
                          : expiringSoon
                          ? "text-orange-600 font-medium"
                          : "text-gray-5"
                      }`}
                    >
                      {new Date(lot.expiryDate).toLocaleDateString("fr-FR")}
                    </p>
                    {expiringSoon && !expired && (
                      <span className="text-xs text-orange-600">
                        Expire bientôt
                      </span>
                    )}
                    {expired && (
                      <span className="text-xs text-red-600 font-medium">
                        PÉRIMÉ
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-5">
                    {lot.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-5">
                    {lot.supplier}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        statusColors[lot.status as keyof typeof statusColors]
                      }`}
                    >
                      {lot.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-[#019CC8] hover:underline text-sm">
                      Modifier
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredLots.length === 0 && (
        <div className="rounded-xl border border-stroke bg-white p-12 text-center dark:border-stroke-dark dark:bg-gray-dark">
          <p className="text-lg text-gray-5">Aucun lot trouvé</p>
        </div>
      )}
    </div>
  );
}
