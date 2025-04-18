import { useState, useEffect } from "react";
import LSidebar from "./LSidebar";
import { FileEdit, Check, X } from "lucide-react";

function LGrade() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [currentGrade, setCurrentGrade] = useState("");
  const [remarks, setRemarks] = useState("");
  const [submitStatus, setSubmitStatus] = useState({ message: "", type: "" });

  // Fetch grades data
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://intrasysmiso.onrender.com/grades",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch grades data");
        }

        const data = await response.json();
        setGrades(data);
      } catch (err) {
        console.error("Error fetching grades:", err);
        setError("Failed to load grades data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  const handleEdit = (grade) => {
    setEditingId(grade._id);
    setCurrentGrade(grade.status || "");
    setRemarks(grade.remarks || "");
  };

  const handleCancel = () => {
    setEditingId(null);
    setCurrentGrade("");
    setRemarks("");
  };

  const handleSubmit = async (id) => {
    try {
      setSubmitStatus({ message: "Submitting...", type: "info" });
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://intrasysmiso.onrender.com/grades/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: currentGrade,
            remarks: remarks,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update grade");
      }

      const updatedGrade = await response.json();

      // Update the grades list
      setGrades(
        grades.map((grade) =>
          grade._id === id
            ? { ...grade, status: currentGrade, remarks: remarks }
            : grade
        )
      );

      setEditingId(null);
      setSubmitStatus({
        message: "Grade updated successfully!",
        type: "success",
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus({ message: "", type: "" });
      }, 3000);
    } catch (err) {
      console.error("Error updating grade:", err);
      setSubmitStatus({
        message: "Failed to update grade. Please try again.",
        type: "error",
      });
    }
  };

  const gradeOptions = ["A", "B", "C", "D", "E", "F", "IP"];

  return (
    <div className="flex h-screen bg-black text-white">
      <LSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Student Grades</h1>

          {submitStatus.message && (
            <div
              className={`mb-4 p-3 rounded ${
                submitStatus.type === "success"
                  ? "bg-green-900/50 text-green-200"
                  : submitStatus.type === "error"
                  ? "bg-red-900/50 text-red-200"
                  : "bg-blue-900/50 text-blue-200"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14ae5c]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/30 text-red-200 p-4 rounded-md">
              {error}
            </div>
          ) : grades.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No grades data available.
            </div>
          ) : (
            <div className="bg-[#111] rounded-xl overflow-hidden shadow-xl">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-black/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Remarks
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {grades.map((grade) => (
                    <tr key={grade._id} className="hover:bg-black/20">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{grade.student.name}</div>
                        <div className="text-xs text-gray-400">
                          {grade.student.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{grade.course.name}</div>
                        <div className="text-xs text-gray-400">
                          {grade.course.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === grade._id ? (
                          <select
                            value={currentGrade}
                            onChange={(e) => setCurrentGrade(e.target.value)}
                            className="bg-[#222] border border-gray-700 rounded px-3 py-1 w-full"
                          >
                            <option value="">Select Grade</option>
                            {gradeOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span
                            className={`px-2 py-1 rounded text-sm font-medium 
                            ${
                              grade.status === "A"
                                ? "bg-green-900/30 text-green-200"
                                : ""
                            }
                            ${
                              grade.status === "B"
                                ? "bg-blue-900/30 text-blue-200"
                                : ""
                            }
                            ${
                              grade.status === "C"
                                ? "bg-yellow-900/30 text-yellow-200"
                                : ""
                            }
                            ${
                              grade.status === "D"
                                ? "bg-orange-900/30 text-orange-200"
                                : ""
                            }
                            ${
                              grade.status === "E" || grade.status === "F"
                                ? "bg-red-900/30 text-red-200"
                                : ""
                            }
                            ${
                              grade.status === "IP"
                                ? "bg-purple-900/30 text-purple-200"
                                : ""
                            }
                            ${
                              !grade.status
                                ? "bg-gray-900/30 text-gray-200"
                                : ""
                            }
                          `}
                          >
                            {grade.status || "Not Graded"}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === grade._id ? (
                          <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            className="bg-[#222] border border-gray-700 rounded px-3 py-1 w-full h-20 resize-none"
                            placeholder="Add remarks"
                          />
                        ) : (
                          <div className="text-sm text-gray-300 max-w-xs truncate">
                            {grade.remarks || "No remarks"}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {grade.gradedAt
                          ? new Date(grade.gradedAt).toLocaleDateString() +
                            " " +
                            new Date(grade.gradedAt).toLocaleTimeString()
                          : "Never"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingId === grade._id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSubmit(grade._id)}
                              className="text-green-400 hover:text-green-300"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEdit(grade)}
                            className="text-[#14ae5c] hover:text-[#0c8043]"
                          >
                            <FileEdit size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LGrade;
