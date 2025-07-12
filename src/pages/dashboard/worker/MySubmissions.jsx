


import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MySubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/submissions/worker/${user.email}`)
        .then((res) => res.json())
        .then((data) => setSubmissions(data));
    }
  }, [user]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-gray-600">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-blue-100">
              <tr>
                <th>#</th>
                <th>Task Title</th>
                <th>Buyer</th>
                <th>Pay</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, i) => (
                <tr key={sub._id}>
                  <td>{i + 1}</td>
                  <td>{sub.task_title}</td>
                  <td>{sub.buyer_name || "N/A"}</td>
                  <td>{sub.payable_amount} coins</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        sub.status === "approved"
                          ? "bg-green-500"
                          : sub.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td>{new Date(sub.submission_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySubmissions;





// import { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import Swal from "sweetalert2";

// const MySubmissions = () => {
//   const { user } = useAuth();
//   const [submissions, setSubmissions] = useState([]);

//   const loadSubmissions = () => {
//     fetch(`http://localhost:3000/submissions/worker/${user.email}`)
//       .then((res) => res.json())
//       .then((data) => setSubmissions(data));
//   };

//   useEffect(() => {
//     if (user?.email) {
//       loadSubmissions();
//     }
//   }, [user]);

//   const handleApprove = async (id) => {
//     const res = await fetch(`http://localhost:3000/submissions/${id}/approve`, {
//       method: "PATCH",
//     });
//     const data = await res.json();
//     if (data.message) {
//       Swal.fire("Approved", data.message, "success");
//       loadSubmissions(); // Refresh list
//     }
//   };

//   const handleReject = async (id) => {
//     const res = await fetch(`http://localhost:3000/submissions/${id}/reject`, {
//       method: "PATCH",
//     });
//     const data = await res.json();
//     if (data.message) {
//       Swal.fire("Rejected", data.message, "warning");
//       loadSubmissions(); // Refresh list
//     }
//   };

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">My Submissions</h2>

//       {submissions.length === 0 ? (
//         <p className="text-gray-600">No submissions found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full border">
//             <thead className="bg-blue-100">
//               <tr>
//                 <th>#</th>
//                 <th>Task Title</th>
//                 <th>Buyer</th>
//                 <th>Pay</th>
//                 <th>Status</th>
//                 <th>Submitted</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submissions.map((sub, i) => (
//                 <tr key={sub._id}>
//                   <td>{i + 1}</td>
//                   <td>{sub.task_title}</td>
//                   <td>{sub.buyer_name || "N/A"}</td>
//                   <td>{sub.payable_amount} coins</td>
//                   <td>
//                     <span
//                       className={`px-2 py-1 rounded text-white text-sm ${
//                         sub.status === "approved"
//                           ? "bg-green-500"
//                           : sub.status === "pending"
//                           ? "bg-yellow-500"
//                           : "bg-red-500"
//                       }`}
//                     >
//                       {sub.status}
//                     </span>
//                   </td>
//                   <td>
//                     {sub.submit_date
//                       ? new Date(sub.submit_date).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td>
//                     {sub.status === "pending" && (
//                       <div className="flex gap-2">
//                         <button
//                           className="btn btn-xs btn-success"
//                           onClick={() => handleApprove(sub._id)}
//                         >
//                           Approve
//                         </button>
//                         <button
//                           className="btn btn-xs btn-error"
//                           onClick={() => handleReject(sub._id)}
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MySubmissions;




