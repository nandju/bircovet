"use client";

import { mockClients } from "@/data/mockData";
import Link from "next/link";
import { useState } from "react";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "particulier" | "elevage">("all");

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || client.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Gestion des Clients
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Gestion des clients particuliers et éleveurs
          </p>
        </div>
        <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
          + Nouveau Client
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Rechercher un client (nom, téléphone, ville...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType("all")}
            className={`rounded-lg px-4 py-2 ${
              filterType === "all"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setFilterType("particulier")}
            className={`rounded-lg px-4 py-2 ${
              filterType === "particulier"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Particuliers
          </button>
          <button
            onClick={() => setFilterType("elevage")}
            className={`rounded-lg px-4 py-2 ${
              filterType === "elevage"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Élevages
          </button>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="rounded-xl border border-stroke bg-white p-12 text-center dark:border-stroke-dark dark:bg-gray-dark">
          <p className="text-lg text-gray-5">Aucun client trouvé</p>
        </div>
      )}
    </div>
  );
}

function ClientCard({ client }: { client: any }) {
  const formattedBalance = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  }).format(client.balance);

  return (
    <Link href={`/clients/${client.id}`}>
      <div className="rounded-xl border border-stroke bg-white p-5 shadow-card hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-gray-dark">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-dark dark:text-white">
              {client.name}
            </h3>
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                client.type === "particulier"
                  ? "bg-[#04A154]/10 text-[#04A154]"
                  : "bg-[#019CC8]/10 text-[#019CC8]"
              }`}
            >
              {client.type === "particulier" ? "Particulier" : "Élevage"}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-5">Solde</p>
            <p
              className={`text-lg font-bold ${
                client.balance > 0 ? "text-red-500" : "text-[#04A154]"
              }`}
            >
              {formattedBalance}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-5">
            <span>📞</span>
            <span>{client.phone}</span>
          </div>
          {client.email && (
            <div className="flex items-center gap-2 text-gray-5">
              <span>✉️</span>
              <span>{client.email}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-5">
            <span>📍</span>
            <span>{client.address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-5">
            <span>🏙️</span>
            <span>{client.city}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-stroke pt-4 dark:border-stroke-dark">
          <div className="text-sm text-gray-5">
            <span className="font-medium text-dark dark:text-white">
              {client.patientCount}
            </span>{" "}
            patients
          </div>
          <div className="text-sm text-gray-5">
            <span className="font-medium text-dark dark:text-white">
              {client.totalInvoices}
            </span>{" "}
            factures
          </div>
        </div>

        <div className="mt-3 text-xs text-gray-5">
          Dernière visite: {new Date(client.lastVisit).toLocaleDateString("fr-FR")}
        </div>
      </div>
    </Link>
  );
}
