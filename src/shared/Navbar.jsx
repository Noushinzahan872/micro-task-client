



// import { useEffect, useState } from "react";
// import useAuth from "../hooks/useAuth";
// import { Link } from "react-router";


// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [coins, setCoins] = useState(0);

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:3000/users/${user.email}`)
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
//     <nav className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
//       {/* Website Logo */}
//       <Link to="/" className="text-2xl font-bold">
//         MicroTask
//       </Link>

//       {/* Navigation Menu */}
//       <div className="flex items-center gap-5">
//         {!user ? (
//           <>
//             <Link to="/login" className="hover:underline">
//               Login
//             </Link>
//             <Link to="/register" className="hover:underline">
//               Register
//             </Link>
//             <a
//               href="https://github.com/yourclientrepo"
//               target="_blank"
//               rel="noreferrer"
//               className="hover:underline"
//             >
//               Join as Developer
//             </a>
//           </>
//         ) : (
//           <>
//             <Link to="/dashboard" className="hover:underline">
//               Dashboard
//             </Link>

//             {/* Show Coins */}
//             <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
//               💰 {coins} Coins
//             </span>

//             {/* User Profile Image */}
//             <img
//               src={user?.photoURL || "https://i.ibb.co/yX9tKqX/default-user.png"}
//               alt={user?.displayName || "User"}
//               title={user?.displayName || ""}
//               className="w-10 h-10 rounded-full border-2 border-white"
//             />

//             {/* Logout Button */}
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
//             >
//               Logout
//             </button>

//             {/* External Link */}
//             <a
//               href="https://github.com/yourclientrepo"
//               target="_blank"
//               rel="noreferrer"
//               className="hover:underline"
//             >
//               Join as Developer
//             </a>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

import { FaBars } from "react-icons/fa";
import { Link } from "react-router";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [coins, setCoins] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/users/${user.email}`)
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

  const handleLogout = () => {
    logOut();
  };

  return (
    <nav className="bg-blue-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          MicroTask
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-5">
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
              <a
                href="https://github.com/yourclientrepo"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Join as Developer
              </a>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                💰 {coins} Coins
              </span>
              <img
                src={user?.photoURL || "https://i.ibb.co/yX9tKqX/default-user.png"}
                alt={user?.displayName || "User"}
                title={user?.displayName || ""}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
              <a
                href="https://github.com/yourclientrepo"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Join as Developer
              </a>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
              <a
                href="https://github.com/yourclientrepo"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Join as Developer
              </a>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                💰 {coins} Coins
              </span>
              <div className="flex items-center gap-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/yX9tKqX/default-user.png"}
                  alt={user?.displayName || "User"}
                  className="w-8 h-8 rounded-full border"
                />
                <span>{user?.displayName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
              <a
                href="https://github.com/yourclientrepo"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Join as Developer
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
