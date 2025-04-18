import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Lock,
  LogOut,
  User,
} from "lucide-react";

function Sidebar() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem("token");
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

        // check if data is an array and get the first item
        setUserData(Array.isArray(data) && data.length > 0 ? data[0] : null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error (e.g., redirect to login page)
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-64 bg-[#111] flex flex-col h-screen">
      {/* User Profile */}
      <div className="p-4 flex items-center space-x-3 border-b border-gray-800">
        <div className="w-12 h-12 rounded-full bg-[#14ae5c] flex items-center justify-center overflow-hidden">
          {/* <img
            src="/placeholder.svg?height=48&width=48"
            alt="Profile"
            className="w-full h-full object-cover"
          /> */}
          <User size={24} color="#fff" />
        </div>
        <div>
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : userData ? (
            <>
              <h3 className="font-medium">{userData.name || "User"}</h3>
              <p className="text-xs text-gray-400">
                {userData.email || "No email"}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-400">Failed to load user data</p>
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
              path: "/main/dashboard",
            },
            {
              name: "Enrollments",
              icon: <GraduationCap size={20} />,
              path: "/main/enrollments",
            },
            {
              name: "Academic Records",
              icon: <FileText size={20} />,
              path: "/main/records",
            },
            {
              name: "Change Password",
              icon: <Lock size={20} />,
              path: "/main/changepassword",
            },
          ].map(({ name, icon, path }) => (
            <li key={name}>
              <button
                className={`w-full flex items-center space-x-3 px-6 py-3 ${
                  activeNav === name.toLowerCase()
                    ? "text-[#14ae5c] bg-black/20"
                    : "text-gray-300"
                }`}
                onClick={() => {
                  setActiveNav(name.toLowerCase());
                  navigate(path);
                }}
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

export default Sidebar;
