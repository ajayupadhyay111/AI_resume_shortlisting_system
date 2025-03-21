import { useEffect, useState } from "react";
import { Home, User, Settings, CreditCard } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Dashboard() {
  const [isDashboard, setIsDashboard] = useState<string | undefined>(undefined)
  const location = useLocation()
  useEffect(() => {
    setIsDashboard(location.pathname.split("/")[2])
    window.scrollTo(0, 0)
  }, [location])
 
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`w-[56px] lg:w-[250px] text-white transition-all duration-300`}>
        <ul className="mt-4">
          <li className={`${isDashboard !== "profile" && isDashboard !== "settings" && isDashboard !== "payments" ? "bg-yellow-600 hover:bg-yellow-600" : "hover:bg-gray-700"}`}>
            <Link to="/dashboard" className="p-4 flex items-center gap-2  cursor-pointer">
              <Home size={20} />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </li>
          <li className={`${isDashboard === "profile" ? "bg-yellow-600 hover:bg-yellow-600" : "hover:bg-gray-700"}`}>
            <Link to="/dashboard/profile" className="p-4 flex items-center gap-2  cursor-pointer">
              <User size={20} />
              <span className="hidden lg:block"> Profile</span>
            </Link>
          </li>

          <li className={`${isDashboard === "payments" ? "bg-yellow-600 hover:bg-yellow-600" : "hover:bg-gray-700"}`}>
            <Link to="/dashboard/payments" className="p-4 flex items-center gap-2  cursor-pointer">
              <CreditCard size={20} />
              <span className="hidden lg:block"> Payments</span>
            </Link>
          </li>
          <li className={`${isDashboard === "settings" ? "bg-yellow-600 hover:bg-yellow-600" : "hover:bg-gray-700"}`}>
            <Link to="/dashboard/settings" className="p-4 flex items-center gap-2  cursor-pointer">
              <Settings size={20} />
              <span className="hidden lg:block">Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Content Section */}
      <div className="bg-gray-900 flex-1 p-6 overflow-x-auto">
        <Outlet />
      </div>
    </div>
  );
}
