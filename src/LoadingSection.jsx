// components/LoadCollegeSection.js
import React from "react";

const LoadCollegeSection = ({ 
  collegeId, 
  handleCollegeIdChange, 
  handleLoadCollegeData, 
  loading 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        Load Existing College Data
      </h2>
      <div className="flex gap-4">
        <input
          type="text"
          value={collegeId}
          onChange={handleCollegeIdChange}
          placeholder="Enter College ID"
          className="flex-grow p-2 border rounded"
        />
        <button
          type="button"
          onClick={handleLoadCollegeData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load Data"}
        </button>
      </div>
    </div>
  );
};

export default LoadCollegeSection;