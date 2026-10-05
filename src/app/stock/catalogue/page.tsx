"use client";

import { mockProducts } from "@/data/mockData";
import { useState } from "react";

export default function StockCataloguePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryLabels = {
    medicament: "Médicaments",
    vaccin: "Vaccins",
    aliment: "Aliments",
    accessoire: "Accessoires",
    consommable: "Consommables",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Catalogue Produits
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Gestion du catalogue de produits et unités
          </p>
        </div>
        <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
          + Nouveau Produit
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterCategory("all")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterCategory === "all"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Tous
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilterCategory(key)}
              className={`rounded-lg px-3 py-2 text-sm ${
                filterCategory === key
                  ? "bg-[#04A154] text-white"
                  : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-xl border border-stroke bg-white shadow-card dark:border-stroke-dark dark:bg-gray-dark overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-2 dark:bg-dark-2">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Produit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Unités
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-5 uppercase">
                Prix Achat
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-5 uppercase">
                Prix Vente
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
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                <td className="px-6 py-4">
                  <p className="font-medium text-dark dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-5">{product.id}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-[#019CC8]/10 px-2 py-1 text-xs font-medium text-[#019CC8]">
                    {categoryLabels[product.category as keyof typeof categoryLabels]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-5">
                  <div>
                    <p>Achat: {product.unitAchat}</p>
                    <p>Stock: {product.unitStock}</p>
                    <p>Vente: {product.unitVente}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm text-gray-5">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "XOF",
                    minimumFractionDigits: 0,
                  }).format(product.priceAchat)}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-dark dark:text-white">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "XOF",
                    minimumFractionDigits: 0,
                  }).format(product.priceVente)}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      product.isActive
                        ? "bg-[#04A154]/10 text-[#04A154]"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.isActive ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-[#019CC8] hover:underline text-sm">
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
