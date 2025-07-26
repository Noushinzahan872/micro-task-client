

import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import LoadingSpinner from "../shared/LoadingSpinner";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Fetch user info from backend (based on email)
  useEffect(() => {
    if (user?.email) {
      fetch(`https://micro-task-server-ashen.vercel.app/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("User load failed", err));
    }
  }, [user]);

  if (!userData) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <TopNavbar onSidebarToggle={toggleSidebar} />

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:relative w-64 h-screen bg-blue-600 text-white z-30 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <Sidebar
            user={userData}
            sidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 pt-16 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

 export default DashboardLayout;
 