// components/AdmissionProcessSection.js
import React from "react";

const AdmissionProcessSection = ({ 
  formData, 
  handleNestedChange, 
  handleNestedArrayChange 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        Admission Process
      </h2>

      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.admissionProcess.description}
          onChange={(e) => handleNestedChange(e, "admissionProcess")}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>

      <h3 className="font-medium mb-2">Steps</h3>
      {formData.admissionProcess.steps.map((step, index) => (
        <div key={index} className="mb-3">
          <label className="block mb-1">Step {index + 1}</label>
          <input
            type="text"
            value={step}
            onChange={(e) =>
              handleNestedArrayChange(
                index,
                e.target.value,
                "admissionProcess",
                "steps"
              )
            }
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
    </div>
  );
};

export default AdmissionProcessSection;