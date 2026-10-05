"use client";

import { mockProducts } from "@/data/mockData";
import { useState } from "react";

export default function ReceptionPage() {
  const [selectedOrder, setSelectedOrder] = useState("");
  const [receptionItems, setReceptionItems] = useState<any[]>([]);
  const [notes, setNotes] = useState("");

  const handleAddItem = () => {
    setReceptionItems([
      ...receptionItems,
      {
        id: Date.now().toString(),
        productId: "",
        productName: "",
        orderedQty: 0,
        receivedQty: 0,
        lotNumber: "",
        expiryDate: "",
        location: "",
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setReceptionItems(receptionItems.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: string, value: any) => {
    setReceptionItems(
      receptionItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Réception BLI / EDI
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Comparaison Bon de Livraison vs Commande
          </p>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-stroke bg-white px-4 py-2 hover:bg-gray-2 dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2">
            Annuler
          </button>
          <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
            Valider la Réception
          </button>
        </div>
      </div>

      {/* Order Selection */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
          Sélection de la Commande
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
              Numéro de Bon de Livraison (BLI)
            </label>
            <input
              type="text"
              value={selectedOrder}
              onChange={(e) => setSelectedOrder(e.target.value)}
              placeholder="Ex: BLI-2025-001234"
              className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
              Fournisseur
            </label>
            <select className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white">
              <option value="">Sélectionner un fournisseur</option>
              <option value="pharmaco">PharmaCo SA</option>
              <option value="vetvaccins">VetVaccins CI</option>
              <option value="agrovet">AgroVet Ltd</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reception Items */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-dark dark:text-white">
            Articles Reçus
          </h2>
          <button
            onClick={handleAddItem}
            className="rounded-lg bg-[#04A154] px-3 py-1 text-white text-sm hover:bg-[#038343]"
          >
            + Ajouter article
          </button>
        </div>

        <div className="mb-4 rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
          <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
            ⚠️ Validation requise
          </p>
          <p className="text-xs text-orange-600 dark:text-orange-400">
            Comparez les quantités reçues avec celles commandées avant validation
          </p>
        </div>

        {receptionItems.length === 0 ? (
          <p className="text-center text-sm text-gray-5 py-8">
            Aucun article ajouté. Cliquez sur "+ Ajouter article" pour commencer.
          </p>
        ) : (
          <div className="space-y-4">
            {receptionItems.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-stroke bg-gray-2 p-4 dark:border-stroke-dark dark:bg-dark-2"
              >
                <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                      Produit
                    </label>
                    <select
                      value={item.productId}
                      onChange={(e) => {
                        const product = mockProducts.find((p) => p.id === e.target.value);
                        handleItemChange(item.id, "productId", e.target.value);
                        handleItemChange(item.id, "productName", product?.name || "");
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
                      Numéro de Lot
                    </label>
                    <input
                      type="text"
                      value={item.lotNumber}
                      onChange={(e) => handleItemChange(item.id, "lotNumber", e.target.value)}
                      placeholder="Ex: AMX20250101"
                      className="w-full rounded-lg border border-stroke bg-white px-3 py-1.5 text-sm outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                      Quantité Commandée
                    </label>
                    <input
                      type="number"
                      value={item.orderedQty}
                      onChange={(e) => handleItemChange(item.id, "orderedQty", parseInt(e.target.value) || 0)}
                      className="w-full rounded-lg border border-stroke bg-white px-3 py-1.5 text-sm outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                      Quantité Reçue
                    </label>
                    <input
                      type="number"
                      value={item.receivedQty}
                      onChange={(e) => handleItemChange(item.id, "receivedQty", parseInt(e.target.value) || 0)}
                      className={`w-full rounded-lg border px-3 py-1.5 text-sm outline-none focus:border-[#04A154] dark:bg-gray-dark dark:text-white ${
                        item.receivedQty !== item.orderedQty
                          ? "border-orange-500 bg-orange-50 dark:border-orange-500 dark:bg-orange-900/10"
                          : "border-stroke bg-white dark:border-stroke-dark"
                      }`}
                    />
                    {item.receivedQty !== item.orderedQty && (
                      <p className="mt-1 text-xs text-orange-600">
                        Écart: {item.receivedQty - item.orderedQty}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                      Date de Péremption
                    </label>
                    <input
                      type="date"
                      value={item.expiryDate}
                      onChange={(e) => handleItemChange(item.id, "expiryDate", e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-white px-3 py-1.5 text-sm outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                      Emplacement
                    </label>
                    <input
                      type="text"
                      value={item.location}
                      onChange={(e) => handleItemChange(item.id, "location", e.target.value)}
                      placeholder="Ex: Pharmacie A1"
                      className="w-full rounded-lg border border-stroke bg-white px-3 py-1.5 text-sm outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
          Notes de Réception
        </h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Ajoutez des notes sur la réception (condition des produits, emballages endommagés, etc.)"
          className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
        />
      </div>

      {/* Validation Summary */}
      {receptionItems.length > 0 && (
        <div className="rounded-xl border border-stroke bg-white p-6 shadow-card dark:border-stroke-dark dark:bg-gray-dark">
          <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
            Résumé de Validation
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gray-2 p-4 dark:bg-dark-2">
              <p className="text-sm text-gray-5">Total commandé</p>
              <p className="text-2xl font-bold text-dark dark:text-white">
                {receptionItems.reduce((sum, item) => sum + item.orderedQty, 0)}
              </p>
            </div>
            <div className="rounded-lg bg-gray-2 p-4 dark:bg-dark-2">
              <p className="text-sm text-gray-5">Total reçu</p>
              <p className="text-2xl font-bold text-dark dark:text-white">
                {receptionItems.reduce((sum, item) => sum + item.receivedQty, 0)}
              </p>
            </div>
            <div className="rounded-lg bg-gray-2 p-4 dark:bg-dark-2">
              <p className="text-sm text-gray-5">Écart</p>
              <p
                className={`text-2xl font-bold ${
                  receptionItems.reduce((sum, item) => sum + (item.receivedQty - item.orderedQty), 0) !== 0
                    ? "text-orange-600"
                    : "text-[#04A154]"
                }`}
              >
                {receptionItems.reduce((sum, item) => sum + (item.receivedQty - item.orderedQty), 0)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
