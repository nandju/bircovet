"use client";

import { mockClients, mockInvoices, mockPatients } from "@/data/mockData";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = params.id as string;

  const client = mockClients.find((c) => c.id === clientId);
  const clientPatients = mockPatients.filter((p) => p.clientId === clientId);
  const clientInvoices = mockInvoices.filter((i) => i.clientId === clientId);

  if (!client) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-lg text-gray-5">Client non trouvé</p>
      </div>
    );
  }

  const formattedBalance = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  }).format(client.balance);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/clients"
            className="mb-2 text-sm text-[#019CC8] hover:underline"
          >
            ← Retour aux clients
          </Link>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            {client.name}
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            {client.type === "particulier" ? "Particulier" : "Élevage"} •{" "}
            {client.city}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-[#04A154] px-4 py-2 text-[#04A154] hover:bg-[#04A154]/10">
            Modifier
          </button>
          <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
            + Nouveau Patient
          </button>
        </div>
      </div>

      {/* Client Info Card */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-xl font-bold text-dark dark:text-white">
          Informations Client
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InfoRow label="Téléphone" value={client.phone} icon="📞" />
          {client.email && (
            <InfoRow label="Email" value={client.email} icon="✉️" />
          )}
          <InfoRow label="Adresse" value={client.address} icon="📍" />
          <InfoRow label="Ville" value={client.city} icon="🏙️" />
          <InfoRow label="Type" value={client.type === "particulier" ? "Particulier" : "Élevage"} icon="👤" />
          <InfoRow label="Nombre de patients" value={client.patientCount.toString()} icon="🐾" />
          <InfoRow label="Total factures" value={client.totalInvoices.toString()} icon="📄" />
          <InfoRow
            label="Solde"
            value={formattedBalance}
            icon="💰"
            valueClassName={client.balance > 0 ? "text-red-500" : "text-[#04A154]"}
          />
          <InfoRow
            label="Dernière visite"
            value={new Date(client.lastVisit).toLocaleDateString("fr-FR")}
            icon="📅"
          />
        </div>
      </div>

      {/* Patients Section */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            Patients ({clientPatients.length})
          </h2>
          <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
            + Nouveau Patient
          </button>
        </div>
        <div className="space-y-3">
          {clientPatients.map((patient) => (
            <Link key={patient.id} href={`/patients/${patient.id}`}>
              <div className="flex items-center justify-between rounded-lg border border-stroke bg-gray-2 p-4 hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-dark-2">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-[#04A154]/10 p-2 text-[#04A154]">
                    🐾
                  </div>
                  <div>
                    <p className="font-medium text-dark dark:text-white">
                      {patient.name}
                    </p>
                    <p className="text-sm text-gray-5">
                      {patient.species} • {patient.breed}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      patient.status === "actif"
                        ? "bg-[#04A154]/10 text-[#04A154]"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {patient.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-5">
                    {patient.sex === "male" ? "♂" : "♀"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Invoices Section */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            Historique des Factures ({clientInvoices.length})
          </h2>
          <Link
            href="/facturation"
            className="text-sm font-medium text-[#019CC8] hover:underline"
          >
            Voir toutes les factures →
          </Link>
        </div>
        <div className="space-y-3">
          {clientInvoices.map((invoice) => {
            const formattedTotal = new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "XOF",
              minimumFractionDigits: 0,
            }).format(invoice.total);

            const statusColors = {
              brouillon: "bg-gray-100 text-gray-600",
              envoyee: "bg-[#019CC8]/10 text-[#019CC8]",
              payee: "bg-[#04A154]/10 text-[#04A154]",
              impayee: "bg-orange-100 text-orange-600",
              annulee: "bg-red-100 text-red-600",
            };

            return (
              <Link key={invoice.id} href={`/facturation/${invoice.id}`}>
                <div className="flex items-center justify-between rounded-lg border border-stroke bg-gray-2 p-4 hover:border-[#6AB391] transition-colors dark:border-stroke-dark dark:bg-dark-2">
                  <div>
                    <p className="font-medium text-dark dark:text-white">
                      {invoice.id}
                    </p>
                    <p className="text-sm text-gray-5">
                      {new Date(invoice.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        statusColors[invoice.status as keyof typeof statusColors]
                      }`}
                    >
                      {invoice.status.toUpperCase()}
                    </span>
                    <p className="text-lg font-bold text-dark dark:text-white">
                      {formattedTotal}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
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
