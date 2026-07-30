"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface DatePickerProps {
  label: string;
  value: string; // "YYYY-MM-DD"
  onChange: (newValue: string) => void;
  labelColor?: string;
}

export function DatePicker({
  label,
  value,
  onChange,
  labelColor = "text-gray-500",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Parse current YYYY-MM-DD
  const currentDate = value ? new Date(value) : new Date();
  const [viewYear, setViewYear] = useState(currentDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(currentDate.getMonth()); // 0-11

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const monthNamesFR = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const daysOfWeekFR = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

  // Helper for calendar grid
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert Sun=0 to Mon=0
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    const formattedDateStr = `${viewYear}-${mm}-${dd}`;
    onChange(formattedDateStr);
    setIsOpen(false);
  };

  // Selected date comparison
  const selectedDay = currentDate.getDate();
  const selectedMonth = currentDate.getMonth();
  const selectedYear = currentDate.getFullYear();

  return (
    <div className="relative" ref={popoverRef}>
      <label className={`absolute -top-2.5 left-3 bg-white dark:bg-gray-900 px-1 text-[10px] font-bold ${labelColor} z-10`}>
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-500 transition-all text-left shadow-xs group"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <CalendarIcon className="w-4 h-4 text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-gray-900 dark:text-white">
            {formatDate(value)}
          </span>
        </div>
        <span className="text-[10px] text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
          {value}
        </span>
      </button>

      {/* Floating Popover Calendar Modal */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-72 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-150">
          {/* Header Month / Year Navigation */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-black text-gray-900 dark:text-white">
              {monthNamesFR[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 text-center gap-1 text-[10px] font-extrabold text-gray-400">
            {daysOfWeekFR.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 text-center gap-1 text-xs">
            {/* Empty slots for first day offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Days in month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isSelected =
                dayNum === selectedDay &&
                viewMonth === selectedMonth &&
                viewYear === selectedYear;
              const isToday =
                dayNum === new Date().getDate() &&
                viewMonth === new Date().getMonth() &&
                viewYear === new Date().getFullYear();

              return (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() => handleSelectDay(dayNum)}
                  className={`h-8 w-8 rounded-xl font-bold flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
                      : isToday
                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-200 dark:border-blue-800"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Quick Select Today Footer */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px]">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const mm = String(today.getMonth() + 1).padStart(2, "0");
                const dd = String(today.getDate()).padStart(2, "0");
                onChange(`${today.getFullYear()}-${mm}-${dd}`);
                setIsOpen(false);
              }}
              className="text-blue-600 dark:text-blue-400 font-extrabold hover:underline"
            >
              Aujourd&apos;hui
            </button>
            <span className="text-gray-400">Cliquez pour valider</span>
          </div>
        </div>
      )}
    </div>
  );
}
