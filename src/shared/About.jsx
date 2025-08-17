import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg">
          Welcome to <span className="font-semibold text-blue-500">Our Platform</span>, 
          where we connect Buyers and Workers through a trusted Micro Task and Earning system.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Section 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3"> Our Mission</h2>
          <p className="text-gray-600">
            To provide a simple, fast, and secure way for people to earn money by 
            completing small tasks, while helping buyers get their jobs done at scale.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3"> What We Do</h2>
          <p className="text-gray-600">
            We connect two communities: <span className="font-medium">Buyers</span> 
            who post tasks, and <span className="font-medium">Workers</span> who 
            complete them for rewards. From app installs to social media engagement, 
            we cover a wide range of micro-tasks.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3"> Why Choose Us</h2>
          <p className="text-gray-600">
            ✅ Secure Payments <br />
            ✅ User-Friendly Dashboard <br />
            ✅ Multiple Earning Opportunities <br />
            ✅ Trusted by Workers & Buyers
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3"> Our Vision</h2>
          <p className="text-gray-600">
            To become the leading micro-task platform that empowers students, 
            freelancers, and everyday people to generate income online with trust 
            and transparency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
