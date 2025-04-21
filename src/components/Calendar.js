"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const getStartDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const startDay = getStartDayOfMonth(currentYear, currentMonth);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="bg-[#aff4c6] rounded-lg p-6 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-black font-semibold text-lg">
          {monthNames[currentMonth]} {currentYear}
        </div>
        <div className="flex gap-2">
          <button className="text-[#007aff]" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="text-[#007aff]" onClick={handleNextMonth}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs text-[#636366]">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty boxes for days before the first of the month */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => {
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <div
              key={day}
              className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer ${
                isToday ? "bg-[#007aff] text-white font-semibold" : "text-black"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Placeholder Event Section */}
      <div className="mt-6 pt-4 border-t border-black/10 flex justify-between">
        <div className="text-black font-medium">Ends</div>
        <div className="text-black font-medium">8:00 AM</div>
      </div>
    </div>
  );
}

export default Calendar;
