"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Calendar() {
  const [selectedDay, setSelectedDay] = useState(26);

  // Days of the week
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Days in June 2024
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="bg-[#aff4c6] rounded-lg p-6 w-full">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-black font-semibold text-lg">June 2024</h2>
          <ChevronRight className="h-5 w-5 text-black ml-1" />
        </div>
        <div className="flex gap-2">
          <button className="text-[#007aff]">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="text-[#007aff]">
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
        {days.map((day) => (
          <button
            key={day}
            className={`h-10 w-10 flex items-center justify-center rounded-full text-black ${
              day === selectedDay ? "bg-[#007aff] text-white" : ""
            } ${day === 10 ? "text-[#007aff]" : ""}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Event Details */}
      <div className="mt-6 pt-4 border-t border-black/10 flex justify-between">
        <div className="text-black font-medium">Ends</div>
        <div className="text-black font-medium">8:00 AM</div>
      </div>
    </div>
  );
}

export default Calendar;
