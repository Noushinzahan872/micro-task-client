
import Swal from "sweetalert2";

import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const PurchaseCoins = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDummyPurchase = async (coins, amount) => {
    // 1. Save Payment Info
    const paymentInfo = {
      email: user.email,
      coins,
      amount,
      paymentDate: new Date(),
    };

    const paymentRes = await fetch("http://localhost:3000/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentInfo),
    });

    // 2. Increase user coins
    const coinRes = await fetch(`http://localhost:3000/users/add-coins/${user.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coins }),
    });

    if (paymentRes.ok && coinRes.ok) {
      Swal.fire("Success!", `You received ${coins} coins.`, "success");
      navigate("/dashboard/buyer-home");
    } else {
      Swal.fire("Error", "Payment failed.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Purchase Coins (Dummy Payment)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[ 
          { coins: 10, amount: 1 },
          { coins: 150, amount: 10 },
          { coins: 500, amount: 20 },
          { coins: 1000, amount: 35 }
        ].map(({ coins, amount }) => (
          <div key={coins} className="border p-4 rounded shadow text-center">
            <h3 className="text-xl font-semibold">{coins} Coins</h3>
            <p>= ${amount}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => handleDummyPurchase(coins, amount)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoins;
