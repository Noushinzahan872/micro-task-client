

import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <span className="loading loading-bars loading-xl text-green-600"></span>
        <p className="text-lg font-medium text-gray-500">Please wait, loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
