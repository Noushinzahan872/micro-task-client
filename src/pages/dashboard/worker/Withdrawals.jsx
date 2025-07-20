// import { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import Swal from "sweetalert2";

// const Withdrawals = () => {
//   const { user } = useAuth();
//   const [userData, setUserData] = useState({});
//   const [coin, setCoin] = useState(0);
//   const [amount, setAmount] = useState(0);
//   const [system, setSystem] = useState("Bkash");
//   const [account, setAccount] = useState("");

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:3000/users/${user.email}`)
//         .then((res) => res.json())
//         .then((data) => setUserData(data));
//     }
//   }, [user]);

//   const handleCoinChange = (e) => {
//     const val = parseInt(e.target.value);
//     setCoin(val);
//     setAmount(val / 20);
//   };

//   const handleWithdraw = async () => {
//     const withdrawal = {
//       worker_email: user.email,
//       worker_name: userData.name,
//       withdrawal_coin: coin,
//       withdrawal_amount: amount,
//       payment_system: system,
//       account_number: account,
//       withdraw_date: new Date().toISOString(),
//       status: "pending",
//     };

//     const res = await fetch("http://localhost:3000/withdrawals", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(withdrawal),
//     });

//     const data = await res.json();
//     if (data.insertedId) {
//       Swal.fire("Success", "Withdrawal request submitted", "success");
//       setCoin(0);
//       setAmount(0);
//       setAccount("");
//     }
//   };

//   const canWithdraw = userData.coins >= 200;

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Withdraw Earnings</h2>
//       <div className="bg-gray-100 p-4 rounded-lg mb-6">
//         <p>
//           <strong>Total Coins:</strong> {userData.coins || 0}
//         </p>
//         <p>
//           <strong>Withdrawable Amount:</strong> ${((userData.coins || 0) / 20).toFixed(2)}
//         </p>
//       </div>

//       {canWithdraw ? (
//         <div className="bg-white p-4 shadow rounded-lg">
//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Coin To Withdraw</label>
//             <input
//               type="number"
//               value={coin}
//               onChange={handleCoinChange}
//               max={userData.coins || 0}
//               className="input input-bordered w-full"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Withdraw Amount ($)</label>
//             <input
//               type="number"
//               value={amount}
//               readOnly
//               className="input input-bordered w-full bg-gray-100"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Select Payment System</label>
//             <select
//               value={system}
//               onChange={(e) => setSystem(e.target.value)}
//               className="select select-bordered w-full"
//             >
//               <option>Bkash</option>
//               <option>Rocket</option>
//               <option>Nagad</option>
//               <option>Bank</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-semibold">Account Number</label>
//             <input
//               type="text"
//               value={account}
//               onChange={(e) => setAccount(e.target.value)}
//               className="input input-bordered w-full"
//             />
//           </div>

//           <button onClick={handleWithdraw} className="btn btn-success w-full">
//             Submit Withdrawal
//           </button>
//         </div>
//       ) : (
//         <p className="text-red-500 text-center">Insufficient coins (200+ required)</p>
//       )}
//     </div>
//   );
// };

// export default Withdrawals;




import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Withdrawals = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [coin, setCoin] = useState(0);
  const [amount, setAmount] = useState(0);
  const [system, setSystem] = useState("Bkash");
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserData(data));
    }
  }, [user]);

  const handleCoinChange = (e) => {
    const val = parseInt(e.target.value);
    setCoin(val);
    setAmount(val / 20);
  };

  const handleWithdraw = async () => {
    if (coin < 200 || coin > userData.coins) {
      return Swal.fire("Error", "Please enter a valid coin amount (min 200)", "error");
    }

    if (!account) {
      return Swal.fire("Error", "Please enter your account number", "error");
    }

    const withdrawal = {
      worker_email: user.email,
      worker_name: userData.name,
      withdrawal_coin: coin,
      withdrawal_amount: amount,
      payment_system: system,
      account_number: account,
      withdraw_date: new Date().toISOString(),
      status: "pending",
    };

    try {
      const res = await fetch("http://localhost:3000/withdrawals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(withdrawal),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Withdrawal Complete", "Your request has been submitted", "success");
        setCoin(0);
        setAmount(0);
        setAccount("");

        // refresh user data
        const updated = await fetch(`http://localhost:3000/users/${user.email}`);
        const updatedUser = await updated.json();
        setUserData(updatedUser);
      } else {
        Swal.fire("Error", data.message || "Something went wrong", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server error, try again later", "error");
    }
  };

  const canWithdraw = userData.coins >= 200;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Withdraw Earnings</h2>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-black">
          <strong>Total Coins:</strong> {userData.coins || 0}
        </p>
        <p className="text-black">
          <strong>Withdrawable Amount:</strong> ${((userData.coins || 0) / 20).toFixed(2)}
        </p>
      </div>

      {canWithdraw ? (
        <div className="bg-white p-4 shadow rounded-lg">
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Coin To Withdraw</label>
            <input
              type="number"
              value={coin}
              onChange={handleCoinChange}
              max={userData.coins || 0}
              min={200}
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4 text-black">
            <label className="block mb-1 font-semibold">Withdraw Amount ($)</label>
            <input
              type="number"
              value={amount}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Select Payment System</label>
            <select
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              className="select select-bordered w-full"
            >
              <option>Bkash</option>
              <option>Rocket</option>
              <option>Nagad</option>
              <option>Bank</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Account Number</label>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <button onClick={handleWithdraw} className="btn btn-success w-full">
            Submit Withdrawal
          </button>
        </div>
      ) : (
        <p className="text-red-500 text-center">Insufficient coins (min 200 required)</p>
      )}
    </div>
  );
};

export default Withdrawals;
