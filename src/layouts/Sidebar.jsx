

import {
  FaHome,
  FaTasks,
  FaUsers,
  FaCoins,
  FaUserShield,
} from "react-icons/fa";

import { Link } from "react-router";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { user } = useAuth();
  const { userData, loading } = useUserRole(user?.email);

  const role = userData?.role;

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  const menuItems = [
    ...(role === "Worker"
      ? [
          { name: "Home", path: "/dashboard/worker-home", icon: <FaHome /> },
          { name: "Task List", path: "/dashboard/tasks", icon: <FaTasks /> },
          { name: "My Submissions", path: "/dashboard/my-submissions", icon: <FaTasks /> },
          { name: "Withdrawals", path: "/dashboard/withdrawals", icon: <FaCoins /> },
        ]
      : []),

    ...(role === "Buyer"
      ? [
          { name: "Home", path: "/dashboard/buyer-home", icon: <FaHome /> },
          { name: "Add New Task", path: "/dashboard/add-task", icon: <FaTasks /> },
          { name: "My Tasks", path: "/dashboard/my-tasks", icon: <FaTasks /> },
          { name: "Purchase Coins", path: "/dashboard/purchase-coins", icon: <FaCoins /> },
          { name: "Payment History", path: "/dashboard/payment-history", icon: <FaTasks /> },
        ]
      : []),

    ...(role === "Admin"
      ? [
          { name: "Home", path: "/dashboard/admin-home", icon: <FaHome /> },
          { name: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsers /> },
          { name: "Manage Tasks", path: "/dashboard/manage-tasks", icon: <FaTasks /> },
          { name: "Withdraw Requests", path: "/dashboard/withdraw-requests", icon: <FaUserShield /> },
        ]
      : []),
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-20 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-blue-600 text-white transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block shadow-lg`}
      >
        <div className="p-4 text-xl font-bold border-b border-blue-600 sticky top-0 bg-blue-600 z-10">
          MicroTask Dashboard
        </div>

        <nav className="mt-4 flex flex-col gap-1 p-2">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={toggleSidebar}
                className="flex items-center gap-3 px-4 py-2 hover:bg-blue-800 hover:text-white rounded transition"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))
          ) : (
            <p className="text-sm px-4 text-yellow-300">
              No menu found for role: <strong>{role || "Unknown"}</strong>
            </p>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;









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
//         className={`fixed z-30 inset-y-0 left-0 w-64 bg-blue-800 text-white transform transition-transform duration-200 ease-in-out
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 shadow-lg`}
//       >
//         <div className="p-4 text-xl font-bold border-b border-blue-700">
//           MicroTask Dashboard
//         </div>

//         <nav className="mt-4 flex flex-col gap-1">
//           {menuItems[role]?.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               onClick={toggleSidebar}
//               className="flex items-center gap-3 px-4 py-2 hover:bg-blue-600 hover:text-white rounded transition"
//             >
//               <span className="text-lg">{item.icon}</span>
//               <span>{item.name}</span>
//             </Link>
//           )) || (
//             <p className="text-sm px-4 text-yellow-300">
//               No menu for this role: {role}
//             </p>
//           )}
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;


