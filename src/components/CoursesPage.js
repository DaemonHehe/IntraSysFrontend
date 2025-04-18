import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

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
    content: [{ title: "Introduction", url: "" }],
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
      const responseData = await res.json();

      if (responseData.success && Array.isArray(responseData.data)) {
        setCourses(responseData.data);
      } else {
        setError("Failed to fetch courses.");
      }
    } catch (err) {
      setError("Failed to fetch courses: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const endpoint = editingId ? `/courses/${editingId}` : "/courses/create";
      const url = `${API_URL}${endpoint}`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to save course.");
      resetForm();
      fetchCourses();
    } catch (err) {
      setError("Failed to save course: " + err.message);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      category: "",
      duration: "",
      enrollmentLimit: "",
      lecturer: "",
      content: [{ title: "Introduction", url: "" }],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (course) => {
    setForm({
      name: course.name,
      description: course.description,
      category: course.category,
      duration: course.duration.toString(),
      enrollmentLimit: course.enrollmentLimit.toString(),
      lecturer: course.lecturer?._id || course.lecturer,
      content: course.content || [{ title: "Introduction", url: "" }],
    });
    setEditingId(course._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/courses/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete course.");
      fetchCourses();
    } catch (err) {
      setError("Failed to delete course: " + err.message);
    }
  };

  const handleContentChange = (index, field, value) => {
    const newContent = [...form.content];
    newContent[index][field] = value;
    setForm({ ...form, content: newContent });
  };

  const addContent = () => {
    setForm({
      ...form,
      content: [...form.content, { title: "", url: "" }],
    });
  };

  const removeContent = (index) => {
    const newContent = form.content.filter((_, i) => i !== index);
    setForm({ ...form, content: newContent });
  };

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
                    className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full"
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
                    className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full"
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
                  <textarea
                    className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Duration (weeks)
                  </label>
                  <input
                    className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full"
                    type="number"
                    min="1"
                    placeholder="Duration"
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
                    className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full"
                    type="number"
                    min="1"
                    placeholder="Enrollment Limit"
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
                    className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full"
                    placeholder="Lecturer ID"
                    value={form.lecturer}
                    onChange={(e) =>
                      setForm({ ...form, lecturer: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Content Section */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">
                    Content
                  </label>
                  {form.content.map((content, index) => (
                    <div key={index} className="flex gap-4 mb-4">
                      <input
                        className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full"
                        placeholder="Content Title"
                        value={content.title}
                        onChange={(e) =>
                          handleContentChange(index, "title", e.target.value)
                        }
                        required
                      />
                      <input
                        className="bg-[#1E1E1E] border border-gray-600 rounded px-3 py-2 w-full"
                        placeholder="Content URL"
                        value={content.url}
                        onChange={(e) =>
                          handleContentChange(index, "url", e.target.value)
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeContent(index)}
                        className="bg-red-600 text-white rounded px-3 py-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addContent}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Add Content
                  </button>
                </div>

                <div className="md:col-span-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#1E472A] hover:bg-[#2A573A] text-white px-4 py-2 rounded text-sm flex items-center gap-2"
                  >
                    {editingId ? "Update Course" : "Create Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Render courses */}
        <div className="bg-[#2D2D2D] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1E472A] text-left text-sm">
                  <th className="py-2 px-4">Course Name</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Duration</th>
                  <th className="py-2 px-4">Enrollment</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses
                  .filter((course) =>
                    course.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((course) => (
                    <tr key={course._id} className="border-t border-gray-700">
                      <td className="py-2 px-4">{course.name}</td>
                      <td className="py-2 px-4">{course.description}</td>
                      <td className="py-2 px-4">{course.category}</td>
                      <td className="py-2 px-4">{course.duration}</td>
                      <td className="py-2 px-4">{course.enrollmentLimit}</td>
                      <td className="py-2 px-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-yellow-500 text-white px-3 py-2 rounded-md text-xs"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-600 text-white px-3 py-2 rounded-md text-xs"
                          >
                            <Trash2 size={16} />
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
