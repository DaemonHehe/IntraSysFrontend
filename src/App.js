"use client";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LinkIcon } from "lucide-react";
import ProtectedRoute from "./components/ProtectedRoute";
import Calendar from "./components/Calendar";
import LoginPage from "./components/LoginPage";
import SDashboardPage from "./components/SDashboardPage";
import SEnrollmentsPage from "./components/SEnrollmentsPage";
import SRecordsPage from "./components/SRecordsPage";
import GradingPage from "./components/Grade.js";
import SChangePasswordPage from "./components/SChangePasswordPage.js";
import LDashboardPage from "./components/LDashboardPage";
import LChangePasswordPage from "./components/LChangePasswordPage.js";
import "./App.css";

function App() {
  return (
    <Router>
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
                      href="/login"
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

        <Route path="/login" element={<LoginPage />} />

        {/* Student routes with student role requirement */}
        <Route
          path="/main/dashboard"
          element={
            <ProtectedRoute requiredRole="student">
              <SDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main/enrollments"
          element={
            <ProtectedRoute requiredRole="student">
              <SEnrollmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main/records"
          element={
            <ProtectedRoute requiredRole="student">
              <SRecordsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main/changepassword"
          element={
            <ProtectedRoute requiredRole="student">
              <SChangePasswordPage />
            </ProtectedRoute>
          }
        />

        {/* Lecturer routes with lecturer role requirement */}
        <Route
          path="/lecturer/grades"
          element={
            <ProtectedRoute requiredRole="lecturer">
              <GradingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lecturer/dashboard"
          element={
            <ProtectedRoute requiredRole="lecturer">
              <LDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/changepassword"
          element={
            <ProtectedRoute requiredRole="lecturer">
              <LChangePasswordPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
