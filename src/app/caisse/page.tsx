"use client";

import { useState } from "react";

export default function CaissePage() {
  const [cashierName, setCashierName] = useState("Awa Touré");
  const [isCaisseOpen, setIsCaisseOpen] = useState(true);
  const [openingBalance, setOpeningBalance] = useState(50000);
  const [currentBalance, setCurrentBalance] = useState(150000);

  const formattedAmount = (amount: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Gestion de Caisse
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Ouvertures, clôtures et transferts de caisse
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-stroke bg-white px-4 py-2 hover:bg-gray-2 dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2">
            Transfert
          </button>
          <button
            onClick={() => setIsCaisseOpen(!isCaisseOpen)}
            className={`rounded-lg px-4 py-2 text-white ${
              isCaisseOpen
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-[#04A154] hover:bg-[#038343]"
            }`}
          >
            {isCaisseOpen ? "Clôturer la caisse" : "Ouvrir la caisse"}
          </button>
        </div>
      </div>

      {/* Cashier Info */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-5">Caissier</p>
            <p className="text-lg font-bold text-dark dark:text-white">{cashierName}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-5">Statut</p>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                isCaisseOpen
                  ? "bg-[#04A154]/10 text-[#04A154]"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {isCaisseOpen ? "Caisse ouverte" : "Caisse fermée"}
            </span>
          </div>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <BalanceCard
          title="Solde d'ouverture"
          amount={openingBalance}
          color="gray"
        />
        <BalanceCard
          title="Solde actuel"
          amount={currentBalance}
          color="blue"
        />
        <BalanceCard
          title="Mouvements du jour"
          amount={currentBalance - openingBalance}
          color="green"
        />
      </div>

      {/* Payment Methods Breakdown */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
          Répartition par moyen de paiement
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <PaymentMethodCard
            method="Espèces"
            amount={80000}
            icon="💵"
            color="green"
          />
          <PaymentMethodCard
            method="Mobile Money"
            amount={50000}
            icon="📱"
            color="blue"
          />
          <PaymentMethodCard
            method="Chèque"
            amount={15000}
            icon="📝"
            color="purple"
          />
          <PaymentMethodCard
            method="Carte"
            amount={5000}
            icon="💳"
            color="orange"
          />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
          Transactions récentes
        </h2>
        <div className="space-y-3">
          <TransactionRow
            time="09:15"
            type="in"
            description="Paiement facture FAC-2025-001"
            amount={15000}
            method="Mobile Money"
          />
          <TransactionRow
            time="10:30"
            type="in"
            description="Paiement facture FAC-2025-002"
            amount={100000}
            method="Espèces"
          />
          <TransactionRow
            time="11:45"
            type="out"
            description="Retrait pour achat fournitures"
            amount={5000}
            method="Espèces"
          />
          <TransactionRow
            time="14:20"
            type="in"
            description="Paiement consultation"
            amount={10000}
            method="Mobile Money"
          />
        </div>
      </div>
    </div>
  );
}

function BalanceCard({
  title,
  amount,
  color,
}: {
  title: string;
  amount: number;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-[#019CC8]/10 text-[#019CC8]",
    green: "bg-[#04A154]/10 text-[#04A154]",
    gray: "bg-gray-100 text-gray-600",
  };

  const formattedAmount = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  }).format(amount);

  return (
    <div className="rounded-xl border border-stroke bg-white p-5 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
      <p className="text-sm text-gray-5">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${colorClasses[color as keyof typeof colorClasses]}`}>
        {formattedAmount}
      </p>
    </div>
  );
}

function PaymentMethodCard({
  method,
  amount,
  icon,
  color,
}: {
  method: string;
  amount: number;
  icon: string;
  color: string;
}) {
  const formattedAmount = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  }).format(amount);

  return (
    <div className="rounded-lg border border-stroke bg-gray-2 p-4 dark:border-stroke-dark dark:bg-dark-2">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className="text-sm text-gray-5">{method}</p>
          <p className="text-lg font-bold text-dark dark:text-white">
            {formattedAmount}
          </p>
        </div>
      </div>
    </div>
  );
}

function TransactionRow({
  time,
  type,
  description,
  amount,
  method,
}: {
  time: string;
  type: "in" | "out";
  description: string;
  amount: number;
  method: string;
}) {
  const formattedAmount = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  }).format(amount);

  return (
    <div className="flex items-center justify-between rounded-lg border border-stroke bg-gray-2 p-4 dark:border-stroke-dark dark:bg-dark-2">
      <div className="flex items-center gap-4">
        <div className="text-center min-w-[60px]">
          <p className="text-sm font-medium text-dark dark:text-white">{time}</p>
        </div>
        <div className="h-10 w-px bg-stroke dark:bg-stroke-dark" />
        <div className="flex-1">
          <p className="font-medium text-dark dark:text-white">{description}</p>
          <p className="text-sm text-gray-5">{method}</p>
        </div>
      </div>
      <p
        className={`text-lg font-bold ${
          type === "in" ? "text-[#04A154]" : "text-red-500"
        }`}
      >
        {type === "in" ? "+" : "-"}
        {formattedAmount}
      </p>
    </div>
  );
}
