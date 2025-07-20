import { motion } from "framer-motion";
import { FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";

const ExtraSections = () => {
  return (
    <div className="bg-base-200 py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Section 1: Why Choose Us */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            Why Choose Our Platform
          </h2>
          <p className=" max-w-xl mx-auto">
            We ensure quality, safety, and speed for both task givers and task doers. 
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-base-100 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
              <FaRocket className="text-4xl text-secondary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Fast Delivery</h4>
              <p>Workers complete tasks quickly, boosting buyer satisfaction and earning potential.</p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
              <FaShieldAlt className="text-4xl text-secondary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Secure Payments</h4>
              <p>Every transaction is secured with Stripe and we ensure fair payouts to workers.</p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
              <FaUsers className="text-4xl text-secondary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Trusted Community</h4>
              <p>Thousands of users are actively working and posting jobs with trust and reliability.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 2: How It Works */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-base-100 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
              <span className="text-3xl font-bold text-secondary">1</span>
              <h4 className="text-xl font-semibold mt-2">Sign Up</h4>
              <p>Create your free account as a buyer or a worker.</p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
              <span className="text-3xl font-bold text-secondary">2</span>
              <h4 className="text-xl font-semibold mt-2">Post or Accept Tasks</h4>
              <p>Buyers post tasks, workers choose and complete them.</p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
              <span className="text-3xl font-bold text-secondary">3</span>
              <h4 className="text-xl font-semibold mt-2">Get Paid</h4>
              <p>After approval, workers receive coins and convert them into real money.</p>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Join Us Today */}
        <motion.div
          className="text-center bg-gradient-to-r from-blue-400 to-blue-600 py-12 px-6 rounded-2xl shadow-xl text-black"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Earning or Hiring Today!</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Whether you're looking to hire for small tasks or earn through micro jobs, our platform empowers you with everything you need.
          </p>
          <button className="btn btn-outline bg-white text-green-600 font-bold hover:bg-green-100 transition">Join Now</button>
        </motion.div>
      </div>
    </div>
  );
};

export default ExtraSections;
