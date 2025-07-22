



// import { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";

// const MySubmissions = () => {
//   const { user } = useAuth();
//   const [submissions, setSubmissions] = useState([]);

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`https://micro-task-server-ashen.vercel.app/submissions/worker/${user.email}`)
//         .then((res) => res.json())
//         .then((data) => setSubmissions(data));
//     }
//   }, [user]);

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-blue-600">My Submissions thik</h2>

//       {submissions.length === 0 ? (
//         <p className="text-gray-600">No submissions found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead className="bg-blue-300 text-black">
//               <tr>
//                 <th></th>
//                 <th>Task Title</th>
//                 <th>Buyer</th>
//                 <th>Pay</th>
//                 <th>Status</th>
//                 <th>Submitted</th>
//               </tr>
//             </thead>
//             <tbody className="text-black">
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
//                   <td>{new Date(sub.submission_date).toLocaleDateString()}</td>
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



import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";


const ITEMS_PER_PAGE = 5;

const MySubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://micro-task-server-ashen.vercel.app/submissions/worker/${user.email}`)
        .then((res) => res.json())
        .then((data) => setSubmissions(data));
    }
  }, [user]);

  const totalPages = Math.ceil(submissions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSubmissions = submissions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">My Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-gray-600">No submissions found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-blue-300 text-black">
                <tr>
                  <th></th>
                  <th>Task Title</th>
                  <th>Buyer</th>
                  <th>Pay</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {currentSubmissions.map((sub, i) => (
                  <tr key={sub._id}>
                    <td>{startIndex + i + 1}</td>
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

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="text-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MySubmissions;

