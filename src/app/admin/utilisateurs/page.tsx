"use client";

import { mockUsers } from "@/data/mockData";
import { useState } from "react";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const roleLabels = {
    dg_veterinaire: "DG Vétérinaire",
    veterinaire: "Vétérinaire",
    assistant_technique: "Assistant Technique",
    accueil_stock: "Accueil & Stock",
    confrere_refere: "Confrère Référé",
  };

  const roleColors = {
    dg_veterinaire: "bg-purple-100 text-purple-600",
    veterinaire: "bg-[#04A154]/10 text-[#04A154]",
    assistant_technique: "bg-[#019CC8]/10 text-[#019CC8]",
    accueil_stock: "bg-orange-100 text-orange-600",
    confrere_refere: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark dark:text-white">
            Utilisateurs & Rôles
          </h1>
          <p className="text-sm text-gray-5 dark:text-gray-6">
            Gestion des comptes utilisateurs et permissions
          </p>
        </div>
        <button className="rounded-lg bg-[#04A154] px-4 py-2 text-white hover:bg-[#038343]">
          + Nouvel Utilisateur
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-[#04A154] dark:border-stroke-dark dark:bg-gray-dark dark:text-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterRole("all")}
            className={`rounded-lg px-3 py-2 text-sm ${
              filterRole === "all"
                ? "bg-[#04A154] text-white"
                : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
            }`}
          >
            Tous
          </button>
          {Object.entries(roleLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilterRole(key)}
              className={`rounded-lg px-3 py-2 text-sm ${
                filterRole === key
                  ? "bg-[#04A154] text-white"
                  : "bg-white text-dark hover:bg-gray-2 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-stroke bg-white shadow-card dark:border-stroke-dark dark:bg-gray-dark overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-2 dark:bg-dark-2">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Établissement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-5 uppercase">
                Dernière connexion
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
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-2 dark:hover:bg-dark-2">
                <td className="px-6 py-4">
                  <p className="font-medium text-dark dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-5">{user.id}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-5">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      roleColors[user.role as keyof typeof roleColors]
                    }`}
                  >
                    {roleLabels[user.role as keyof typeof roleLabels]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-5">
                  {user.establishment}
                </td>
                <td className="px-6 py-4 text-sm text-gray-5">
                  {new Date(user.lastLogin).toLocaleString("fr-FR")}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      user.isActive
                        ? "bg-[#04A154]/10 text-[#04A154]"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.isActive ? "Actif" : "Inactif"}
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

      {filteredUsers.length === 0 && (
        <div className="rounded-xl border border-stroke bg-white p-12 text-center dark:border-stroke-dark dark:bg-gray-dark">
          <p className="text-lg text-gray-5">Aucun utilisateur trouvé</p>
        </div>
      )}
    </div>
  );
}
