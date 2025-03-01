import React from "react";

const ExamDetailsSection = ({
  formData,
  handleNestedChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Exam Details</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Difficulty Level
        </label>
        <select
          name="difficulty"
          value={formData.examDetails.difficulty}
          onChange={(e) => handleNestedChange(e, "examDetails")}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
          <option value="Very Difficult">Very Difficult</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Average CGPA
        </label>
        <input
          type="text"
          name="averageCGPA"
          value={formData.examDetails.averageCGPA}
          onChange={(e) => handleNestedChange(e, "examDetails")}
          className="w-full p-2 border rounded"
          placeholder="e.g., 8.5"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Minimum CGPA Required
        </label>
        <input
          type="text"
          name="minimumCGPA"
          value={formData.examDetails.minimumCGPA}
          onChange={(e) => handleNestedChange(e, "examDetails")}
          className="w-full p-2 border rounded"
          placeholder="e.g., 6.0"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Other Exam Information
        </label>
        <textarea
          name="other"
          value={formData.examDetails.other}
          onChange={(e) => handleNestedChange(e, "examDetails")}
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="Any additional information about exams, grading system, etc."
        />
      </div>
    </div>
  );
};

export default ExamDetailsSection;