


// import { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import Swal from "sweetalert2";

// const BuyerHome = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({});
//   const [submissions, setSubmissions] = useState([]);

//   // Load Buyer Stats (Task Count, Pending Workers, Total Paid)
//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:3000/buyer-stats/${user.email}`)
//         .then((res) => res.json())
//         .then((data) => setStats(data));
//     }
//   }, [user]);

//   // Load pending submissions
//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:3000/submissions/buyer/${user.email}?status=pending`)
//         .then((res) => res.json())
//         .then((data) => setSubmissions(data));
//     }
//   }, [user]);

//   const handleApprove = async (id) => {
//     const res = await fetch(`http://localhost:3000/submissions/${id}/approve`, {
//       method: "PATCH",
//     });
//     const data = await res.json();
//     if (data.message) {
//       Swal.fire("Success", data.message, "success");
//       setSubmissions(submissions.filter((s) => s._id !== id));
//     }
//   };

//   const handleReject = async (id) => {
//     const res = await fetch(`http://localhost:3000/submissions/${id}/reject`, {
//       method: "PATCH",
//     });
//     const data = await res.json();
//     if (data.message) {
//       Swal.fire("Rejected", data.message, "warning");
//       setSubmissions(submissions.filter((s) => s._id !== id));
//     }
//   };

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Buyer Dashboard Overview</h2>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
//           <h4 className="text-xl font-semibold mb-1">Total Tasks</h4>
//           <p className="text-3xl font-bold">{stats.totalTasks || 0}</p>
//         </div>
//         <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
//           <h4 className="text-xl font-semibold mb-1">Pending Workers</h4>
//           <p className="text-3xl font-bold">{stats.pendingWorkers || 0}</p>
//         </div>
//         <div className="bg-green-100 p-6 rounded-lg shadow text-center">
//           <h4 className="text-xl font-semibold mb-1">Total Paid</h4>
//           <p className="text-3xl font-bold">${stats.totalPaid || 0}</p>
//         </div>
//       </div>

//       {/* Pending Submissions */}
//       <div>
//         <h3 className="text-xl font-bold mb-4">Pending Submissions</h3>
//         {submissions.length === 0 ? (
//           <p className="text-gray-500">No pending submissions found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="table w-full border">
//               <thead className="bg-blue-50">
//                 <tr>
//                   <th>#</th>
//                   <th>Worker Name</th>
//                   <th>Task Title</th>
//                   <th>Amount</th>
//                   <th>Submission</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submissions.map((sub, i) => (
//                   <tr key={sub._id} className="hover:bg-gray-50">
//                     <td>{i + 1}</td>
//                     <td>{sub.worker_name}</td>
//                     <td>{sub.task_title}</td>
//                     <td>${sub.payable_amount}</td>
//                     <td>
//                       <button
//                         onClick={() =>
//                           Swal.fire({
//                             title: "Submission Detail",
//                             text: sub.submission_detail,
//                             icon: "info",
//                           })
//                         }
//                         className="btn btn-sm btn-info"
//                       >
//                         View
//                       </button>
//                     </td>
//                     <td className="space-x-2">
//                       <button
//                         onClick={() => handleApprove(sub._id)}
//                         className="btn btn-sm btn-success"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleReject(sub._id)}
//                         className="btn btn-sm btn-error"
//                       >
//                         Reject
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BuyerHome;




import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { Dialog } from "@headlessui/react";
import useAuth from "../../../hooks/useAuth";

const BuyerHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 📊 Load Buyer Stats
  const fetchStats = async () => {
    try {
      const res = await fetch(`http://localhost:3000/buyer-stats/${user.email}`);
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Stats load error", error);
    }
  };

  // ⏳ Load Submissions
  const fetchSubmissions = async () => {
    try {
      const res = await fetch(`http://localhost:3000/submissions/buyer/${user.email}?status=pending`);
      const data = await res.json();
      setSubmissions(data);
    } catch (error) {
      console.error("Submissions load error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.email) {
      fetchStats();
      fetchSubmissions();
    }
  }, [user]);

  // ✅ Approve
  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve Submission?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`http://localhost:3000/submissions/${id}/approve`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.message) {
        Swal.fire("Approved", data.message, "success");
        fetchSubmissions();
      }
    }
  };

  // ❌ Reject
  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject Submission?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (confirm.isConfirmed) {
      const res = await fetch(`http://localhost:3000/submissions/${id}/reject`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.message) {
        Swal.fire("Rejected", data.message, "warning");
        fetchSubmissions();
      }
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Buyer Dashboard Overview</h2>

      {/* 📊 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="📋 Total Tasks" value={stats.totalTasks || 0} bg="blue-100" />
        <StatCard title="⏳ Pending Workers" value={stats.pendingWorkers || 0} bg="yellow-100" />
        <StatCard title="💸 Total Paid" value={`$${stats.totalPaid || 0}`} bg="green-100" />
      </div>

      {/* 📨 Submissions */}
      <div>
        <h3 className="text-xl font-bold mb-4">Pending Submissions</h3>
        {loading ? (
          <p>Loading...</p>
        ) : submissions.length === 0 ? (
          <p className="text-gray-500">No pending submissions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border">
              <thead className="bg-blue-100 text-black font-semibold">
                <tr>
                  <th>#</th>
                  <th>👨‍💻 Worker</th>
                  <th>📝 Task</th>
                  <th>💰 Amount</th>
                  <th>🔍 View</th>
                  <th>⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, i) => (
                  <tr key={sub._id} className="hover:bg-blue-50 text-center">
                    <td>{i + 1}</td>
                    <td>{sub.worker_name}</td>
                    <td>{sub.task_title}</td>
                    <td>{sub.payable_amount} Coins</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => {
                          setSelectedSubmission(sub);
                          setIsModalOpen(true);
                        }}
                      >
                        View
                      </button>
                    </td>
                    <td className="space-x-1">
                      <button
                        onClick={() => handleApprove(sub._id)}
                        className="btn btn-sm btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(sub._id)}
                        className="btn btn-sm btn-error"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Modal for Submission Detail */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg max-w-md w-full shadow-lg p-6">
            <Dialog.Title className="text-lg font-bold mb-2">Submission Details</Dialog.Title>
            <p className="text-gray-700">
              {selectedSubmission?.submission_detail || "No detail provided."}
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

// 🔄 Stat Card Component
const StatCard = ({ title, value, bg }) => (
  <div className={`bg-${bg} p-6 rounded-lg shadow text-center`}>
    <h4 className="text-lg font-semibold mb-1">{title}</h4>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

export default BuyerHome;
