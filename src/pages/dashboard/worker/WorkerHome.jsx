

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const WorkerHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      // Load Stats
      fetch(`https://micro-task-server-ashen.vercel.app/worker-stats/${user.email}`)
        .then(res => res.json())
        .then(data => setStats(data));

      // Load Approved Submissions
      fetch(`https://micro-task-server-ashen.vercel.app/submissions/worker/${user.email}?status=approved`)
        .then(res => res.json())
        .then(data => setApprovedSubmissions(data));
    }
  }, [user]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-600"> Worker Dashboard</h2>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center text-black">
          <h4 className="text-lg font-semibold mb-1">Total Submissions</h4>
          <p className="text-3xl font-bold">{stats.totalSubmissions || 0}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow text-center text-black">
          <h4 className="text-lg font-semibold mb-1">Pending Submissions</h4>
          <p className="text-3xl font-bold">{stats.pendingSubmissions || 0}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow text-center text-black">
          <h4 className="text-lg font-semibold mb-1">Total Earnings</h4>
          <p className="text-3xl font-bold">${stats.totalEarnings || 0}</p>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div>
        <h3 className="text-xl font-bold mb-4">✅ Approved Submissions</h3>
        {approvedSubmissions.length === 0 ? (
          <p className="text-gray-500">No approved submissions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border">
              <thead className="bg-blue-300 text-black">
                <tr>
                  <th></th>
                  <th>Task Title</th>
                  <th>Buyer Name</th>
                  <th>Payable</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {approvedSubmissions.map((sub, i) => (
                  <tr key={sub._id} className="hover:bg-gray-50">
                    <td>{i + 1}</td>
                    <td>{sub.task_title}</td>
                    <td>{sub.buyer_name}</td>
                    <td>${sub.payable_amount}</td>
                    <td><span className="text-green-600 font-medium capitalize">{sub.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerHome;



