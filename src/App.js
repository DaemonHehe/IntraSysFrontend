import { Link } from "lucide-react";
import Calendar from "./components/Calendar";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="container flex flex-col md:flex-row items-center justify-center gap-12 py-16 px-6 max-w-7xl">
        {/* Left Section */}
        <div className="flex flex-col max-w-md space-y-8 mb-12 md:mb-0">
          <div className="flex items-center gap-3">
            <div className="text-[#14ae5c]">
              <Link size={36} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-medium">Student Connect</span>
          </div>

          <h1 className="text-5xl font-bold leading-tight">Manage Academic</h1>

          <p className="text-[#767680] text-lg">
            Explore subjects, track Grades, check Timetables, receive
            Notifications & personal
          </p>

          <div>
            <button className="bg-[#14ae5c] text-white px-12 py-3 rounded-full font-medium hover:bg-[#009951] transition-colors">
              Start
            </button>
          </div>
        </div>

        {/* Right Section - Calendar */}
        <div className="w-full max-w-md">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default App;
