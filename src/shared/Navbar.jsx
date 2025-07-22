


// import { useEffect, useState } from "react";
// import useAuth from "../hooks/useAuth";

// import { FaBars } from "react-icons/fa";
// import { Link } from "react-router";
// import MicroTaskLogo from "./MicroTaskLogo";

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [coins, setCoins] = useState(0);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

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

//   const handleLogout = () => {
//     logOut();
//   };

//   return (
//     <nav className="bg-blue-800 text-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         <MicroTaskLogo></MicroTaskLogo>

//         {/* Mobile menu button */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-white focus:outline-none"
//           >
//             <FaBars size={24} />
//           </button>
//         </div>

//         {/* Desktop menu */}
//         <div className="hidden md:flex items-center gap-5">
//           {!user ? (
//             <>
//               <Link to="/login" className="hover:underline">
//                 Login
//               </Link>
//               <Link to="/register" className="hover:underline">
//                 Register
//               </Link>
//               <a
//                 href="https://github.com/yourclientrepo"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="hover:underline"
//               >
//                 Join as Developer
//               </a>
//             </>
//           ) : (
//             <>
//               <Link to="/dashboard" className="hover:underline">
//                 Dashboard
//               </Link>
//               <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
//                 💰 {coins} Coins
//               </span>
//               <img
//                 src={user?.photoURL || "https://i.ibb.co/yX9tKqX/default-user.png"}
//                 alt={user?.displayName || "User"}
//                 title={user?.displayName || ""}
//                 className="w-10 h-10 rounded-full border-2 border-white"
//               />
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
//               >
//                 Logout
//               </button>
//               <a
//                 href="https://github.com/yourclientrepo"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="hover:underline"
//               >
//                 Join as Developer
//               </a>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
//           {!user ? (
//             <>
//               <Link to="/login" className="hover:underline">
//                 Login
//               </Link>
//               <Link to="/register" className="hover:underline">
//                 Register
//               </Link>
//               <a
//                 href="https://github.com/yourclientrepo"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="hover:underline"
//               >
//                 Join as Developer
//               </a>
//             </>
//           ) : (
//             <>
//               <Link to="/dashboard" className="hover:underline">
//                 Dashboard
//               </Link>
//               <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
//                 💰 {coins} Coins
//               </span>
//               <div className="flex items-center gap-2">
//                 <img
//                   src={user?.photoURL || "https://i.ibb.co/yX9tKqX/default-user.png"}
//                   alt={user?.displayName || "User"}
//                   className="w-8 h-8 rounded-full border"
//                 />
//                 <span>{user?.displayName}</span>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
//               >
//                 Logout
//               </button>
//               <a
//                 href="https://github.com/yourclientrepo"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="hover:underline"
//               >
//                 Join as Developer
//               </a>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;






import { useContext, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import useUserRole from "../hooks/useUserRole";
import MicroTaskLogo from "./MicroTaskLogo";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
   const [coins, setCoins] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
   const { userData, loading } = useUserRole(user?.email);
  
const role=userData?.role
// console.log(role);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://micro-task-server-ashen.vercel.app/users/${user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user data");
          return res.json();
        })
        .then((data) => setCoins(data.coins || 0))
        .catch((err) => {
          console.error("Failed to load coins", err);
          setCoins(0);
        });
    }
  }, [user]);



  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "border-b-2 border-blue-600 pb-[2px] font-semibold text-blue-600"
      : "hover:text-blue-600";

  const navLinks = (
    <>
      <li><NavLink to="/" className={navLinkStyle}><span className='font-bold text-blue-600'>Home</span></NavLink></li>
      {/* <li><NavLink to="/tasks" className={navLinkStyle}>Tasks</NavLink></li> */}
      {/* {user && <li><NavLink to="/dashboard" className={navLinkStyle}><span className='font-bold text-blue-600'>Dashboard</span></NavLink></li>} */}

{user  && role ==='Worker' && <li><NavLink to="/dashboard/worker-home" className={navLinkStyle}><span className='font-bold text-blue-600'>Dashboard</span></NavLink></li>}


{user  && role ==='Buyer' &&  <li><NavLink to="/dashboard/buyer-home" className={navLinkStyle}><span className='font-bold text-blue-600'>Dashboard</span></NavLink></li>}


{user  && role ==='Admin' && <li><NavLink to="/dashboard/admin-home" className={navLinkStyle}><span className='font-bold text-blue-600'>Dashboard</span></NavLink></li>}


    </>
  );

// if (loading){
//   return <h1>loading...</h1>
// }

  return (
    <div className="navbar bg-blue-300 shadow sticky top-0 z-50">
      {/* Left */}
      <div className="navbar-start">
        {/* <Link to="/" className="text-2xl font-bold text-blue-600">MicroTask</Link> */}
      <MicroTaskLogo></MicroTaskLogo>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-3">{navLinks}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex items-center gap-3">
        <button onClick={toggleTheme} className="text-xl">
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            
            {/* Coin Badge */}
             <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                 💰 {coins} Coins
              </span>
            {/* Profile Photo */}
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-blue-500"
            />
            {/* Logout Button */}
            <button onClick={handleLogout} className="btn btn-sm bg-pink-400 border-none">
              Logout
            </button>
            <Link to="/https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-Noushinzahan872" className="btn btn-sm bg-green-500 border-none">Join as Developer</Link>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
            <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
            <Link to="" className="btn btn-sm bg-green-500 border-none">Join as Developer</Link>

          </>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 dark:bg-gray-900">
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
