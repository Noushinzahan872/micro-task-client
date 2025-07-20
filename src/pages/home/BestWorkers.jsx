import { useEffect, useState } from "react";

const BestWorkers = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/user/top-workers")
      .then((res) => res.json())
      .then((data) => setWorkers(data));
  }, []);

  return (
    <section className="py-12 bg-base-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
           Top Performing Workers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {workers.map((w) => (
            <div
              key={w._id}
              className="bg-white rounded-lg shadow-lg p-6 text-center transition hover:shadow-xl"
            >
              <img
                src={w.photo}
                alt={w.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{w.name}</h3>
              <p className="mt-2 text-lg font-bold text-green-600">
                💰 {w.coins} Coins
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestWorkers;
