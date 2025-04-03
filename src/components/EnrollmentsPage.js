import React, { useState } from "react";
import { Search, X, Plus } from "lucide-react";
import clsx from "clsx";
import Sidebar from "./Sidebar";

function EnrollmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    section: "",
    instructor: "",
    room: "",
    time: "",
  });

  const filteredCourses = courseList.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (courseId) => {
    setCourseList((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId)
    );
  };

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name || !newCourse.section) return; // Prevent empty fields
    setCourseList((prev) => [...prev, { id: prev.length + 1, ...newCourse }]);
    setNewCourse({
      code: "",
      name: "",
      section: "",
      instructor: "",
      room: "",
      time: "",
    });
  };

  return (
    <div className="flex h-screen bg-[#1E1E1E] text-white select-none">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="max-w-[1234px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-semibold mb-1">Enrollments</h1>
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
                className="bg-[#2D2D2D] pl-10 pr-4 py-2 rounded-3xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 w-[400px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Add Course Form */}
          <div className="mb-6 p-4 bg-[#2D2D2D] rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Add Course</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Course Code"
                className="bg-[#363636] text-white px-3 py-2 rounded-md text-sm focus:outline-none"
                value={newCourse.code}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, code: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Course Name"
                className="bg-[#363636] text-white px-3 py-2 rounded-md text-sm focus:outline-none"
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Section"
                className="bg-[#363636] text-white px-3 py-2 rounded-md text-sm focus:outline-none"
                value={newCourse.section}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, section: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Instructor"
                className="bg-[#363636] text-white px-3 py-2 rounded-md text-sm focus:outline-none"
                value={newCourse.instructor}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, instructor: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Room"
                className="bg-[#363636] text-white px-3 py-2 rounded-md text-sm focus:outline-none"
                value={newCourse.room}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, room: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Time (e.g., Monday 09:00-11:50)"
                className="bg-[#363636] text-white px-3 py-2 rounded-md text-sm focus:outline-none"
                value={newCourse.time}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, time: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleAddCourse}
              className="mt-3 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus size={18} className="mr-1" /> Add Course
            </button>
          </div>

          {/* Table */}
          <div className="bg-[#2D2D2D] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1E472A] text-left text-sm">
                    <th className="py-2 px-4 font-medium">ID</th>
                    <th className="py-2 px-4 font-medium">Course</th>
                    <th className="py-2 px-4 font-medium">Session</th>
                    <th className="py-2 px-4 font-medium">Instructor</th>
                    <th className="py-2 px-4 font-medium">Room</th>
                    <th className="py-2 px-4 font-medium">Time Table</th>
                    <th className="py-2 px-4 font-medium">Cancel</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredCourses.map((course) => (
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
                      <td className="py-3 px-4 whitespace-pre">
                        {course.time}
                      </td>
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
    </div>
  );
}

export default EnrollmentsPage;
