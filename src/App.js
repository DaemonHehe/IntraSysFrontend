"use client";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router
import { LinkIcon } from "lucide-react";
import ProtectedRoute from "./components/ProtectedRoute";
import Calendar from "./components/Calendar";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import EnrollmentsPage from "./components/EnrollmentsPage";
import RecordsPage from "./components/RecordsPage";
import GradesPage from "./components/Grade";
import ChangePasswordPage from "./components/ChangePasswordPage"; // Importing the components for routing
import "./App.css";

function App() {
  return (
    <Router>
      {" "}
      {/* Wrapping the app with Router for routing */}
      <Routes>
        {/* Define route for the home page */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-black text-white flex items-center justify-center select-none">
              <div className="container flex flex-col md:flex-row items-center justify-center gap-12 py-16 px-6 max-w-7xl">
                {/* Left Section */}
                <div className="flex flex-col max-w-md space-y-8 mb-12 md:mb-0">
                  <div className="flex items-center gap-3">
                    <div className="text-[#14ae5c]">
                      <LinkIcon size={36} strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-medium">Student Connect</span>
                  </div>

                  <h1 className="text-5xl font-bold leading-tight">
                    Manage Academic
                  </h1>

                  <p className="text-[#767680] text-lg">
                    Explore subjects, track Grades, check Timetables, receive
                    Notifications & personal
                  </p>

                  <div>
                    <a
                      href="/login" // Linking to the login page route
                      className="bg-[#14ae5c] text-white px-12 py-3 rounded-full font-medium hover:bg-[#009951] transition-colors"
                    >
                      Start
                    </a>
                  </div>
                </div>

                {/* Right Section - Calendar */}
                <div className="w-full max-w-md">
                  <Calendar />
                </div>
              </div>
            </div>
          }
        />

        {/* Define route for LoginPage */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/main/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main/enrollments"
          element={
            <ProtectedRoute>
              <EnrollmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main/records"
          element={
            <ProtectedRoute>
              <RecordsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main/changepassword"
          element={
            <ProtectedRoute>
              <ChangePasswordPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
