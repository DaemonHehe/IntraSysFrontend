import React, { useState, useEffect } from "react";
import { Search, Save, Edit2, Check, Plus, Trash2 } from "lucide-react";
import clsx from "clsx";

const API_URL = "https://intrasysmiso.onrender.com";

function GradingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingGrade, setEditingGrade] = useState("");
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    studentId: "",
    courseCode: "",
    courseName: "",
    grade: "A",
    status: "pending",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/grades/`);
      const data = await response.json();
      const formattedGrades = data.map((grade) => ({
        id: grade._id,
        name: grade.student.name,
        studentId: grade.student._id,
        courseCode: grade.course.code,
        courseName: grade.course.name,
        grade: grade.grade,
        status: grade.status,
        remarks: grade.remarks,
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
          grade: editingGrade,
          remarks: "Grade updated by lecturer",
        }),
      });

      setStudents(
        students.map((student) =>
          student.id === studentId
            ? { ...student, grade: editingGrade, status: "submitted" }
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

  const handleDelete = async (studentId) => {
    try {
      await fetch(`${API_URL}/grades/${studentId}`, {
        method: "DELETE",
      });
      setStudents(students.filter((student) => student.id !== studentId));
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
          grade: newStudent.grade,
          status: "pending",
          remarks: "New grade assignment",
        }),
      });
      const data = await response.json();

      const formattedGrade = {
        id: data.grade._id,
        name: newStudent.name,
        studentId: newStudent.studentId,
        courseCode: newStudent.courseCode,
        courseName: newStudent.courseName,
        grade: newStudent.grade,
        status: "pending",
      };

      setStudents([...students, formattedGrade]);
      setNewStudent({
        name: "",
        studentId: "",
        courseCode: "",
        courseName: "",
        grade: "A",
        status: "pending",
      });
      setIsAddingStudent(false);
      setError(null);
    } catch (err) {
      setError("Failed to add new grade");
      console.error("Error adding grade:", err);
    }
  };

  const handleSubmitAllGrades = async () => {
    try {
      const pendingGrades = students.filter(
        (student) => student.status === "pending"
      );
      await Promise.all(
        pendingGrades.map((student) =>
          fetch(`${API_URL}/grades/${student.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              grade: student.grade,
              status: "submitted",
              remarks: "Bulk grade submission",
            }),
          })
        )
      );

      setStudents(
        students.map((student) => ({
          ...student,
          status: "submitted",
        }))
      );
      setError(null);
    } catch (err) {
      setError("Failed to submit all grades");
      console.error("Error submitting grades:", err);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.includes(searchQuery) ||
      student.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const gradeOptions = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] text-white flex items-center justify-center">
        <p>Loading grades...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="max-w-[1234px] mx-auto py-8 px-6">
        {error && (
          <div className="bg-red-900 text-red-100 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Grade Management</h1>
            <p className="text-gray-400 text-sm">Summer Semester 2025</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Student or Course"
                className="bg-[#2D2D2D] pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsAddingStudent(true)}
              className="bg-[#1E472A] hover:bg-[#2A573A] text-white px-4 py-2 rounded text-sm transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Add Student
            </button>
          </div>
        </div>

        <div className="bg-[#2D2D2D] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Grading Period:</span>
              <span className="text-xs">Open until MM/DD/YYYY</span>
            </div>
          </div>

          {isAddingStudent && (
            <div className="p-4 border-b border-gray-700 bg-[#363636]">
              <div className="grid grid-cols-5 gap-4">
                <input
                  placeholder="Student Name"
                  className="bg-[#2D2D2D] px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                />
                <input
                  placeholder="Student ID"
                  className="bg-[#2D2D2D] px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  value={newStudent.studentId}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, studentId: e.target.value })
                  }
                />
                <input
                  placeholder="Course Code"
                  className="bg-[#2D2D2D] px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  value={newStudent.courseCode}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, courseCode: e.target.value })
                  }
                />
                <input
                  placeholder="Course Name"
                  className="bg-[#2D2D2D] px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  value={newStudent.courseName}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, courseName: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <select
                    value={newStudent.grade}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, grade: e.target.value })
                    }
                    className="bg-[#2D2D2D] px-3 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
                  >
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddStudent}
                    className="bg-green-600 hover:bg-green-700 px-4 rounded"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setIsAddingStudent(false)}
                    className="bg-gray-600 hover:bg-gray-700 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1E472A] text-left text-sm">
                  <th className="py-2 px-4 font-medium">Student ID</th>
                  <th className="py-2 px-4 font-medium">Name</th>
                  <th className="py-2 px-4 font-medium">Course Code</th>
                  <th className="py-2 px-4 font-medium">Course Name</th>
                  <th className="py-2 px-4 font-medium">Grade</th>
                  <th className="py-2 px-4 font-medium">Status</th>
                  <th className="py-2 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className={clsx(
                      "border-b border-gray-700",
                      student.id % 2 === 0 ? "bg-[#363636]" : "bg-[#2D2D2D]"
                    )}
                  >
                    <td className="py-3 px-4">{student.studentId}</td>
                    <td className="py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4">{student.courseCode}</td>
                    <td className="py-3 px-4">{student.courseName}</td>
                    <td className="py-3 px-4">
                      {editingId === student.id ? (
                        <select
                          value={editingGrade}
                          onChange={(e) => setEditingGrade(e.target.value)}
                          className="bg-[#1E1E1E] border border-gray-600 rounded px-2 py-1"
                        >
                          {gradeOptions.map((grade) => (
                            <option key={grade} value={grade}>
                              {grade}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className={clsx(
                            student.grade === "F"
                              ? "text-red-400"
                              : student.grade.startsWith("A")
                              ? "text-green-400"
                              : "text-white"
                          )}
                        >
                          {student.grade}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={clsx(
                          "px-2 py-1 rounded-full text-xs",
                          student.status === "submitted"
                            ? "bg-green-900 text-green-300"
                            : "bg-yellow-900 text-yellow-300"
                        )}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {editingId === student.id ? (
                          <button
                            onClick={() => handleSave(student.id)}
                            className="text-green-500 hover:text-green-400 transition-colors"
                          >
                            <Check size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(student)}
                            className="text-blue-500 hover:text-blue-400 transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex justify-end bg-[#2D2D2D]">
            <button
              onClick={handleSubmitAllGrades}
              className="bg-[#1E472A] hover:bg-[#2A573A] text-white px-6 py-1.5 rounded text-sm transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              Submit All Grades
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradingPage;
