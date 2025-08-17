import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
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
            <p className="text-lg font-bold text-blue-600">120</p>
            <p className="text-xs text-gray-500">Tasks</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 shadow">
            <p className="text-lg font-bold text-green-600">450</p>
            <p className="text-xs text-gray-500">Coins</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 shadow">
            <p className="text-lg font-bold text-purple-600">15</p>
            <p className="text-xs text-gray-500">Submissions</p>
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

export default Profile;
