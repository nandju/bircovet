"use client";

import { mockClients, mockInvoices } from "@/data/mockData";
import { useState } from "react";

export default function FacturationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    brouillon: "bg-gray-100 text-gray-600",
    envoyee: "bg-[#019CC8]/10 text-[#019CC8]",
    payee: "bg-[#04A154]/10 text-[#04A154]",
    impayee: "bg-orange-100 text-orange-600",
    annulee: "bg-red-100 text-red-600",
  };

  const fneStatusColors = {
    none: "bg-gray-100 text-gray-600",
    pending: "bg-yellow-100 text-yellow-600",
    validated: "bg-[#04A154]/10 text-[#04A154]",
    rejected: "bg-red-100 text-red-600",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Devis & Factures
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Gestion de la facturation et paiements
          </p>
        </div>
        <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
          + Nouvelle Facture
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total du mois"
          amount={mockInvoices.reduce((sum, inv) => sum + inv.total, 0)}
          color="blue"
        />
        <StatCard
          title="Factures payées"
          amount={mockInvoices.filter((i) => i.status === "payee").reduce((sum, inv) => sum + inv.total, 0)}
          color="green"
        />
        <StatCard
          title="Impayés"
          amount={mockInvoices.filter((i) => i.status === "impayee").reduce((sum, inv) => sum + (inv.total - inv.paidAmount), 0)}
          color="orange"
        />
        <StatCard
          title="En attente FNE"
          amount={mockInvoices.filter((i) => i.fneStatus === "pending").length}
          color="purple"
          isCount
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Rechercher une facture (numéro, client...)"
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
            Toutes
          </button>
          <button
            onClick={() => setFilterStatus("payee")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterStatus === "payee"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Payées
          </button>
          <button
            onClick={() => setFilterStatus("impayee")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterStatus === "impayee"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Impayées
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-xl border border-stroke bg-white shadow-card dark:border-stroke-dark dark:bg-gray-dark overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-2 dark:bg-dark-2">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Facture
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-5 uppercase">
                Total (XOF)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-5 uppercase">
                Payé
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-5 uppercase">
                Statut
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-5 uppercase">
                FNE
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-5 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke dark:divide-stroke-dark">
            {filteredInvoices.map((invoice) => {
              const remaining = invoice.total - invoice.paidAmount;
              return (
                <tr key={invoice.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                  <td className="px-6 py-4">
                    <p className="font-medium text-dark dark:text-white">
                      {invoice.id}
                    </p>
                    <p className="text-sm text-gray-5">
                      Échéance: {new Date(invoice.dueDate).toLocaleDateString("fr-FR")}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-dark dark:text-white">
                      {invoice.clientName}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-5">
                    {new Date(invoice.date).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-medium text-dark dark:text-white">
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "XOF",
                        minimumFractionDigits: 0,
                      }).format(invoice.total)}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-medium text-dark dark:text-white">
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "XOF",
                        minimumFractionDigits: 0,
                      }).format(invoice.paidAmount)}
                    </p>
                    {remaining > 0 && (
                      <p className="text-sm text-orange-600">
                        Reste: {new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "XOF",
                          minimumFractionDigits: 0,
                        }).format(remaining)}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        statusColors[invoice.status as keyof typeof statusColors]
                      }`}
                    >
                      {invoice.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        fneStatusColors[invoice.fneStatus as keyof typeof fneStatusColors]
                      }`}
                    >
                      {invoice.fneStatus === "none" ? "N/A" : invoice.fneStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-[#019CC8] hover:underline text-sm">
                      Voir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredInvoices.length === 0 && (
        <div className="rounded-xl border border-stroke bg-white p-12 text-center dark:border-stroke-dark dark:bg-gray-dark">
          <p className="text-lg text-gray-5">Aucune facture trouvée</p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  amount,
  color,
  isCount = false,
}: {
  title: string;
  amount: number;
  color: string;
  isCount?: boolean;
}) {
  const colorClasses = {
    blue: "bg-[#019CC8]/10 text-[#019CC8]",
    green: "bg-[#04A154]/10 text-[#04A154]",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="rounded-xl border border-stroke bg-white p-5 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
      <p className="text-sm text-gray-5">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${colorClasses[color as keyof typeof colorClasses]}`}>
        {isCount ? amount : new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "XOF",
          minimumFractionDigits: 0,
        }).format(amount)}
      </p>
    </div>
  );
}
