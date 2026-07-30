"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, Check } from "lucide-react";
import { DatePicker } from "@/components/shared/date-picker";

export type DateFilterPreset = "all" | "this_month" | "last_30" | "this_year" | "custom";

interface DashboardDateFilterProps {
  preset: DateFilterPreset;
  customDate?: string;
  onFilterChange: (preset: DateFilterPreset, customDate?: string) => void;
}

export function DashboardDateFilter({
  preset,
  customDate,
  onFilterChange,
}: DashboardDateFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const presets: { id: DateFilterPreset; label: string }[] = [
    { id: "all", label: "Toutes les dates" },
    { id: "this_month", label: "Ce mois-ci" },
    { id: "last_30", label: "30 derniers jours" },
    { id: "this_year", label: "Année 2026" },
    { id: "custom", label: "Date précise / Personnalisé" },
  ];

  const getLabel = () => {
    if (preset === "custom" && customDate) {
      return `Date: ${customDate}`;
    }
    const found = presets.find((p) => p.id === preset);
    return found ? found.label : "Toutes les dates";
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-extrabold text-xs shadow-xs hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-all flex items-center gap-2 cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span>{getLabel()}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 w-64 p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl space-y-2 animate-in fade-in zoom-in-95 duration-150">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 px-2 py-1">
            Filtrer par période
          </div>

          <div className="space-y-1">
            {presets.map((p) => {
              const isSelected = preset === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    if (p.id !== "custom") {
                      onFilterChange(p.id);
                      setIsOpen(false);
                    } else {
                      onFilterChange("custom", customDate || new Date().toISOString().split("T")[0]);
                    }
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                    isSelected
                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span>{p.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
              );
            })}
          </div>

          {preset === "custom" && (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <DatePicker
                label="Sélectionner une date *"
                value={customDate || new Date().toISOString().split("T")[0]}
                onChange={(newDate) => {
                  onFilterChange("custom", newDate);
                  setIsOpen(false);
                }}
                labelColor="text-blue-600"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
