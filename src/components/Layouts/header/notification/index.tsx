"use client";

import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { BellIcon } from "./icons";

const notificationList = [
  {
    type: "urgent",
    title: "Alerte Stock",
    subTitle: "Amoxicilline 500mg - Stock faible (25 cp)",
    time: "Il y a 5 min",
    color: "orange",
  },
  {
    type: "appointment",
    title: "Nouveau rendez-vous",
    subTitle: "Rex - Vaccination annuelle à 09:00",
    time: "Il y a 15 min",
    color: "blue",
  },
  {
    type: "hospitalization",
    title: "Plan de soins",
    subTitle: "Box A1 - Rex - Administration antidouleur",
    time: "Il y a 30 min",
    color: "purple",
  },
  {
    type: "payment",
    title: "Paiement reçu",
    subTitle: "Kouassi Jean-Pierre - 15 000 XOF",
    time: "Il y a 1h",
    color: "green",
  },
  {
    type: "expiry",
    title: "Péremption proche",
    subTitle: "Lot AMX20240801 expire dans 10 jours",
    time: "Il y a 2h",
    color: "red",
  },
];

export function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDotVisible, setIsDotVisible] = useState(true);
  const isMobile = useIsMobile();

  const typeIcons = {
    urgent: "⚠️",
    appointment: "📅",
    hospitalization: "🏥",
    payment: "💰",
    expiry: "📅",
  };

  const typeColors = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-[#019CC8]/10 text-[#019CC8]",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-[#04A154]/10 text-[#04A154]",
    red: "bg-red-100 text-red-600",
  };

  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={(open) => {
        setIsOpen(open);

        if (setIsDotVisible) setIsDotVisible(false);
      }}
    >
      <DropdownTrigger
        className="grid size-12 place-items-center rounded-full border bg-gray-2 text-dark outline-none hover:text-[#04A154] focus-visible:border-[#04A154] focus-visible:text-[#04A154] dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus-visible:border-[#04A154]"
        aria-label="View Notifications"
      >
        <span className="relative">
          <BellIcon />

          {isDotVisible && (
            <span
              className={cn(
                "absolute right-0 top-0 z-1 size-2 rounded-full bg-red-500 ring-2 ring-gray-2 dark:ring-dark-3",
              )}
            >
              <span className="absolute inset-0 -z-1 animate-ping rounded-full bg-red-500 opacity-75" />
            </span>
          )}
        </span>
      </DropdownTrigger>

      <DropdownContent
        align={isMobile ? "end" : "center"}
        className="border border-stroke bg-white px-3.5 py-3 shadow-md dark:border-dark-3 dark:bg-gray-dark min-[350px]:min-w-[20rem]"
      >
        <div className="mb-1 flex items-center justify-between px-2 py-1.5">
          <span className="text-lg font-medium text-dark dark:text-white">
            Notifications
          </span>
          <span className="rounded-md bg-[#04A154] px-[9px] py-0.5 text-xs font-medium text-white">
            5 nouvelles
          </span>
        </div>

        <ul className="mb-3 max-h-[23rem] space-y-1.5 overflow-y-auto">
          {notificationList.map((item, index) => (
            <li key={index} role="menuitem">
              <Link
                href="#"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 rounded-lg px-2 py-1.5 outline-none hover:bg-gray-2 focus-visible:bg-gray-2 dark:hover:bg-dark-3 dark:focus-visible:bg-dark-3"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-gray-2 text-2xl">
                  {typeIcons[item.type as keyof typeof typeIcons]}
                </div>

                <div className="flex-1">
                  <strong className="block text-sm font-medium text-dark dark:text-white">
                    {item.title}
                  </strong>

                  <span className="truncate text-sm text-gray-5 dark:text-gray-6">
                    {item.subTitle}
                  </span>
                  <span className="block text-xs text-gray-5 mt-1">
                    {item.time}
                  </span>
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    typeColors[item.color as keyof typeof typeColors]
                  }`}
                >
                  {item.type}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#"
          onClick={() => setIsOpen(false)}
          className="block rounded-lg border border-[#04A154] p-2 text-center text-sm font-medium tracking-wide text-[#04A154] outline-none transition-colors hover:bg-[#04A154]/10 focus:bg-[#04A154]/10 focus:text-[#04A154] focus-visible:border-[#04A154] dark:border-dark-3 dark:text-dark-6 dark:hover:border-dark-5 dark:hover:bg-dark-3 dark:hover:text-dark-7 dark:focus-visible:border-dark-5 dark:focus-visible:bg-dark-3 dark:focus-visible:text-dark-7"
        >
          Voir toutes les notifications
        </Link>
      </DropdownContent>
    </Dropdown>
  );
}
