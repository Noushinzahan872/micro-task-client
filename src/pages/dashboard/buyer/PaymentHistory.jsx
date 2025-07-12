import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/payments/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setPayments(data);
          } else {
            setPayments([]); // fallback
          }
        })
        .catch((err) => console.error("Failed to fetch payments", err));
    }
  }, [user]);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payments found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Transaction ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Coins</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Amount ($)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm">{index + 1}</td>
                  <td className="px-6 py-3 text-sm">{payment.transactionId || "N/A"}</td>
                  <td className="px-6 py-3 text-sm">{payment.coins}</td>
                  <td className="px-6 py-3 text-sm">${payment.amount}</td>
                  <td className="px-6 py-3 text-sm">
                    {new Date(payment.paymentDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
