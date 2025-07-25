// import React from "react";
// import { FaBars, FaBell, FaSignOutAlt } from "react-icons/fa";

// const TopNavbar = ({ user, toggleSidebar, logOut }) => {
//   return (
//     <header className="flex items-center justify-between bg-white px-4 py-3 shadow sticky top-0 z-10">
//       <button
//         className="text-gray-700 md:hidden"
//         onClick={toggleSidebar}
//         aria-label="Toggle sidebar"
//       >
//         <FaBars size={24} />
//       </button>

//       <div className="flex items-center gap-4">
//         <span className="font-semibold text-lg">{user?.displayName || "User"}</span>
//         <span className="bg-yellow-400 text-black px-2 py-1 rounded font-semibold">
//           💰 {user?.coins || 0}
//         </span>
//         <img
//           src={user?.photoURL || "https://i.ibb.co/yX9tKqX/default-user.png"}
//           alt="Profile"
//           className="w-10 h-10 rounded-full border-2 border-gray-300"
//           title={user?.displayName}
//         />
//       </div>

//       <div className="flex items-center gap-4">
//         <button
//           className="relative text-gray-700 hover:text-blue-600"
//           aria-label="Notifications"
//           // Add onClick notification toggle later
//         >
//           <FaBell size={22} />
//           {/* Notification badge example */}
//           {/* <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
//             3
//           </span> */}
//         </button>

//         <button
//           onClick={logOut}
//           className="text-red-600 hover:text-red-800"
//           aria-label="Logout"
//         >
//           <FaSignOutAlt size={22} />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default TopNavbar;




// import { useEffect, useState } from "react";

// import useAuth from "../hooks/useAuth";
// import { Link } from "react-router";

// const TopNavbar = () => {
//   const { user, logOut } = useAuth();
//   const [coins, setCoins] = useState(0);

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`https://micro-task-server-ashen.vercel.app/users/${user.email}`)
//         .then((res) => {
//           if (!res.ok) throw new Error("Failed to fetch user data");
//           return res.json();
//         })
//         .then((data) => setCoins(data.coins || 0))
//         .catch((err) => {
//           console.error("Failed to load coins", err);
//           setCoins(0);
//         });
//     }
//   }, [user]);

//   return (
//     <div className="w-full bg-blue-900 text-white px-4 py-3 flex justify-between items-center shadow">
//       {/* Logo or Dashboard Title */}
//       <Link to="/" className="text-xl md:text-2xl font-bold">
//         MicroTask
//       </Link>

//       {/* Right side (Coins + Profile + Logout) */}
//       <div className="flex items-center gap-3 md:gap-5">
//         {/* Coin Display */}
//         <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
//           💰 {coins} Coins
//         </span>

//         {/* Profile Image */}
//         <img
//           src={user?.photoURL || "https://i.ibb.co/yX9tKqX/default-user.png"}
//           alt="User"
//           title={user?.displayName || ""}
//           className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
//         />

//         {/* Logout Button */}
//         <button
//           onClick={logOut}
//           className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs md:text-sm"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TopNavbar;






import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { BellIcon, MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import MicroTaskLogo from "../shared/MicroTaskLogo";


const TopNavbar = ({ onSidebarToggle }) => {
  const { user, logOut } = useAuth();
  const [coins, setCoins] = useState(0);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://micro-task-server-ashen.vercel.app/users/${user.email}`)
        .then((res) => res.ok ? res.json() : {})
        .then((data) => {
          setCoins(data?.coins || 0);
          setRole(data?.role || "");
        })
        .catch((err) => {
          console.error("Failed to load user data", err);
          setCoins(0);
        });
    }
  }, [user]);

  const handleLogout = () => {
    logOut();
    setCoins(0);
    setRole("");
    navigate("/login");
  };

  return (
    <div className="w-full bg-blue-300 text-black px-4 py-3 shadow flex justify-between items-center sticky top-0 z-50">
      {/* Left - Menu & Logo */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle (only on mobile) */}
        <button
          onClick={onSidebarToggle}
          className="md:hidden block focus:outline-none"
        >
          <MenuIcon className="w-6 h-6" />
        </button>

        <Link to="/" className="text-xl font-bold tracking-wide">
<div className="hidden lg:block">
  <MicroTaskLogo></MicroTaskLogo>
</div>
        </Link>
      </div>

      {/* Middle - Coin, Role, Name, Profile */}
      {user && (
        <div className="flex items-center gap-3">
          <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold">
            💰 {coins} Coins
          </span>

          <div className="text-xs md:text-sm hidden sm:block text-right">
            <p className="font-medium capitalize">{role || "User"}</p>
            <p className="text-gray-200">{user?.displayName || "Anonymous"}</p>
          </div>

          <img
            src={user?.photoURL || "https://i.ibb.co/yX9tKqX/default-user.png"}
            alt="User"
            title={user?.displayName || ""}
            className="w-9 h-9 rounded-full border-2 border-white"
          />
        </div>
      )}

      {/* Right - Notification & Logout */}
      <div className="flex items-center gap-3">
        {user && (
          <>
            <button className="relative hover:text-yellow-300">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button
              onClick={handleLogout}
              className="bg-pink-400 hover:bg-pink-500 px-3 py-1 rounded text-xs md:text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
