import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export const CollegeForm = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    collegeLocation: "",
    collegeLogo: "",
    aboutUsSub: "",
    highestPackage: "",
    averagePackage: "",
    established: "",
    collegeImage: "",
    overview: [""],
    coursesAndFeeHeading: "",
    coursesAndFee: [{ course: "", duration: "", fee: "" }],
    minFee: "",
    maxFee: "",
    admissionProcess: {
      description: "",
      steps: [""],
    },
    approvalAndRanking: {
      description: "",
    },
    certificates: [],
    placement: {
      description: "",
      companies: [],
      stats: {
        placementRate: "",
        highestPackage: "",
      },
      topCompanies: [""],
    },
    faculty: [""],
    examDetails: {
      difficulty: "",
      averageCGPA: "",
      minimumCGPA: "",
      other: "",
    },
    gallery: [],
    sampleDegree: {
      description: "",
      image: "",
    },
    reviews: [
      {
        name: "",
        review: [{ type: "", content: "" }],
      },
    ],
    examPattern: {
      title: "",
      steps: [""],
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState({});
  const [collegeId, setCollegeId] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Load college data by ID (for editing)
  const loadCollegeData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/colleges/${id}`
      );
      setFormData(response.data);
      setLoading(false);
      setMessage("College data loaded successfully");
      setIsEditMode(true);
    } catch (error) {
      console.error("Error loading college data:", error);
      setLoading(false);
      setMessage(`Error loading college data: ${error.message}`);
    }
  };

  // Generic handler for simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler for array items
  const handleArrayChange = (index, value, field) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [field]: updatedArray,
    });
  };

  // Handler for nested fields
  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [name]: value,
      },
    });
  };

  // Handler for deeply nested fields
  const handleDeepNestedChange = (e, parent, nestedField) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [nestedField]: {
          ...formData[parent][nestedField],
          [name]: value,
        },
      },
    });
  };

  // Handler for nested array items
  const handleNestedArrayChange = (index, value, parent, arrayField) => {
    const updatedParent = { ...formData[parent] };
    const updatedArray = [...updatedParent[arrayField]];
    updatedArray[index] = value;
    updatedParent[arrayField] = updatedArray;

    setFormData({
      ...formData,
      [parent]: updatedParent,
    });
  };

  // Handler for courses array
  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...formData.coursesAndFee];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [field]: field === "fee" ? (value === "" ? "" : Number(value)) : value,
    };
    setFormData({
      ...formData,
      coursesAndFee: updatedCourses,
    });
  };

  // Add new course
  const addCourse = () => {
    setFormData({
      ...formData,
      coursesAndFee: [
        ...formData.coursesAndFee,
        { course: "", duration: "", fee: "" },
      ],
    });
  };

  // Remove a course
  const removeCourse = (index) => {
    const updatedCourses = [...formData.coursesAndFee];
    updatedCourses.splice(index, 1);
    setFormData({
      ...formData,
      coursesAndFee: updatedCourses,
    });
  };

  // Handle review field changes
  const handleReviewChange = (reviewIndex, field, value) => {
    const updatedReviews = [...formData.reviews];
    updatedReviews[reviewIndex] = {
      ...updatedReviews[reviewIndex],
      [field]: value,
    };
    setFormData({
      ...formData,
      reviews: updatedReviews,
    });
  };

  // Handle review item changes
  const handleReviewItemChange = (reviewIndex, itemIndex, field, value) => {
    const updatedReviews = [...formData.reviews];
    if (!updatedReviews[reviewIndex].review) {
      updatedReviews[reviewIndex].review = [];
    }

    if (!updatedReviews[reviewIndex].review[itemIndex]) {
      updatedReviews[reviewIndex].review[itemIndex] = {};
    }

    updatedReviews[reviewIndex].review[itemIndex] = {
      ...updatedReviews[reviewIndex].review[itemIndex],
      [field]: value,
    };

    setFormData({
      ...formData,
      reviews: updatedReviews,
    });
  };

  // Add new review
  const addReview = () => {
    setFormData({
      ...formData,
      reviews: [
        ...formData.reviews,
        {
          name: "",
          review: [{ type: "", content: "" }],
        },
      ],
    });
  };

  // Add new review item
  const addReviewItem = (reviewIndex) => {
    const updatedReviews = [...formData.reviews];
    if (!updatedReviews[reviewIndex].review) {
      updatedReviews[reviewIndex].review = [];
    }
    updatedReviews[reviewIndex].review.push({ type: "", content: "" });

    setFormData({
      ...formData,
      reviews: updatedReviews,
    });
  };

  // Remove a review item
  const removeReviewItem = (reviewIndex, itemIndex) => {
    const updatedReviews = [...formData.reviews];
    updatedReviews[reviewIndex].review.splice(itemIndex, 1);

    setFormData({
      ...formData,
      reviews: updatedReviews,
    });
  };

  // Remove a review
  const removeReview = (reviewIndex) => {
    const updatedReviews = [...formData.reviews];
    updatedReviews.splice(reviewIndex, 1);

    setFormData({
      ...formData,
      reviews: updatedReviews,
    });
  };

  // Handle single file upload to Cloudinary
  const handleSingleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    // Start progress
    setLoading(true);
    setUploadProgress({ ...uploadProgress, [field]: 10 });

    try {
      // Read file as data URL (similar to multiple upload)
      const fileDataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.readAsDataURL(file);
      });

      // Simulate progress (like in multiple upload function)
      let progress = 10;
      const interval = setInterval(() => {
        progress += 15;
        if (progress <= 90) {
          setUploadProgress((prev) => ({ ...prev, [field]: progress }));
        } else {
          clearInterval(interval);
        }
      }, 100);

      // Complete progress
      setUploadProgress({ ...uploadProgress, [field]: 100 });

      // Handle nested fields (similar to your original code)
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: fileDataUrl,
          },
        });
      } else {
        setFormData({
          ...formData,
          [field]: fileDataUrl,
        });
      }

      // Reset progress after a short delay
      setTimeout(() => {
        setUploadProgress((prev) => ({ ...prev, [field]: 0 }));
        setLoading(false);
        setMessage(`Image for ${field} processed successfully`);
      }, 1000);
    } catch (error) {
      console.error("Error processing file:", error);
      setLoading(false);
      setUploadProgress({ ...uploadProgress, [field]: 0 });
      setMessage(`Error processing image: ${error.message}`);
    }
  };
  const handleMultipleFileUpload = (e, field) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Start progress
    setUploadProgress({ ...uploadProgress, [field]: 10 });

    const uploadPromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.readAsDataURL(file);
      });
    });

    // Simulate progress
    let progress = 10;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 90) {
        setUploadProgress((prev) => ({ ...prev, [field]: progress }));
      } else {
        clearInterval(interval);
      }
    }, 100);

    Promise.all(uploadPromises).then((imageResults) => {
      // Complete progress
      setUploadProgress({ ...uploadProgress, [field]: 100 });

      // Update form data with new images
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: [...prev[parent][child], ...imageResults],
        },
      }));

      // Reset progress after a short delay
      setTimeout(() => {
        setUploadProgress((prev) => ({ ...prev, [field]: 0 }));
      }, 1000);
    });
  };
  // Handle multiple file uploads to Cloudinary
  const handleMultipleFileUpload1 = (e, field) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Start progress
    setUploadProgress({ ...uploadProgress, [field]: 10 });

    const uploadPromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.readAsDataURL(file);
      });
    });

    // Simulate progress
    let progress = 10;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 90) {
        setUploadProgress((prev) => ({ ...prev, [field]: progress }));
      } else {
        clearInterval(interval);
      }
    }, 100);

    Promise.all(uploadPromises).then((imageResults) => {
      // Complete progress
      setUploadProgress({ ...uploadProgress, [field]: 100 });

      // Update form data with new images
      if (field.includes(".")) {
        // Handle nested fields (like "company.logos")
        const [parent, child] = field.split(".");
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...(prev[parent] || {}),
            [child]: [...(prev[parent]?.[child] || []), ...imageResults],
          },
        }));
      } else {
        // Handle direct fields (like "gallery")
        setFormData((prev) => ({
          ...prev,
          [field]: [...(prev[field] || []), ...imageResults],
        }));
      }

      // Reset progress after a short delay
      setTimeout(() => {
        setUploadProgress((prev) => ({ ...prev, [field]: 0 }));
      }, 1000);
    });
  };

  // Function to remove an image from an array
  const handleRemoveImage1 = (index, field) => {
    // Handle nested fields
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: prev[parent][child].filter((_, i) => i !== index),
        },
      }));
    } else {
      // Handle direct fields
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };
  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log("Submitting data:", formData);

      let response;
      if (isEditMode && collegeId) {
        response = await axios.put(
          `http://localhost:5000/api/colleges/${collegeId}`,
          formData
        );
        setMessage("College updated successfully!");
      } else {
        response = await axios.post(
          "http://localhost:5000/api/colleges",
          formData
        );
        setMessage("College added successfully!");
      }

      console.log("Success:", response.data);
      setLoading(false);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  // Update collegeId input handler
  const handleCollegeIdChange = (e) => {
    setCollegeId(e.target.value);
  };

  // Load college data button handler
  const handleLoadCollegeData = () => {
    if (collegeId) {
      loadCollegeData(collegeId);
    } else {
      setMessage("Please enter a college ID first");
    }
  };

  // Add overview point
  const addOverviewPoint = () => {
    setFormData({
      ...formData,
      overview: [...formData.overview, ""],
    });
  };

  // Remove overview point
  const removeOverviewPoint = (index) => {
    const updatedOverview = [...formData.overview];
    updatedOverview.splice(index, 1);
    setFormData({
      ...formData,
      overview: updatedOverview,
    });
  };

  const addAdmissionStep = () => {
    const updatedSteps = [...formData.admissionProcess.steps, ""];
    setFormData({
      ...formData,
      admissionProcess: {
        ...formData.admissionProcess,
        steps: updatedSteps,
      },
    });
  };

  // Remove an admission step
  const removeAdmissionStep = (index) => {
    const updatedSteps = [...formData.admissionProcess.steps];
    updatedSteps.splice(index, 1);
    setFormData({
      ...formData,
      admissionProcess: {
        ...formData.admissionProcess,
        steps: updatedSteps,
      },
    });
  };
  const handleAddStep = () => {
    const updatedSteps = [...formData.examPattern.steps, ""]; // Add empty step
    setFormData({
      ...formData,
      examPattern: {
        ...formData.examPattern,
        steps: updatedSteps,
      },
    });
  };

  // Handler to remove a step
  const handleRemoveStep = (indexToRemove) => {
    // Don't remove if there's only one step left
    if (formData.examPattern.steps.length <= 1) {
      return;
    }

    const updatedSteps = formData.examPattern.steps.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData({
      ...formData,
      examPattern: {
        ...formData.examPattern,
        steps: updatedSteps,
      },
    });
  };

  // Handler to add a new company input
  const handleAddCompany = () => {
    setFormData({
      ...formData,
      placement: {
        ...formData.placement,
        topCompanies: [...formData.placement.topCompanies, ""],
      },
    });
  };

  // Handler to remove a company input
  const handleRemoveCompany = (index) => {
    if (formData.placement.topCompanies.length <= 1) return;

    const updatedCompanies = formData.placement.topCompanies.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      placement: {
        ...formData.placement,
        topCompanies: updatedCompanies,
      },
    });
  };
  const handleRemoveImage = (indexToRemove, parent, child) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: prev[parent][child].filter(
          (_, index) => index !== indexToRemove
        ),
      },
    }));
  };
  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">
        College CRM Data Entry
      </h1>

      {/* Load Existing College Data Section */}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic College Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">College Name*</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Location*</label>
              <input
                type="text"
                name="collegeLocation"
                value={formData.collegeLocation}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Established Year</label>
              <input
                type="number"
                name="established"
                value={formData.established}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Highest Package</label>
              <input
                type="text"
                name="highestPackage"
                value={formData.highestPackage}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Average Package</label>
              <input
                type="text"
                name="averagePackage"
                value={formData.averagePackage}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">College Logo</label>
              <input
                type="file"
                onChange={(e) => handleSingleFileUpload(e, "collegeLogo")}
                className="w-full p-2 border rounded"
              />
              {uploadProgress.collegeLogo > 0 &&
                uploadProgress.collegeLogo < 100 && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress.collegeLogo}%` }}
                    ></div>
                  </div>
                )}
              {formData.collegeLogo && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Uploaded Image:</p>
                  <img
                    src={formData.collegeLogo}
                    alt="College Logo"
                    className="h-16 mt-1 rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1">College Image</label>
              <input
                type="file"
                onChange={(e) => handleSingleFileUpload(e, "collegeImage")}
                className="w-full p-2 border rounded"
              />
              {uploadProgress.collegeImage > 0 &&
                uploadProgress.collegeImage < 100 && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress.collegeImage}%` }}
                    ></div>
                  </div>
                )}
              {formData.collegeImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Uploaded Image:</p>
                  <img
                    src={formData.collegeImage}
                    alt="College Logo"
                    className="h-16 mt-1 rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1">About Us</label>
              <textarea
                name="aboutUsSub"
                value={formData.aboutUsSub}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-semibold">Overview</h2>
            <button
              type="button"
              onClick={addOverviewPoint}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Add Overview Point
            </button>
          </div>

          {formData.overview.map((item, index) => (
            <div key={index} className="mb-4 p-3 border rounded bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium">
                  Overview Point {index + 1}
                </label>
                {formData.overview.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOverviewPoint(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <textarea
                value={item}
                onChange={(e) =>
                  handleArrayChange(index, e.target.value, "overview")
                }
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
          ))}
        </div>

        {/* Courses and Fee Section */}
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

        {/* Admission Process */}
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

          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Steps</h3>
            <button
              type="button"
              onClick={addAdmissionStep}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Add Step
            </button>
          </div>

          {formData.admissionProcess.steps.map((step, index) => (
            <div key={index} className="mb-3 p-3 border rounded bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium">Step {index + 1}</label>
                <button
                  type="button"
                  onClick={() => removeAdmissionStep(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
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

        {/* Approval And Ranking */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Approval And Ranking
          </h2>

          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.approvalAndRanking.description}
              onChange={(e) => handleNestedChange(e, "approvalAndRanking")}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
        </div>

        {/* Certificate Images */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Certificate Images
          </h2>

          <div>
            <label className="block mb-1">Certificate Images</label>
            <input
              type="file"
              onChange={(e) => handleMultipleFileUpload1(e, "certificates")}
              className="w-full p-2 border rounded"
              multiple
              accept="image/*"
            />
            {uploadProgress["certificates"] > 0 &&
              uploadProgress["certificates"] < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${uploadProgress["gallery"]}%`,
                    }}
                  ></div>
                </div>
              )}

            {formData.certificates && formData.certificates.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">
                  Uploaded certificates ({formData.certificates.length})
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {formData.certificates.map((logo, index) => (
                    <div
                      key={index}
                      className="border p-2 rounded relative group"
                    >
                      <img
                        src={logo}
                        alt={`certificates ${index + 1}`}
                        className="w-full h-16 object-contain rounded"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveImage1(index, "certificates")
                        }
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Placement Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Placement Informationss
          </h2>

          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <ReactQuill
              theme="snow"
              value={formData.placement.description}
              onChange={(content) => {
                setFormData({
                  ...formData,
                  placement: {
                    ...formData.placement,
                    description: content,
                  },
                });
              }}
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                  [{ header: [1, 2, 3, false] }],
                ],
              }}
              className="bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Placement Rate</label>
              <input
                type="text"
                name="placementRate"
                value={formData.placement.stats.placementRate}
                onChange={(e) =>
                  handleDeepNestedChange(e, "placement", "stats")
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Highest Package</label>
              <input
                type="text"
                name="highestPackage"
                value={formData.placement.stats.highestPackage}
                onChange={(e) =>
                  handleDeepNestedChange(e, "placement", "stats")
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium mb-2">Top Companies</h3>
              <button
                type="button"
                onClick={handleAddCompany}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Add Company
              </button>
            </div>

            {formData.placement.topCompanies.map((company, index) => (
              <div key={index} className="mb-3 flex items-center">
                <div className="flex-grow">
                  <label className="block mb-1">Company {index + 1}</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) =>
                      handleNestedArrayChange(
                        index,
                        e.target.value,
                        "placement",
                        "topCompanies"
                      )
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCompany(index)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 mt-5"
                  disabled={formData.placement.topCompanies.length <= 1}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h3 className="font-medium mt-6 mb-2">Company Logoss</h3>
          <div className="mb-4">
            <label className="block mb-2">Upload Multiple Company Logos</label>
            <input
              type="file"
              multiple
              onChange={(e) =>
                handleMultipleFileUpload(e, "placement.companies")
              }
              className="w-full p-2 border rounded"
              accept="image/*"
            />
            {uploadProgress["placement.companies"] > 0 &&
              uploadProgress["placement.companies"] < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${uploadProgress["placement.companies"]}%`,
                    }}
                  ></div>
                </div>
              )}
          </div>

          {formData.placement.companies &&
            formData.placement.companies.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">
                  Uploaded Company Logos ({formData.placement.companies.length})
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {formData.placement.companies.map((logo, index) => (
                    <div
                      key={index}
                      className="border p-2 rounded relative group"
                    >
                      <img
                        src={logo}
                        alt={`Company ${index + 1}`}
                        className="w-full h-16 object-contain rounded"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveImage(index, "placement", "companies")
                        }
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Faculty Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Faculty Information
          </h2>

          {formData.faculty.map((item, index) => (
            <div key={index} className="mb-3">
              <label className="block mb-1">Faculty Info {index + 1}</label>
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleArrayChange(index, e.target.value, "faculty")
                }
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </div>

        {/* Exam Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            Exam Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Difficulty</label>
              <input
                type="text"
                name="difficulty"
                value={formData.examDetails.difficulty}
                onChange={(e) => handleNestedChange(e, "examDetails")}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Exam Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Difficulty</label>
                  <input
                    type="text"
                    name="difficulty"
                    value={formData.examDetails.difficulty}
                    onChange={(e) => handleNestedChange(e, "examDetails")}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Average CGPA</label>
                  <input
                    type="text"
                    name="averageCGPA"
                    value={formData.examDetails.averageCGPA}
                    onChange={(e) => handleNestedChange(e, "examDetails")}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Minimum CGPA</label>
                  <input
                    type="text"
                    name="minimumCGPA"
                    value={formData.examDetails.minimumCGPA}
                    onChange={(e) => handleNestedChange(e, "examDetails")}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Other Details</label>
                  <textarea
                    name="other"
                    value={formData.examDetails.other}
                    onChange={(e) => handleNestedChange(e, "examDetails")}
                    className="w-full p-2 border rounded"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              {formData.placement.companies &&
                formData.placement.companies.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">
                      Uploaded Company Logos (
                      {formData.placement.companies.length})
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {formData.placement.companies.map((logo, index) => (
                        <div
                          key={index}
                          className="border p-2 rounded relative group"
                        >
                          <img
                            src={logo}
                            alt={`Company ${index + 1}`}
                            className="w-full h-16 object-contain rounded"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveImage(index, "placement", "companies")
                            }
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Gallery Images
              </h2>
              <div className="mb-4">
                <label className="block mb-2">Upload Gallery</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleMultipleFileUpload1(e, "gallery")}
                  className="w-full p-2 border rounded"
                  accept="image/*"
                />
                {uploadProgress["gallery"] > 0 &&
                  uploadProgress["gallery"] < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${uploadProgress["gallery"]}%`,
                        }}
                      ></div>
                    </div>
                  )}
              </div>

              {formData.gallery && formData.gallery.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">
                    Uploaded Gallery ({formData.gallery.length})
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {formData.gallery.map((logo, index) => (
                      <div
                        key={index}
                        className="border p-2 rounded relative group"
                      >
                        <img
                          src={logo}
                          alt={`gallery ${index + 1}`}
                          className="w-full h-16 object-contain rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage1(index, "gallery")}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sample Degree */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Sample Degree
              </h2>

              <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.sampleDegree.description}
                  onChange={(e) => handleNestedChange(e, "sampleDegree")}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Sample Degree Image</label>
                <input
                  type="file"
                  onChange={(e) =>
                    handleSingleFileUpload(e, "sampleDegree.image")
                  }
                  className="w-full p-2 border rounded"
                  accept="image/*"
                />
                {uploadProgress["sampleDegree.image"] > 0 &&
                  uploadProgress["sampleDegree.image"] < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{
                          width: `${uploadProgress["sampleDegree.image"]}%`,
                        }}
                      ></div>
                    </div>
                  )}

                {formData.sampleDegree.image && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Uploaded Image:</p>
                    <img
                      src={formData.sampleDegree.image}
                      alt="Sample Degree"
                      className="max-h-40 mt-1 rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Student Reviews
              </h2>

              {formData.reviews.map((review, reviewIndex) => (
                <div
                  key={reviewIndex}
                  className="mb-6 p-4 border rounded bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Review {reviewIndex + 1}</h4>
                    {formData.reviews.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeReview(reviewIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Student Name</label>
                    <input
                      type="text"
                      value={review.name || ""}
                      onChange={(e) =>
                        handleReviewChange(reviewIndex, "name", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <h5 className="font-medium mt-4 mb-2">Review Content</h5>

                  {review.review &&
                    review.review.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="mb-4 p-3 border rounded bg-white"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h6 className="font-medium">Item {itemIndex + 1}</h6>
                          <button
                            type="button"
                            onClick={() =>
                              removeReviewItem(reviewIndex, itemIndex)
                            }
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mb-2">
                          <label className="block mb-1">Type</label>
                          <input
                            type="text"
                            value={item.type || ""}
                            onChange={(e) =>
                              handleReviewItemChange(
                                reviewIndex,
                                itemIndex,
                                "type",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        <div>
                          <label className="block mb-1">Content</label>
                          <textarea
                            value={item.content || ""}
                            onChange={(e) =>
                              handleReviewItemChange(
                                reviewIndex,
                                itemIndex,
                                "content",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                      </div>
                    ))}

                  <button
                    type="button"
                    onClick={() => addReviewItem(reviewIndex)}
                    className="mt-2 px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
                  >
                    Add Review Item
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addReview}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add New Review
              </button>
            </div>

            {/* Exam Pattern */}
            <div className="max-w-lg mx-auto p-4">
              <h2 className="text-xl font-bold mb-4">Exam Pattern</h2>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.examPattern.title}
                  onChange={(e) => handleNestedChange(e, "examPattern")}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium">Steps</label>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Step
                  </button>
                </div>

                {formData.examPattern.steps.map((step, index) => (
                  <div key={index} className="mb-3 relative border p-3 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium">Step {index + 1}</label>
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        disabled={formData.examPattern.steps.length <= 1}
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
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : isEditMode
                  ? "Update College"
                  : "Add College"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
