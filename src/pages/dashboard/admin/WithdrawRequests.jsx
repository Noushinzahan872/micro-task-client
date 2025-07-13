import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const WithdrawRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchWithdrawals = async () => {
    const res = await fetch("http://localhost:3000/withdrawals/pending");
    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Mark as Paid?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
    });

    if (confirm.isConfirmed) {
      await fetch(`http://localhost:3000/withdrawals/${id}/approve`, {
        method: "PATCH",
      });
      fetchWithdrawals();
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Pending Withdraw Requests</h2>
      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Coin</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Account</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="text-center border-t hover:bg-blue-50">
              <td>{req.worker_name}</td>
              <td>{req.worker_email}</td>
              <td>{req.withdrawal_coin}</td>
              <td>${req.withdrawal_amount}</td>
              <td>{req.payment_system}</td>
              <td>{req.account}</td>
              <td>
                <button
                  onClick={() => handleApprove(req._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
                >
                  Payment Success
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawRequests;
