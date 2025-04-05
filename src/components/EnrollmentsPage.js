import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import clsx from "clsx";
import Sidebar from "./Sidebar";

// Mock data for available courses
const AVAILABLE_COURSES = [
  {
    code: "CS101",
    name: "Introduction to Computer Science",
    description: "Fundamental concepts of programming and computer science",
    sections: [
      { 
        id: "A", 
        instructor: "Dr. John Smith", 
        room: "SCI-201", 
        time: "Monday 09:00-11:50" 
      },
      { 
        id: "B", 
        instructor: "Dr. Jane Doe", 
        room: "SCI-202", 
        time: "Tuesday 14:00-16:50" 
      },
    ]
  },
  {
    code: "MATH202",
    name: "Calculus II",
    description: "Advanced integration techniques and applications",
    sections: [
      { 
        id: "A", 
        instructor: "Dr. Robert Johnson", 
        room: "MATH-101", 
        time: "Wednesday 10:00-12:50" 
      },
      { 
        id: "B", 
        instructor: "Dr. Lisa Chen", 
        room: "MATH-102", 
        time: "Thursday 13:00-15:50" 
      },
    ]
  },
  {
    code: "ENG105",
    name: "English Composition",
    description: "Developing writing skills for academic purposes",
    sections: [
      { 
        id: "A", 
        instructor: "Prof. Michael Brown", 
        room: "HUM-301", 
        time: "Friday 09:00-11:50" 
      },
    ]
  },
];

function EnrollmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  
  // Filter enrolled courses based on search query
  const filteredCourses = enrolledCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    const foundCourse = AVAILABLE_COURSES.find(
      course => course.code.toLowerCase() === searchQuery.toLowerCase()
    );
    
    setSearchResults(foundCourse || "not-found");
    setSelectedSection(null); // Reset selected section
    
    // Only show the modal if it's not already shown
    if (!showModal) {
      setShowModal(true);
    }
  };

  // Handle course enrollment
  const handleEnroll = () => {
    if (!selectedSection || !searchResults || searchResults === "not-found") return;
    
    // Check if the user is already enrolled in any section of this course
    const isAlreadyEnrolled = enrolledCourses.some(
      course => course.code === searchResults.code
    );
    
    if (isAlreadyEnrolled) {
      alert(`You are already enrolled in a section of ${searchResults.code}. You cannot enroll in multiple sections of the same course.`);
      return;
    }
    
    const newEnrollment = {
      id: enrolledCourses.length + 1,
      code: searchResults.code,
      name: searchResults.name,
      section: selectedSection.id,
      instructor: selectedSection.instructor,
      room: selectedSection.room,
      time: selectedSection.time,
    };
    
    setEnrolledCourses(prev => [...prev, newEnrollment]);
    
    // Ask if user wants to search for another course
    const searchAnother = window.confirm("Course enrolled successfully! Would you like to search for another course?");
    
    if (searchAnother) {
      setSearchQuery("");
      setSearchResults(null);
      setSelectedSection(null);
    } else {
      setShowModal(false);
    }
  };

  // Handle deletion of enrolled course
  const handleDelete = (courseId) => {
    setEnrolledCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId)
    );
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSearchResults(null);
    setSelectedSection(null);
    setSearchQuery(""); // Clear search query when closing modal
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
            <form onSubmit={handleSearch} className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                size={18}
                onClick={handleSearch}
              />
              <input
                type="text"
                placeholder="Search Course Code"
                className="bg-[#2D2D2D] pl-10 pr-4 py-2 rounded-3xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 w-[400px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <X size={18} />
                </button>
              )}
            </form>
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
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
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
                    ))
                  ) : (
                    <tr className="border-b border-gray-700 bg-[#2D2D2D]">
                      <td colSpan="7" className="py-8 text-center text-gray-400">
                        No courses enrolled. Search for courses to enroll.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 flex justify-end bg-[#2D2D2D]">
              <button 
                className={`bg-[#4A4A4A] text-white px-6 py-1.5 rounded text-sm transition-colors ${
                  enrolledCourses.length > 0 ? "hover:bg-[#5A5A5A]" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={enrolledCourses.length === 0}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Search Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#2D2D2D] rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Course Search</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Search Box */}
            <div className="mb-6">
              <form onSubmit={handleSearch} className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  size={18}
                  onClick={handleSearch}
                />
                <input
                  type="text"
                  placeholder="Search Course Code"
                  className="bg-[#363636] pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <X size={18} />
                  </button>
                )}
              </form>
            </div>

            {searchResults === "not-found" ? (
              <div className="text-center py-8">
                <p className="text-red-400 mb-2">Course Unavailable</p>
                <p className="text-gray-400">
                  No course found with code "{searchQuery}". Please check the course code and try again.
                </p>
              </div>
            ) : searchResults && (
              <div>
                <div className="bg-[#363636] p-4 rounded-md mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{searchResults.code}: {searchResults.name}</h3>
                      <p className="text-gray-400 mt-1">{searchResults.description}</p>
                      {enrolledCourses.some(course => course.code === searchResults.code) && (
                        <p className="text-yellow-400 mt-2">
                          You are already enrolled in a section of this course.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <h3 className="font-medium mb-2">Available Sections:</h3>
                <div className="bg-[#363636] rounded-md overflow-hidden mb-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#1E472A] text-left text-sm">
                        <th className="py-2 px-4 font-medium">Select</th>
                        <th className="py-2 px-4 font-medium">Section</th>
                        <th className="py-2 px-4 font-medium">Instructor</th>
                        <th className="py-2 px-4 font-medium">Room</th>
                        <th className="py-2 px-4 font-medium">Time</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {searchResults.sections.map((section, index) => (
                        <tr 
                          key={section.id}
                          className={clsx(
                            "border-b border-gray-700",
                            index % 2 === 0 ? "bg-[#363636]" : "bg-[#2D2D2D]"
                          )}
                        >
                          <td className="py-3 px-4">
                            <input 
                              type="checkbox" 
                              checked={selectedSection && selectedSection.id === section.id}
                              onChange={() => setSelectedSection(selectedSection && selectedSection.id === section.id ? null : section)}
                              className="h-4 w-4"
                            />
                          </td>
                          <td className="py-3 px-4">{section.id}</td>
                          <td className="py-3 px-4">{section.instructor}</td>
                          <td className="py-3 px-4">{section.room}</td>
                          <td className="py-3 px-4">{section.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleEnroll}
                    disabled={!selectedSection || enrolledCourses.some(course => course.code === searchResults.code)}
                    className={`bg-green-600 text-white px-6 py-2 rounded-md ${
                      selectedSection && !enrolledCourses.some(course => course.code === searchResults.code) 
                        ? "hover:bg-green-500" 
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EnrollmentsPage;