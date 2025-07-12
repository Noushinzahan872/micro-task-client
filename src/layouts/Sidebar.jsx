



// // const Sidebar = () => {
// //   return (
// //     <div className="p-4 space-y-4">
// //       <Link to="/dashboard/home" className="block hover:underline">
// //         Dashboard Home
// //       </Link>
// //       <Link to="/dashboard/tasks" className="block hover:underline">
// //         Tasks
// //       </Link>
// //       <Link to="/dashboard/profile" className="block hover:underline">
// //         Profile
// //       </Link>
// //     </div>
// //   );
// // };

// // export default Sidebar;





// import React from "react";

// import {
//   FaHome,
//   FaTasks,
//   FaUsers,
//   FaCoins,
//   FaUserShield,
// } from "react-icons/fa";
// import { Link } from "react-router";

// const Sidebar = ({ user, sidebarOpen, toggleSidebar }) => {
//   const role = user?.role;

//   // Role based menu items
//   const menuItems = {
//     Worker: [
//       { name: "Home", path: "/dashboard/worker-home", icon: <FaHome /> },
//       { name: "Task List", path: "/dashboard/tasks", icon: <FaTasks /> },
//       { name: "My Submissions", path: "/dashboard/my-submissions", icon: <FaTasks /> },
//       { name: "Withdrawals", path: "/dashboard/withdrawals", icon: <FaCoins /> },
//     ],
//     Buyer: [
//       { name: "Home", path: "/dashboard/buyer-home", icon: <FaHome /> },
//       { name: "Add New Task", path: "/dashboard/add-task", icon: <FaTasks /> },
//       { name: "My Tasks", path: "/dashboard/my-tasks", icon: <FaTasks /> },
//       { name: "Purchase Coins", path: "/dashboard/purchase-coins", icon: <FaCoins /> },
//       { name: "Payment History", path: "/dashboard/payment-history", icon: <FaTasks /> },
//     ],
//     Admin: [
//       { name: "Home", path: "/dashboard/admin-home", icon: <FaHome /> },
//       { name: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsers /> },
//       { name: "Manage Tasks", path: "/dashboard/manage-tasks", icon: <FaTasks /> },
//       { name: "Withdraw Requests", path: "/dashboard/withdraw-requests", icon: <FaUserShield /> },
//     ],
//   };

//   return (
//     <>
//       {/* Overlay for small screens */}
//       <div
//         className={`fixed inset-0 bg-black opacity-50 z-20 md:hidden ${
//           sidebarOpen ? "block" : "hidden"
//         }`}
//         onClick={toggleSidebar}
//       ></div>

//       <aside
//         className={`fixed z-30 inset-y-0 left-0 w-64 bg-blue-800 shadow-md transform md:translate-x-0 transition-transform duration-200 ease-in-out
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
//         `}
//       >
//         <div className="p-4 text-xl font-bold border-b border-gray-200">
//           MicroTask Dashboard
//         </div>
//         <nav className="mt-4 flex flex-col gap-2">
//           {menuItems[role]?.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded"
//               onClick={toggleSidebar}
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span>{item.name}</span>
//             </Link>
//           ))}
//         </nav>
//       </aside>
//     </>
//   );
// };

//  export default Sidebar;




import {
  FaHome,
  FaTasks,
  FaUsers,
  FaCoins,
  FaUserShield,
} from "react-icons/fa";
import { Link } from "react-router";
 // ✅ Correct import

const Sidebar = ({ user, sidebarOpen, toggleSidebar }) => {
  const role = user?.role;

  const menuItems = {
    Worker: [
      { name: "Home", path: "/dashboard/worker-home", icon: <FaHome /> },
      { name: "Task List", path: "/dashboard/tasks", icon: <FaTasks /> },
      { name: "My Submissions", path: "/dashboard/my-submissions", icon: <FaTasks /> },
      { name: "Withdrawals", path: "/dashboard/withdrawals", icon: <FaCoins /> },
    ],
    Buyer: [
      { name: "Home", path: "/dashboard/buyer-home", icon: <FaHome /> },
      { name: "Add New Task", path: "/dashboard/add-task", icon: <FaTasks /> },
      { name: "My Tasks", path: "/dashboard/my-tasks", icon: <FaTasks /> },
      { name: "Purchase Coins", path: "/dashboard/purchase-coins", icon: <FaCoins /> },
      { name: "Payment History", path: "/dashboard/payment-history", icon: <FaTasks /> },
    ],
    Admin: [
      { name: "Home", path: "/dashboard/admin-home", icon: <FaHome /> },
      { name: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsers /> },
      { name: "Manage Tasks", path: "/dashboard/manage-tasks", icon: <FaTasks /> },
      { name: "Withdraw Requests", path: "/dashboard/withdraw-requests", icon: <FaUserShield /> },
    ],
  };

  return (
    <>
      {/* Overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-20 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-blue-800 text-white transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 shadow-lg`}
      >
        <div className="p-4 text-xl font-bold border-b border-blue-700">
          MicroTask Dashboard
        </div>

        <nav className="mt-4 flex flex-col gap-1">
          {menuItems[role]?.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={toggleSidebar}
              className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 hover:text-white rounded transition"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          )) || (
            <p className="text-sm px-4 text-yellow-300">
              No menu for this role: {role}
            </p>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

