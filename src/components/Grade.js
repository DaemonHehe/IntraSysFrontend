import React, { useState, useEffect } from "react";
import { Search, Save, Edit2, Check, Plus, Trash2 } from "lucide-react";

const API_URL = "https://intrasysmiso.onrender.com";

function GradingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingGrade, setEditingGrade] = useState("");
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    studentId: "",
    courseCode: "",
    grade: "A",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  console.log(`students: ${students}`);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/grades/`);
      const data = await response.json();
      const formattedGrades = data.map((grade) => ({
        id: grade._id,
        studentId: grade.student._id,
        courseCode: grade.course?.code || "N/A",
        grade: grade.status || "N/A",
        status: grade.status,
      }));
      setStudents(formattedGrades);
      setError(null);
    } catch (err) {
      setError("Failed to fetch grades");
      console.error("Error fetching grades:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditingGrade(student.grade);
  };

  const handleSave = async (studentId) => {
    try {
      await fetch(`${API_URL}/grades/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: editingGrade,
          remarks: "Grade updated",
        }),
      });
      setStudents(
        students.map((student) =>
          student.id === studentId
            ? { ...student, grade: editingGrade, status: editingGrade }
            : student
        )
      );
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError("Failed to update grade");
      console.error("Error updating grade:", err);
    }
  };

  const handleDelete = async (gradeId) => {
    console.log(`Id to delete: ${gradeId}`);
    try {
      await fetch(`${API_URL}/grades/${gradeId}`, {
        method: "DELETE",
      });
      setStudents(students.filter((student) => student.id !== gradeId));
      setError(null);
    } catch (err) {
      setError("Failed to delete grade");
      console.error("Error deleting grade:", err);
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await fetch(`${API_URL}/grades/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: newStudent.studentId,
          course: newStudent.courseCode,
          status: newStudent.grade,
          remarks: "New grade assignment",
        }),
      });
      const data = await response.json();

      const formattedGrade = {
        id: data._id,
        studentId: data.student,
        courseCode: data.course,
        grade: data.status,
        status: data.status,
      };

      setStudents([...students, formattedGrade]);
      setNewStudent({ studentId: "", courseCode: "", grade: "A" });
      setIsAddingStudent(false);
      setError(null);
    } catch (err) {
      setError("Failed to add new grade");
      console.error("Error adding grade:", err);
    }
  };

  const handleSubmitAllGrades = async () => {
    try {
      const pendingGrades = students.filter((s) => s.status === "pending");
      await Promise.all(
        pendingGrades.map((student) =>
          fetch(`${API_URL}/grades/${student.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: student.grade,
              status: "submitted",
              remarks: "Bulk grade submission",
            }),
          })
        )
      );
      setStudents(
        students.map((s) =>
          s.status === "pending" ? { ...s, grade: s.grade, status: s.grade } : s
        )
      );
      setError(null);
    } catch (err) {
      setError("Failed to submit all grades");
      console.error("Error submitting grades:", err);
    }
  };

  const gradeOptions = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] text-white flex items-center justify-center">
        <p>Loading grades...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      {error && <div className="bg-red-900 p-2 mb-4 rounded">{error}</div>}

      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search by Student ID or Course Code"
          className="bg-[#2D2D2D] px-4 py-2 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => setIsAddingStudent(true)}
          className="bg-green-700 px-4 py-2 rounded"
        >
          <Plus size={16} /> Add Grade
        </button>
      </div>

      {isAddingStudent && (
        <div className="mb-4 grid grid-cols-4 gap-4">
          <input
            placeholder="Student ID"
            value={newStudent.studentId}
            onChange={(e) =>
              setNewStudent({ ...newStudent, studentId: e.target.value })
            }
            className="bg-[#2D2D2D] px-4 py-2 rounded"
          />
          <input
            placeholder="Course Code"
            value={newStudent.courseCode}
            onChange={(e) =>
              setNewStudent({ ...newStudent, courseCode: e.target.value })
            }
            className="bg-[#2D2D2D] px-4 py-2 rounded"
          />
          <select
            value={newStudent.grade}
            onChange={(e) =>
              setNewStudent({ ...newStudent, grade: e.target.value })
            }
            className="bg-[#2D2D2D] px-4 py-2 rounded"
          >
            {gradeOptions.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleAddStudent}
              className="bg-blue-600 px-4 rounded"
            >
              Add
            </button>
            <button
              onClick={() => setIsAddingStudent(false)}
              className="bg-gray-600 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full table-auto border-collapse text-left text-sm">
        <thead className="bg-green-900 text-white">
          <tr>
            <th className="px-4 py-3">Student ID</th>
            <th className="px-4 py-3">Course Code</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 text-white divide-y divide-gray-700">
          {students.map((student, index) => (
            <tr key={index} className="hover:bg-gray-800">
              <td className={`px-4 py-3`}>{student.studentId}</td>
              <td className={`px-4 py-3`}>{student.courseCode || "N/A"}</td>
              <td className={`px-4 py-3`}>
                {editingId === student.id ? (
                  <select
                    value={editingGrade}
                    onChange={(e) => setEditingGrade(e.target.value)}
                    className="bg-[#2D2D2D] px-2 py-1 rounded"
                  >
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span>{student.grade}</span>
                )}
              </td>
              <td className="px-4 py-3 space-x-2 text-center">
                {editingId === student.id ? (
                  <button onClick={() => handleSave(student.id)}>
                    <Check size={16} />
                  </button>
                ) : (
                  <button onClick={() => handleEdit(student)}>
                    <Edit2 size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(student.id)}
                  className="text-red-400 hover:text-red-200"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmitAllGrades}
          className="bg-[#1E472A] px-6 py-2 rounded"
        >
          <Save size={16} /> Submit All
        </button>
      </div>
    </div>
  );
}

export default GradingPage;
