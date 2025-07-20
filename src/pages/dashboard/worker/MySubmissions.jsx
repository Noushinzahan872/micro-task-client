



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
      <h2 className="text-2xl font-bold mb-6 text-blue-600">My Submissions thik</h2>

      {submissions.length === 0 ? (
        <p className="text-gray-600">No submissions found.</p>
      ) : (
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



