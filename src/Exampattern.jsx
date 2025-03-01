import React from "react";

const ExamPatternSection = ({
  formData,
  handleNestedChange,
  handleNestedArrayChange
}) => {
  const addStep = () => {
    const updatedSteps = [...formData.examPattern.steps, ""];
    // Create a fake event object to use with handleNestedChange
    const event = {
      target: {
        name: "steps",
        value: updatedSteps
      }
    };
    handleNestedChange(event, "examPattern");
  };

  const removeStep = (index) => {
    const updatedSteps = [...formData.examPattern.steps];
    updatedSteps.splice(index, 1);
    // Create a fake event object to use with handleNestedChange
    const event = {
      target: {
        name: "steps",
        value: updatedSteps
      }
    };
    handleNestedChange(event, "examPattern");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        Exam Patterns
      </h2>

      <div className="mb-4">
        <label className="block mb-1">Titles</label>
        <input
          type="text"
          name="title"
          value={formData.examPattern.title}
          onChange={(e) => handleNestedChange(e, "examPattern")}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Steps</h3>
        <button
          type="button"
          onClick={addStep}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Step
        </button>
      </div>

      {formData.examPattern.steps.map((step, index) => (
        <div key={index} className="mb-3 relative">
          <div className="flex items-center mb-1">
            <label className="block">Step {index + 1}</label>
            <button
              type="button"
              onClick={() => removeStep(index)}
              className="ml-auto px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
            >
              Remove
            </button>
          </div>
          <textarea
            value={step}
            onChange={(e) =>
              handleNestedArrayChange(
                index,
                e.target.value,
                "examPattern",
                "steps"
              )
            }
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>
      ))}

      {formData.examPattern.steps.length === 0 && (
        <div className="p-4 text-center text-gray-500 border rounded bg-gray-50">
          No steps added. Click "Add Step" to add exam pattern steps.
        </div>
      )}
    </div>
  );
};

export default ExamPatternSection;