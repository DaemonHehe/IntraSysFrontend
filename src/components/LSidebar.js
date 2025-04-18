import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  Lock,
  LogOut,
  User,
  FileText,
} from "lucide-react";

function LSidebar() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Set active nav based on current path when component mounts
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("dashboard")) setActiveNav("dashboard");
    else if (path.includes("enrollments")) setActiveNav("enrollments");
    else if (path.includes("grades")) setActiveNav("grades");
    else if (path.includes("changepassword")) setActiveNav("change password");
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://intrasysmiso.onrender.com/lecturers/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(Array.isArray(data) && data.length > 0 ? data[0] : null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 🔐 Handle logout
  const handleLogout = () => {
    // Clear all authentication-related data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("lecturer");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    // Navigate to home page
    navigate("/");
  };

  // Make sure the activeNav state is correctly updated when clicking navigation items
  const handleNavClick = (name, path) => {
    const navName = name.toLowerCase();
    setActiveNav(navName);
    navigate(path);
  };

  return (
    <div className="w-64 bg-[#111] flex flex-col h-screen">
      {/* User Profile */}
      <div className="p-4 flex items-center space-x-3 border-b border-gray-800">
        <div className="w-12 h-12 rounded-full bg-[#14ae5c] flex items-center justify-center overflow-hidden">
          <User size={24} color="#fff" />
        </div>
        <div>
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : userData ? (
            <>
              <h3 className="font-medium">{userData.name}</h3>
              <p className="text-xs text-gray-400">{userData.email}</p>
            </>
          ) : (
            <p className="text-sm text-gray-400">No user found</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8">
        <ul className="space-y-2">
          {[
            {
              name: "Dashboard",
              icon: <LayoutDashboard size={20} />,
              path: "/lecturer/dashboard",
            },
            {
              name: "Courses",
              icon: <GraduationCap size={20} />,
              path: "/lecturer/courses",
            },
            {
              name: "Grades",
              icon: <FileText size={20} />,
              path: "/lecturer/grades",
            },
            {
              name: "Change Password",
              icon: <Lock size={20} />,
              path: "/lecturer/changepassword",
            },
          ].map(({ name, icon, path }) => (
            <li key={name}>
              <button
                className={`w-full flex items-center space-x-3 px-6 py-3 ${
                  activeNav === name.toLowerCase()
                    ? "text-[#14ae5c] bg-black/20"
                    : "text-gray-300"
                }`}
                onClick={() => handleNavClick(name, path)}
              >
                {icon}
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          className="flex items-center space-x-2 text-gray-400 hover:text-[#14ae5c]"
          onClick={handleLogout}
        >
          <span>Log Out</span>
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
}

export default LSidebar;
