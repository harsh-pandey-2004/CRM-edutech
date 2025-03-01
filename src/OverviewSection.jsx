// components/OverviewSection.js
import React from "react";

const OverviewSection = ({ formData, handleArrayChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Overview</h2>
      {formData.overview.map((item, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-1">Overview Point {index + 1}</label>
          <textarea
            value={item}
            onChange={(e) => handleArrayChange(index, e.target.value, "overview")}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>
      ))}
    </div>
  );
};

export default OverviewSection;