


import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MyProfile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                {/* Profile Picture */}
                <div className="flex justify-center mb-4">
                    <div className="w-28 h-28 rounded-full border-4 border-blue-500 overflow-hidden shadow-md">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/2M7rtLk/user.png"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* User Info */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {user?.displayName || "No Name"}
                </h2>
                <p className="text-gray-500 text-sm mb-4">{user?.email}</p>

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-3 shadow">
                        <p className="text-lg font-bold text-blue-600">+880 1234 567890</p>
                        <p className="text-xs text-gray-500">Phone Number</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 shadow">
                        <p className="text-lg font-bold text-green-600">Dhaka, Bangladesh</p>
                        <p className="text-xs text-gray-500">Address</p>
                    </div>
                    
                </div>

                {/* Buttons */}
                <div className="flex gap-4 justify-center">
                    <button className="px-5 py-2 rounded-lg bg-blue-500 text-white shadow hover:bg-blue-600 transition">
                        Edit Profile
                    </button>

                </div>
            </div>
        </div>
    );
};

export default MyProfile;












// import { useContext } from "react";


// import LoadingSpinner from "./LoadingSpinner";
// import useUserRole from "../hooks/useUserRole";
// import { AuthContext } from "../contexts/AuthContext";


// const MyProfile = () => {
//   const { user } = useContext(AuthContext);
//   const { userData, loading } = useUserRole(user?.email);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

//       <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 border">
//         {/* Profile Image */}
//         <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
//           <img
//             src={userData?.photoURL || "https://via.placeholder.com/150"}
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Profile Info */}
//         <div className="flex-1 space-y-3">
//           <h3 className="text-xl font-semibold">{userData?.name}</h3>
//           <p className="text-gray-600"><span className="font-medium">Email:</span> {userData?.email}</p>
//           <p className="text-gray-600"><span className="font-medium">Phone:</span> {userData?.phone || "Not added"}</p>
//           <p className="text-gray-600"><span className="font-medium">Address:</span> {userData?.address || "Not added"}</p>
//           <p className="text-gray-600"><span className="font-medium">Role:</span> 
//             <span className="ml-2 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
//               {userData?.role}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;
