import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    await fetch(`http://localhost:3000/users/${id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="min-w-full border bg-white rounded shadow">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Coins</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="text-center border-t hover:bg-blue-50">
              <td className="p-2">
                <img src={u.photo || "https://i.ibb.co/yX9tKqX/default-user.png"} className="w-10 h-10 rounded-full mx-auto" />
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Admin">Admin</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Worker">Worker</option>
                </select>
              </td>
              <td>{u.coins}</td>
              <td>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
