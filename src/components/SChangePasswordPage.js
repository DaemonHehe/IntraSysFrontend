// ChangePasswordPage.js
import React, { useState } from "react";
import Sidebar from "./SSidebar";
import { Eye, EyeOff } from "lucide-react";

const SChangePasswordPage = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="h-screen w-full text-white flex select-none">
      <div>
        <Sidebar />
      </div>
      {/* Main content */}
      <div className="flex-1">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Change Password</h1>

          <div className="max-w-lg">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-white">UserName:</label>
              </div>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-white">Old Password:</label>
              </div>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white pr-10"
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
                  onClick={toggleOldPassword}
                >
                  {showOldPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-white">New Password:</label>
              </div>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white pr-10"
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
                  onClick={toggleNewPassword}
                >
                  {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-white">Confirm Password:</label>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white pr-10"
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
                  onClick={toggleConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-2 rounded-2xl font-semibold transition duration-300 ease-in-out">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SChangePasswordPage;
