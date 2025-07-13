// const AdminHome = () => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">🛡️ Admin Dashboard</h2>
//       <p>This is your Admin dashboard overview.</p>
//     </div>
//   );
// };

// export default AdminHome;



import { useEffect, useState } from "react";

const AdminHome = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/admin-stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) return <p className="p-4">Loading stats...</p>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Workers" value={stats.totalWorkers} />
      <StatCard title="Total Buyers" value={stats.totalBuyers} />
      <StatCard title="Total Coins" value={stats.totalCoins} />
      <StatCard title="Total Payments" value={`$${stats.totalPayments}`} />
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded p-4 text-center border-l-4 border-blue-600">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl mt-2 font-bold text-blue-800">{value}</p>
  </div>
);

export default AdminHome;
