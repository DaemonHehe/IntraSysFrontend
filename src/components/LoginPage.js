"use client";

import { LinkIcon } from "lucide-react";
import { useState } from "react";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="text-[#14ae5c]">
            <LinkIcon size={28} strokeWidth={2.5} />
          </div>
          <span className="text-white text-xl font-medium">
            Student Connect
          </span>
        </div>
      </header>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-[#aff4c6] rounded-3xl p-8 w-full max-w-md flex flex-col items-center">
          <h1 className="text-black text-2xl font-semibold mb-8">Login</h1>

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-black">
                username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#3c4c3c] text-white rounded-lg p-3 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-black">
                password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#3c4c3c] text-white rounded-lg p-3 focus:outline-none"
              />
            </div>

            <div className="pt-4 flex justify-center">
              <button className="bg-[#8bbc9f] text-black px-8 py-2 rounded-full hover:bg-[#7aab8e] transition-colors">
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
