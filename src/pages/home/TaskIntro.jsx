import React from 'react';
import { CheckCircle } from 'lucide-react';
import task from "../../assets/task1.jpeg"

const TaskIntro = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between shadow-lg rounded-2xl overflow-hidden mt-8">
      {/* Left Image */}
      <div className="w-full lg:w-1/2 h-[300px] lg:h-[400px]">
        <img
          src={task}
          alt="Team"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2 bg-green-600 text-white px-6 py-8 space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold">
          Post your first task in seconds
        </h2>
        <p className="text-lg">
          Save yourself hours and get your to-do list completed
        </p>
        <ul className="space-y-3 text-white text-base">
          <li className="flex items-center gap-2">
            <CheckCircle className="text-white" size={20} />
            Describe what you need done
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-white" size={20} />
            Set your budget
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="text-white" size={20} />
            Receive quotes and pick the best Tasker
          </li>
        </ul>
        <button className="mt-4 bg-white text-green-800 font-semibold px-5 py-2 rounded hover:bg-gray-100 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default TaskIntro;
