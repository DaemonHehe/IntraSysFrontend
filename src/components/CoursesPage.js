"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import clsx from "clsx";

const API_URL = "https://intrasysmiso.onrender.com";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    duration: "",
    enrollmentLimit: "",
    lecturer: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/courses`);
      const data = await res.json();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch courses");
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_URL}/api/courses/${editingId}`
        : `${API_URL}/api/courses`;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({
        name: "",
        description: "",
        category: "",
        duration: "",
        enrollmentLimit: "",
        lecturer: "",
      });
      setEditingId(null);
      setShowForm(false);
      fetchCourses();
      setError(null);
    } catch (err) {
      setError("Failed to save course");
      console.error("Error saving course:", err);
    }
  };

  const handleEdit = (course) => {
    setForm({
      ...course,
      duration: course.duration.toString(),
      enrollmentLimit: course.enrollmentLimit.toString(),
      lecturer: course.lecturer,
    });
    setEditingId(course._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/api/courses/${id}`, { method: "DELETE" });
      fetchCourses();
      setError(null);
    } catch (err) {
      setError("Failed to delete course");
      console.error("Error deleting course:", err);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] text-white flex items-center justify-center">
        <p>Loading courses...</p>
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
            <h1 className="text-2xl font-semibold mb-1">Course Management</h1>
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
                placeholder="Search Courses"
                className="bg-[#2D2D2D] pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#1E472A] hover:bg-[#2A573A] text-white px-4 py-2 rounded text-sm transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Add Course
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-[#2D2D2D] rounded-lg overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-700 bg-[#363636]">
              <h2 className="text-lg font-medium mb-4">
                {editingId ? "Edit Course" : "Add New Course"}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Name
                  </label>
                  <input
                    className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Course Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Category
                  </label>
                  <input
                    className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">
                    Description
                  </label>
                  <input
                    className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Duration (weeks)
                  </label>
                  <input
                    className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Duration"
                    type="number"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Enrollment Limit
                  </label>
                  <input
                    className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Enrollment Limit"
                    type="number"
                    value={form.enrollmentLimit}
                    onChange={(e) =>
                      setForm({ ...form, enrollmentLimit: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">
                    Lecturer ID
                  </label>
                  <input
                    className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
                    placeholder="Lecturer ID"
                    value={form.lecturer}
                    onChange={(e) =>
                      setForm({ ...form, lecturer: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="md:col-span-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setForm({
                        name: "",
                        description: "",
                        category: "",
                        duration: "",
                        enrollmentLimit: "",
                        lecturer: "",
                      });
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#1E472A] hover:bg-[#2A573A] text-white px-4 py-2 rounded text-sm transition-colors flex items-center gap-2"
                  >
                    {editingId ? "Update Course" : "Create Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-[#2D2D2D] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1E472A] text-left text-sm">
                  <th className="py-2 px-4 font-medium">Course Name</th>
                  <th className="py-2 px-4 font-medium">Description</th>
                  <th className="py-2 px-4 font-medium">Category</th>
                  <th className="py-2 px-4 font-medium">Duration</th>
                  <th className="py-2 px-4 font-medium">Enrollment Limit</th>
                  <th className="py-2 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredCourses.map((course, index) => (
                  <tr
                    key={course._id}
                    className={clsx(
                      "border-b border-gray-700",
                      index % 2 === 0 ? "bg-[#363636]" : "bg-[#2D2D2D]"
                    )}
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-yellow-400">
                        {course.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">
                      {course.description}
                    </td>
                    <td className="py-3 px-4">{course.category}</td>
                    <td className="py-3 px-4">{course.duration} weeks</td>
                    <td className="py-3 px-4">{course.enrollmentLimit}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="text-blue-500 hover:text-blue-400 transition-colors"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
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
        </div>
      </div>
    </div>
  );
}
