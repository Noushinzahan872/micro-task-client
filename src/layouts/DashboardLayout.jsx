// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import TopNavbar from "./TopNavbar";


// const DashboardLayout = ({ children, user }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar
//         user={user}
//         sidebarOpen={sidebarOpen}
//         toggleSidebar={toggleSidebar}
//       />

//       {/* Main content area */}
//       <div className="flex flex-col flex-1">
//         {/* Top Navbar */}
//         <TopNavbar user={user} toggleSidebar={toggleSidebar} />

//         {/* Page Content */}
//         <main className="p-4 md:p-6 flex-1 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;




// import { useEffect, useState } from "react";
// import { Outlet } from "react-router";
// import useAuth from "../hooks/useAuth";
// import TopNavbar from "./TopNavbar";
// import Sidebar from "./Sidebar";

// const DashboardLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const { user } = useAuth();

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   // Fetch user data from DB
//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:3000/users/${user.email}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setUserData(data);
//         })
//         .catch((err) => {
//           console.error("Failed to load user data", err);
//         });
//     }
//   }, [user]);

//   if (!userData) {
//     return <div className="text-center py-10">Loading dashboard...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <TopNavbar onSidebarToggle={toggleSidebar} />
//       <div className="flex">
//         <aside
//           className={`bg-blue-800 text-white w-64 fixed md:relative h-screen z-20 transform transition-transform duration-300 ${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } md:translate-x-0`}
//         >
//           <Sidebar
//             user={userData} // ✅ full userData with role
//             sidebarOpen={isSidebarOpen}
//             toggleSidebar={toggleSidebar}
//           />
//         </aside>

//         <main className="flex-1 p-4 md:ml-64">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;




import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";

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
      fetch(`http://localhost:3000/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("User load failed", err));
    }
  }, [user]);

  if (!userData) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <TopNavbar onSidebarToggle={toggleSidebar} />

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:relative w-64 h-screen bg-blue-800 text-white z-30 transform transition-transform duration-300 ${
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
 