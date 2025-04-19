import { useState, useEffect } from "react";
import LSidebar from "./LSidebar";
import { FileEdit, Check, X, PlusCircle } from "lucide-react";

function LGrade() {
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [currentGrade, setCurrentGrade] = useState("");
  const [remarks, setRemarks] = useState("");
  const [students, setStudents] = useState([]);

  const [newGrade, setNewGrade] = useState({
    studentId: "",
    courseId: "",
    status: "",
    remarks: "",
  });

  const [submitStatus, setSubmitStatus] = useState({ message: "", type: "" });

  const gradeOptions = ["A", "B", "C", "D", "E", "F", "IP"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [gradesRes, coursesRes, studentsRes] = await Promise.all([
          fetch("https://intrasysmiso.onrender.com/grades", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://intrasysmiso.onrender.com/courses", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://intrasysmiso.onrender.com/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!gradesRes.ok || !coursesRes.ok || !studentsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const gradesData = await gradesRes.json();
        const coursesData = await coursesRes.json();
        const studentsData = await studentsRes.json();

        setGrades(gradesData);
        setCourses(coursesData.data);
        setStudents(studentsData);
      } catch (err) {
        console.error(err);
        setError("Failed to load data. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Students:", students);

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
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://intrasysmiso.onrender.com/grades/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: currentGrade, remarks }),
        }
      );

      if (!res.ok) throw new Error("Failed to update grade");

      setGrades((prev) =>
        prev.map((g) =>
          g._id === id ? { ...g, status: currentGrade, remarks } : g
        )
      );
      setSubmitStatus({
        message: "Grade updated successfully!",
        type: "success",
      });
      setEditingId(null);
      setTimeout(() => setSubmitStatus({ message: "", type: "" }), 3000);
    } catch (err) {
      setSubmitStatus({ message: "Update failed.", type: "error" });
    }
  };

  const handleAddGrade = async () => {
    if (!newGrade.studentId || !newGrade.courseId || !newGrade.status) {
      setSubmitStatus({ message: "Fill all required fields.", type: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://intrasysmiso.onrender.com/grades/assign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            student: newGrade.studentId,
            course: newGrade.courseId,
            status: newGrade.status,
            remarks: newGrade.remarks,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to add grade");

      const added = await res.json();
      setGrades([...grades, added]);
      setNewGrade({ studentName: "", courseId: "", status: "", remarks: "" });
      setSubmitStatus({ message: "Grade added!", type: "success" });
      setTimeout(() => setSubmitStatus({ message: "", type: "" }), 3000);
    } catch (err) {
      setSubmitStatus({ message: "Add failed.", type: "error" });
    }
  };

  return (
    <div className="flex h-screen bg-black text-white select-none">
      <LSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Grades Management</h1>

          {submitStatus.message && (
            <div
              className={`mb-4 p-3 rounded ${
                submitStatus.type === "success"
                  ? "bg-green-900/50 text-green-200"
                  : "bg-red-900/50 text-red-200"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <div className="bg-[#111] p-6 rounded-xl mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <PlusCircle size={20} /> Add Grade
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <input
                type="text"
                placeholder="Student Name"
                className="bg-[#222] border border-gray-700 rounded px-3 py-2 w-full"
                value={newGrade.studentName}
                onChange={(e) =>
                  setNewGrade({ ...newGrade, studentName: e.target.value })
                }
              /> */}
              <select
                value={newGrade.studentId}
                onChange={(e) =>
                  setNewGrade({ ...newGrade, studentId: e.target.value })
                }
                className="bg-[#222] border border-gray-700 rounded px-3 py-2 w-full"
              >
                <option value="">Select Student</option>
                {students.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                value={newGrade.courseId}
                onChange={(e) =>
                  setNewGrade({ ...newGrade, courseId: e.target.value })
                }
                className="bg-[#222] border border-gray-700 rounded px-3 py-2 w-full"
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} ({c.category})
                  </option>
                ))}
              </select>
              <select
                value={newGrade.status}
                onChange={(e) =>
                  setNewGrade({ ...newGrade, status: e.target.value })
                }
                className="bg-[#222] border border-gray-700 rounded px-3 py-2 w-full"
              >
                <option value="">Select Grade</option>
                {gradeOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Remarks (optional)"
                className="bg-[#222] border border-gray-700 rounded px-3 py-2 w-full resize-none"
                value={newGrade.remarks}
                onChange={(e) =>
                  setNewGrade({ ...newGrade, remarks: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleAddGrade}
              className="mt-4 bg-[#14ae5c] hover:bg-[#0c8043] text-white px-4 py-2 rounded"
            >
              Add Grade
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading...</div>
          ) : error ? (
            <div className="bg-red-800/30 p-4 rounded">{error}</div>
          ) : grades.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No grades available.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#111] rounded-xl overflow-hidden">
                <thead className="bg-black/30 text-left text-gray-400 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Grade</th>
                    <th className="px-4 py-3">Remarks</th>
                    <th className="px-4 py-3">Updated</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {grades.map((g) => (
                    <tr key={g._id} className="hover:bg-black/20">
                      <td className="px-4 py-3">
                        {g.student?.name || newGrade.studentName}
                      </td>
                      <td className="px-4 py-3">{g.course?.name || "N/A"}</td>
                      <td className="px-4 py-3">
                        {editingId === g._id ? (
                          <select
                            value={currentGrade}
                            onChange={(e) => setCurrentGrade(e.target.value)}
                            className="bg-[#222] border border-gray-700 rounded px-2 py-1"
                          >
                            <option value="">Select Grade</option>
                            {gradeOptions.map((g) => (
                              <option key={g} value={g}>
                                {g}
                              </option>
                            ))}
                          </select>
                        ) : (
                          g.status || "Not Graded"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {editingId === g._id ? (
                          <input
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            className="bg-[#222] border border-gray-700 rounded px-2 py-1 w-full"
                          />
                        ) : (
                          g.remarks || "-"
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">
                        {g.gradedAt
                          ? new Date(g.gradedAt).toLocaleString()
                          : "Never"}
                      </td>
                      <td className="px-4 py-3">
                        {editingId === g._id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSubmit(g._id)}
                              className="text-green-400"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="text-red-400"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEdit(g)}
                            className="text-[#14ae5c]"
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
