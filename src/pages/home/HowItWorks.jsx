import { Briefcase, FileText, Users } from "lucide-react";
import work from "../../assets/works.jpeg"

const HowItWorks = () => {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Steps */}
        <div className="space-y-10">
          {/* Step 1 */}
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 border-2 border-green-500 rounded-full flex items-center justify-center text-green-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Post or Accept Tasks</h3>
              <p className="text-gray-600 text-sm">
                Buyers post tasks, workers choose and complete them.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 border-2 border-green-500 rounded-full flex items-center justify-center text-green-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Get Paid</h3>
              <p className="text-gray-600 text-sm">
               After approval, workers receive coins and convert them into real money.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 border-2 border-green-500 rounded-full flex items-center justify-center text-green-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Sign Up</h3>
              <p className="text-gray-600 text-sm">
                Create your free account as a buyer or a worker.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden md:block">
          <img
            src={work}
            alt="Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
