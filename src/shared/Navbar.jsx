

// import { useContext, useEffect, useState } from "react";
// import { FaMoon, FaSun } from "react-icons/fa";

// import { Link, NavLink } from "react-router";
// import { AuthContext } from "../contexts/AuthContext";
// import useUserRole from "../hooks/useUserRole";
// import MicroTaskLogo from "./MicroTaskLogo";
// import LoadingSpinner from "./LoadingSpinner";

// const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext);
//    const [coins, setCoins] = useState(0);
//   const [isDark, setIsDark] = useState(() => {
//     return localStorage.getItem("theme") === "dark";
//   });
//    const { userData, loading } = useUserRole(user?.email);
  
// const role=userData?.role
// // console.log(role);

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



//   useEffect(() => {
//     const root = document.documentElement;
//     if (isDark) {
//       root.classList.add("dark");
//       root.setAttribute("data-theme", "dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       root.classList.remove("dark");
//       root.setAttribute("data-theme", "light");
//       localStorage.setItem("theme", "light");
//     }
//   }, [isDark]);

//   const toggleTheme = () => setIsDark(!isDark);

//   const handleLogout = () => {
//     logOut()
//       .then(() => {})
//       .catch((error) => console.error(error));
//   };

//   const navLinkStyle = ({ isActive }) =>
//     isActive
//       ? "border-b-2 border-blue-600 pb-[2px] font-semibold text-blue-600"
//       : "hover:text-blue-600";

//   const navLinks = (
//     <>
//       <li><NavLink to="/" className={navLinkStyle}><span className='font-bold text-blue-600'>Home</span></NavLink></li>
//       <li><NavLink to="/tasks" className={navLinkStyle}><span className='font-bold text-blue-600'>Tasks</span></NavLink></li>
//       {/* {user && <li><NavLink to="/dashboard" className={navLinkStyle}><span className='font-bold text-blue-600'>Dashboard</span></NavLink></li>} */}

// {user  && role ==='Worker' && <li><NavLink to="/dashboard/worker-home" className={navLinkStyle}><span className='font-bold text-blue-600'>Dashboard</span></NavLink></li>}


// {user  && role ==='Buyer' &&  <li><NavLink to="/dashboard/buyer-home" className={navLinkStyle}><span className='font-bold text-blue-600'>Dashboard</span></NavLink></li>}


// {user  && role ==='Admin' && <li><NavLink to="/dashboard/admin-home" className={navLinkStyle}><span className='font-bold text-blue-600'>Dashboard</span></NavLink></li>}


//     </>
//   );

// // if (loading){
// //   return <LoadingSpinner></LoadingSpinner>
// // }

//   return (
//     <div className="navbar bg-blue-300 shadow sticky top-0 z-50">
//       {/* Left */}
//       <div className="navbar-start hidden lg:block">
//       <MicroTaskLogo></MicroTaskLogo>
//       </div>

//       {/* Center */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 space-x-3">{navLinks}</ul>
//       </div>

//       {/* Right */}
//       <div className="navbar-end flex items-center gap-3">
//         <button onClick={toggleTheme} className="text-xl">
//           {isDark ? <FaSun /> : <FaMoon />}
//         </button>

//         {user ? (
//           <div className="flex items-center gap-3">
            
//             {/* Coin Badge */}
//              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
//                  💰 {coins} Coins
//               </span>
//             {/*  Photo */}
//             <img
//               src={user.photoURL}
//               alt="Profile"
//               className="w-8 h-8 rounded-full border-2 border-blue-500"
//             />
//             {/* Logout Button */}
//             <button onClick={handleLogout} className="btn btn-sm bg-pink-400 border-none">
//               Logout
//             </button>
//             <a href="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-Noushinzahan872" className="btn btn-sm bg-green-500 border-none">Join as</a>
//           </div>
//         ) : (
//           <>
//             <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
//             <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
//             <a href="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-Noushinzahan872" className="btn btn-sm bg-green-500 border-none">Join as</a>
            

//           </>
//         )}
//       </div>

//       {/* Mobile Dropdown */}
//       <div className="dropdown dropdown-end lg:hidden">
//         <label tabIndex={0} className="btn btn-ghost lg:hidden">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//             viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </label>
//         <ul tabIndex={0}
//           className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 dark:bg-gray-900">
//           {navLinks}
//         </ul>
//       </div>
//     </div>
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
  const { userData } = useUserRole(user?.email);

  const role = userData?.role;

  useEffect(() => {
    if (user?.email) {
      fetch(`https://micro-task-server-ashen.vercel.app/users/${user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user data");
          return res.json();
        })
        .then((data) => setCoins(data.coins || 0))
        .catch(() => setCoins(0));
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
    logOut().catch((error) => console.error(error));
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "border-b-2 border-blue-600 pb-[2px] font-semibold text-blue-600"
      : "hover:text-blue-600";

  return (
    <div className="navbar bg-blue-300 shadow sticky top-0 z-50">
      {/* Left */}
      <div className="navbar-start hidden lg:block">
        <MicroTaskLogo />
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-3">
          {/* Always visible routes */}
          <li>
            <NavLink to="/" className={navLinkStyle}>
              <span className="font-bold text-blue-600">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks" className={navLinkStyle}>
              <span className="font-bold text-blue-600">Tasks</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={navLinkStyle}>
              <span className="font-bold text-blue-600">Blogs</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="text-xl">
          {isDark ? <FaSun /> : <FaMoon />}
        </button>

        {/* If Logged in */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border-2 border-blue-500">
                <img src={user.photoURL} alt="Profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 dark:bg-gray-900"
            >
              {/* Coin Badge */}
              <li>
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-xl text-sm font-semibold">
                  💰 {coins} Coins
                </span>
              </li>

              {/* Dashboard (based on role) */}
              {role === "Worker" && (
                <li>
                  <NavLink to="/dashboard/worker-home" className={navLinkStyle}>
                    <span className="font-bold text-blue-600">Dashboard</span>
                  </NavLink>
                </li>
              )}
              {role === "Buyer" && (
                <li>
                  <NavLink to="/dashboard/buyer-home" className={navLinkStyle}>
                   <span className="font-bold text-blue-600">Dashboard</span>
                  </NavLink>
                </li>
              )}
              {role === "Admin" && (
                <li>
                  <NavLink to="/dashboard/admin-home" className={navLinkStyle}>
                    <span className="font-bold text-blue-600">Dashboard</span>
                  </NavLink>
                </li>
              )}

              {/* Profile */}
              <li>
                <NavLink to="/profile" className={navLinkStyle}>
                  <span className="font-bold text-blue-600">Profile</span>
                </NavLink>
              </li>
              <a href="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-Noushinzahan872" className="btn btn-sm bg-green-500 border-none rounded-xl">Join as Developer</a>

              {/* Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-pink-400 border-none w-full rounded-xl mt-1"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // If NOT Logged in
          <>
            <Link to="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary">
              Register
            </Link>
            <a href="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-Noushinzahan872" className="btn btn-sm bg-green-500 border-none">Join as</a>
          </>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 dark:bg-gray-900"
        >
          {/* Always visible */}
          <li>
            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks" className={navLinkStyle}>
              Tasks
            </NavLink>
          </li>

          {/* If logged in add extra */}
          {user && (
            <>
              {role === "Worker" && (
                <li>
                  <NavLink to="/dashboard/worker-home" className={navLinkStyle}>
                    Dashboard
                  </NavLink>
                </li>
              )}
              {role === "Buyer" && (
                <li>
                  <NavLink to="/dashboard/buyer-home" className={navLinkStyle}>
                    Dashboard
                  </NavLink>
                </li>
              )}
              {role === "Admin" && (
                <li>
                  <NavLink to="/dashboard/admin-home" className={navLinkStyle}>
                    Dashboard
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/profile" className={navLinkStyle}>
                  Profile
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-pink-400 border-none w-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
