import React from "react";

const FacultySection = ({
  formData,
  handleArrayChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Faculty Information</h2>
      
      {formData.faculty.map((faculty, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 mb-2">
            Faculty Member {index + 1}
          </label>
          <textarea
            value={faculty}
            onChange={(e) => handleArrayChange(index, e.target.value, "faculty")}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Enter faculty member details (name, qualification, experience, etc.)"
          />
        </div>
      ))}
    </div>
  );
};

export default FacultySection;