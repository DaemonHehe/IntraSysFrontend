"use client";

import { LinkIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Student login handler
  const ShandleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://intrasysmiso.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", "student"); // Explicitly store the role

        navigate("/main/dashboard");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  // Lecturer login handler
  const LhandleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://intrasysmiso.onrender.com/lecturers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", data.token);
        localStorage.setItem("lecturer", JSON.stringify(data.lecturer));
        localStorage.setItem("role", "lecturer"); // Explicitly store the role

        navigate("/lecturer/dashboard");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col select-none">
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

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-[#aff4c6] rounded-3xl p-8 w-full max-w-md flex flex-col items-center">
          <h1 className="text-black text-2xl font-semibold mb-8">Login</h1>

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-black">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#3c4c3c] text-white rounded-lg p-3 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-black">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#3c4c3c] text-white rounded-lg p-3 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="text-red-600 text-center font-medium">
                {error}
              </div>
            )}

            <div className="pt-4 flex justify-center">
              <button
                className="bg-[#14AE5C] text-black px-8 py-2 rounded-full hover:bg-[#7aab8e] transition-colors disabled:opacity-50"
                onClick={ShandleLogin}
                disabled={isLoading || !email || !password}
              >
                {isLoading ? "Logging in..." : "Log in as Student"}
              </button>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                className="bg-[#14AE5C] text-black px-8 py-2 rounded-full hover:bg-[#7aab8e] transition-colors disabled:opacity-50"
                onClick={LhandleLogin}
                disabled={isLoading || !email || !password}
              >
                {isLoading ? "Logging in..." : "Log in as Lecturer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
