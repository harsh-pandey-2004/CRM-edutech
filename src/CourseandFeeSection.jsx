// components/CoursesAndFeeSection.js
import React from "react";

const CoursesAndFeeSection = ({
  formData,
  handleChange,
  handleCourseChange,
  addCourse,
  removeCourse
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        Courses and Fee
      </h2>

      <div className="mb-4">
        <label className="block mb-1">Courses and Fee Heading</label>
        <textarea
          name="coursesAndFeeHeading"
          value={formData.coursesAndFeeHeading}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Min Fee</label>
        <input
          type="text"
          name="minFee"
          value={formData.minFee}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Max Fee</label>
        <input
          type="text"
          name="maxFee"
          value={formData.maxFee}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <h3 className="font-medium mb-2 mt-6">Courses</h3>

      {formData.coursesAndFee.map((course, index) => (
        <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Course {index + 1}</h4>
            {formData.coursesAndFee.length > 1 && (
              <button
                type="button"
                onClick={() => removeCourse(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Course Name</label>
              <input
                type="text"
                value={course.course}
                onChange={(e) =>
                  handleCourseChange(index, "course", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Duration</label>
              <input
                type="text"
                value={course.duration}
                onChange={(e) =>
                  handleCourseChange(index, "duration", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Fee</label>
              <input
                type="number"
                value={course.fee}
                onChange={(e) =>
                  handleCourseChange(index, "fee", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCourse}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Course
      </button>
    </div>
  );
};

export default CoursesAndFeeSection;