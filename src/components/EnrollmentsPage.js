// EnrollmentsPage.js
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import clsx from "clsx";
import Sidebar from "./Sidebar";

function EnrollmentsPage() {
  const courses = [
    {
      id: 1,
      code: "CSC490",
      name: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
      section: "141",
      instructor: "Aj Sumana_ks",
      room: "Room: 5-335",
      time: "Monday\n09:00-11:50",
    },
    {
      id: 2,
      code: "CSC490",
      name: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
      section: "141",
      instructor: "Aj Sumana_ks",
      room: "Room: 5-335",
      time: "Monday\n09:00-11:50",
    },
    {
      id: 3,
      code: "CSC490",
      name: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
      section: "141",
      instructor: "Aj Sumana_ks",
      room: "Room: 5-335",
      time: "Monday\n09:00-11:50",
    },
    {
      id: 4,
      code: "CSC490",
      name: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
      section: "141",
      instructor: "Aj Sumana_ks",
      room: "Room: 5-335",
      time: "Monday\n09:00-11:50",
    },
    {
      id: 5,
      code: "CSC490",
      name: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
      section: "141",
      instructor: "Aj Sumana_ks",
      room: "Room: 5-335",
      time: "Monday\n09:00-11:50",
    },
    {
      id: 6,
      code: "CSC490",
      name: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
      section: "141",
      instructor: "Aj Sumana_ks",
      room: "Room: 5-335",
      time: "Monday\n09:00-11:50",
    },
    {
      id: 7,
      code: "CSC490",
      name: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
      section: "141",
      instructor: "Aj Sumana_ks",
      room: "Room: 5-335",
      time: "Monday\n09:00-11:50",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [courseList, setCourseList] = useState(courses);

  const handleDelete = (courseId) => {
    setCourseList(courseList.filter((course) => course.id !== courseId));
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="max-w-[1234px] mx-auto py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Enrollments</h1>
            <p className="text-gray-400 text-sm">Summer Semester 2025</p>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Course"
              className="bg-[#2D2D2D] pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-[#2D2D2D] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                Registration Status:
              </span>
              <span className="text-xs">[Open / Closed]</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Deadline:</span>
              <span className="text-xs">MM/DD/YYYY</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1E472A] text-left text-sm">
                  <th className="py-2 px-4 font-medium">Option</th>
                  <th className="py-2 px-4 font-medium">Course</th>
                  <th className="py-2 px-4 font-medium">Session</th>
                  <th className="py-2 px-4 font-medium">Instructor</th>
                  <th className="py-2 px-4 font-medium">Room</th>
                  <th className="py-2 px-4 font-medium">Time Table</th>
                  <th className="py-2 px-4 font-medium">Cancel</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {courseList.map((course) => (
                  <tr
                    key={course.id}
                    className={clsx(
                      "border-b border-gray-700",
                      course.id % 2 === 0 ? "bg-[#363636]" : "bg-[#2D2D2D]"
                    )}
                  >
                    <td className="py-3 px-4">{course.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-medium">{course.code}:</span>
                        <span className="ml-1">{course.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{course.section}</td>
                    <td className="py-3 px-4">{course.instructor}</td>
                    <td className="py-3 px-4">{course.room}</td>
                    <td className="py-3 px-4 whitespace-pre">{course.time}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex justify-end bg-[#2D2D2D]">
            <button className="bg-[#4A4A4A] hover:bg-[#5A5A5A] text-white px-6 py-1.5 rounded text-sm transition-colors">
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentsPage;
