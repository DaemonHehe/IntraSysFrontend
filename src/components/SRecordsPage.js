import React, { useState, useEffect } from "react";
import SSidebar from "./SSidebar";
import axios from "axios";

function SRecordsPage() {
  const [expandedTerm, setExpandedTerm] = useState("Summer / 2025");
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await axios.get("https://intrasysmiso.onrender.com/grades");
        const johnsGrades = res.data.filter(
          (g) => g.student?.email === "john@gmail.com" && g.course !== null
        );
        setGrades(johnsGrades);
      } catch (err) {
        console.error("Failed to fetch grades", err);
      }
    };

    fetchGrades();
  }, []);

  const terms = [
    {
      name: "Term 1/ 2025",
      grade: "A",
      gpa: "4.5",
      courses: [
        {
          code: "CSC401",
          name: "COMPUTER ARCHITECTURE",
          credit: 3,
          grade: "A",
        },
        { code: "CSC433", name: "MACHINE LEARNING", credit: 3, grade: "A-" },
        { code: "CSC450", name: "DATABASE SYSTEMS", credit: 4, grade: "A+" },
      ],
    },
    {
      name: "Term 2/ 2025",
      grade: "C",
      gpa: "3.47",
      courses: [
        { code: "CSC410", name: "OPERATING SYSTEMS", credit: 4, grade: "B-" },
        {
          code: "CSC460",
          name: "SOFTWARE ENGINEERING",
          credit: 3,
          grade: "C",
        },
        { code: "CSC455", name: "COMPUTER NETWORKS", credit: 3, grade: "C" },
      ],
    },
    {
      name: "Summer / 2025",
      grade: "B",
      gpa: "3.47",
      courses: [
        {
          code: "CSC490",
          name: "INFORMATION SYSTEM ANALYSIS AND DESIGN",
          credit: 3,
          grade: "B",
        },
      ],
    },
  ];

  const toggleTerm = (termName) => {
    setExpandedTerm(expandedTerm === termName ? "" : termName);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white select-none">
      <SSidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Academic Records</h1>
            <div className="text-sm">Overall GPA: 4.0</div>
          </div>

          <div className="bg-gray-800 rounded overflow-hidden">
            {terms.map((term) => (
              <div key={term.name} className="mb-px">
                <div
                  className={`flex justify-between items-center p-2 cursor-pointer ${
                    term.name === expandedTerm
                      ? "bg-gray-700"
                      : "bg-green-700 hover:bg-green-600"
                  }`}
                  onClick={() => toggleTerm(term.name)}
                >
                  <div className="flex items-center">
                    <span className="mr-2">
                      {term.name === expandedTerm ? "▼" : "▶"}
                    </span>
                    <span>{term.name}</span>
                  </div>
                  <div className="flex w-3/5 justify-between">
                    <div className="mr-8">Overall Grade: {term.grade}</div>
                    <div className="w-48 text-right">
                      GPA for this term: {term.gpa}
                    </div>
                  </div>
                </div>

                {term.name === expandedTerm && (
                  <div className="bg-gray-700">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-600">
                          <th className="p-2 text-left">Course</th>
                          <th className="p-2 w-24 text-center">Credit</th>
                          <th className="p-2 w-24 text-center">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {term.courses.map((course, index) => (
                          <tr key={index} className="border-t border-gray-600">
                            <td className="p-2">
                              {course.code}: {course.name}
                            </td>
                            <td className="p-2 text-center">{course.credit}</td>
                            <td className="p-2 text-center">{course.grade}</td>
                          </tr>
                        ))}
                        {/* 🔽 Add real data from API */}
                        {grades.map((g, idx) => (
                          <tr
                            key={`real-${idx}`}
                            className="border-t border-gray-600"
                          >
                            <td className="p-2">
                              {g.course.name} ({g.course.category})
                            </td>
                            <td className="p-2 text-center">-</td>
                            <td className="p-2 text-center">{g.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SRecordsPage;
