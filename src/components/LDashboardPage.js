"use client";

import LSidebar from "./LSidebar"; // Importing the Sidebar component
import { ChevronLeft, ChevronRight } from "lucide-react"; // Importing icons from lucide-react
function LDashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white flex select-none">
      <LSidebar /> {/* Sidebar component for navigation */}
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notifications Card */}
            <div className="bg-[#111] rounded-lg overflow-hidden">
              <div className="bg-white rounded-lg m-4">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-[#3b4cb8] text-xl font-semibold">
                    Notifications
                  </h2>
                </div>

                <div className="divide-y divide-gray-100">
                  {/* Notification 1 */}
                  <div className="p-4">
                    <div className="flex justify-between mb-1">
                      <h3 className="text-[#f06292] font-medium">
                        General Alert
                      </h3>
                      <span className="text-gray-500 text-sm">1:30 PM</span>
                    </div>
                    <p className="text-gray-700">
                      Webtest #5 is now unlocked. Please visit the
                      <span className="text-[#3b4cb8] font-medium">
                        {" "}
                        Resources{" "}
                      </span>
                      section to view it.
                    </p>
                  </div>

                  {/* Notification 2 */}
                  <div className="p-4">
                    <div className="flex justify-between mb-1">
                      <h3 className="text-[#f06292] font-medium">
                        General Alert
                      </h3>
                      <span className="text-gray-500 text-sm">4/16/19</span>
                    </div>
                    <p className="text-gray-700">
                      Congratulations,{" "}
                      <span className="font-medium">
                        you've now reached the top 20%
                      </span>{" "}
                      of your grade!
                    </p>
                  </div>

                  {/* Notification 3 */}
                  <div className="p-4">
                    <div className="flex justify-between mb-1">
                      <h3 className="text-[#f06292] font-medium">
                        Sergeant van Antwerp:
                      </h3>
                      <span className="text-gray-500 text-sm">4/2/19</span>
                    </div>
                    <p className="text-gray-700">
                      Please revise{" "}
                      <span className="font-medium">Assignment #13</span>. Upon
                      further review I have realized the data you've provided is
                      inconclu...
                    </p>
                  </div>

                  {/* Notification 4 */}
                  <div className="p-4">
                    <div className="flex justify-between mb-1">
                      <h3 className="text-[#f06292] font-medium">
                        General Alert
                      </h3>
                      <span className="text-gray-500 text-sm">3/26/19</span>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">
                        Semester 1 has been archived.
                      </span>{" "}
                      You can find previous Semester 1 coursework in the{" "}
                      <span className="text-[#3b4cb8] font-medium">
                        Calendar
                      </span>{" "}
                      section.
                    </p>
                  </div>

                  <div className="p-4">
                    <button className="w-full bg-[#ffc107] text-gray-800 py-3 rounded-md font-medium hover:bg-[#ffb300] transition-colors">
                      View Older Notifications
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Card */}
            <div className="bg-[#111] rounded-lg overflow-hidden">
              <div className="bg-white rounded-lg m-4">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <button className="text-gray-500">
                      <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-gray-800 font-medium">July 2014</h2>
                    <button className="text-gray-500">
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {/* Days of week */}
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center text-sm text-gray-500 py-1"
                        >
                          {day}
                        </div>
                      )
                    )}

                    {/* Calendar days */}
                    {[
                      { day: 1, highlight: true, event: true },
                      { day: 2, highlight: false, event: false },
                      { day: 3, highlight: false, event: false },
                      { day: 4, highlight: false, event: false },
                      { day: 5, highlight: false, event: false },
                      { day: 6, highlight: true, event: false },
                      { day: 7, highlight: false, event: false },
                      { day: 8, highlight: true, event: true },
                      { day: 9, highlight: false, event: false },
                      { day: 10, highlight: false, event: false },
                      { day: 11, highlight: false, event: false },
                      { day: 12, highlight: false, event: false },
                      { day: 13, highlight: false, event: false },
                      { day: 14, highlight: false, event: false },
                      { day: 15, highlight: false, event: false },
                      { day: 16, highlight: false, event: false },
                      { day: 17, highlight: false, event: false },
                      { day: 18, highlight: false, event: false },
                      { day: 19, highlight: false, event: false },
                      { day: 20, highlight: false, event: false },
                      { day: 21, highlight: true, event: true },
                      { day: 22, highlight: false, event: false },
                      { day: 23, highlight: false, event: false },
                      { day: 24, highlight: false, event: false },
                      { day: 25, highlight: false, event: false },
                      { day: 26, highlight: true, event: true },
                      { day: 27, highlight: false, event: false },
                      { day: 28, highlight: false, event: false },
                      { day: 29, highlight: false, event: false },
                      { day: 30, highlight: false, event: false },
                      { day: 31, highlight: false, event: false },
                    ].map(({ day, highlight, event }) => (
                      <div
                        key={day}
                        className={`text-center text-gray-300 py-1 ${
                          highlight ? "bg-[#fff9c4]" : ""
                        } ${event ? "relative" : ""}`}
                      >
                        {day}
                        {event && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ff9800]"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Degree Progress Card */}
            <div className="bg-[#111] rounded-lg overflow-hidden">
              <div className="bg-white rounded-lg m-4">
                <div className="p-4">
                  <h2 className="text-[#3b4cb8] text-xl font-semibold mb-4">
                    Degree Progress
                  </h2>

                  <div className="h-48 relative mb-4">
                    {/* This would be a real chart in a production app */}
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-dashed border-[#ffc107]"></div>
                    </div>
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 300 100"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,80 L30,70 L60,50 L90,60 L120,40 L150,20 L180,40 L210,30 L240,10 L270,5 L300,0"
                        fill="none"
                        stroke="#3b4cb8"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>

                  <p className="text-center text-gray-700">
                    You are on track to graduate in{" "}
                    <span className="font-semibold text-[#3b4cb8]">
                      May, 2021
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Overall Student Progress Card */}
            <div className="bg-[#111] rounded-lg overflow-hidden">
              <div className="bg-white rounded-lg m-4">
                <div className="p-4">
                  <h2 className="text-[#3b4cb8] text-xl font-semibold mb-4">
                    Overall Student Progress
                  </h2>

                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Classes Progress */}
                    <div className="flex-1 flex items-start space-x-4">
                      <div className="relative w-24 h-24">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="#e9ecef"
                            strokeWidth="2"
                          ></circle>
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="#ffc107"
                            strokeWidth="2"
                            strokeDasharray="100"
                            strokeDashoffset="14"
                            transform="rotate(-90 18 18)"
                          ></circle>
                          <text
                            x="18"
                            y="18"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="6"
                            fill="#3b4cb8"
                            fontWeight="bold"
                          >
                            Classes
                          </text>
                          <text
                            x="18"
                            y="24"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="8"
                            fill="#3b4cb8"
                            fontWeight="bold"
                          >
                            86%
                          </text>
                        </svg>
                      </div>

                      <div className="flex-1">
                        <p className="text-gray-700 mb-2">
                          You've completed 86% of your classes' overall assigned
                          coursework.
                        </p>
                        <p className="text-gray-700">
                          You can view your coursework summary in the Calendar.
                        </p>
                      </div>
                    </div>

                    {/* Top 20% Progress */}
                    <div className="flex-1 flex items-start space-x-4">
                      <div className="relative w-24 h-24">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="#e9ecef"
                            strokeWidth="2"
                          ></circle>
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="#ffc107"
                            strokeWidth="2"
                            strokeDasharray="100"
                            strokeDashoffset="80"
                            transform="rotate(-90 18 18)"
                          ></circle>
                          <text
                            x="18"
                            y="18"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="6"
                            fill="#3b4cb8"
                            fontWeight="bold"
                          >
                            Top
                          </text>
                          <text
                            x="18"
                            y="24"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="8"
                            fill="#3b4cb8"
                            fontWeight="bold"
                          >
                            20%
                          </text>
                        </svg>
                      </div>

                      <div className="flex-1">
                        <p className="text-gray-700 mb-2">
                          Your student performance has been calculated.
                        </p>
                        <p className="text-gray-700">
                          You're estimated to be in the top [20%] of your peers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LDashboardPage;
