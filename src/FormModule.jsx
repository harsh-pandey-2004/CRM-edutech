// Main component file (CollegeForm.js)
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadCollegeSection from "./LoadingSection";
import BasicInfoSection from "./BasicInfoSection";
import OverviewSection from "./OverviewSection";
import CoursesAndFeeSection from "./CourseandFeeSection";
import AdmissionProcessSection from "./AdmissionProcess";
import ApprovalRankingSection from "./ApprovalsRankingSection";
import CertificatesSection from "./CertificateSection";
import ReviewsSection from "./ReviewSection";
import ExamPatternSection from "./Exampattern";
import PlacementSection from "./PlacementSection";
import FacultySection from "./FacultySection";
import ExamDetailsSection from "./ExamDetailsSection";
import GallerySection from "./GallerySection";


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
    overview: ["", "", ""],
    coursesAndFeeHeading: "",
    coursesAndFee: [{ course: "", duration: "", fee: "" }],
    minFee: "",
    maxFee: "",
    admissionProcess: {
      description: "",
      steps: ["", "", "", "", ""],
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
      topCompanies: ["", "", "", "", ""],
    },
    faculty: ["", "", ""],
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
      steps: ["", "", "", "", ""],
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

  // Handler functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (index, value, fieldName) => {
    const updatedArray = [...formData[fieldName]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [fieldName]: updatedArray,
    });
  };

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

  // File upload handlers
  const handleSingleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append("image", file);

    try {
      setLoading(true);
      setUploadProgress({ ...uploadProgress, [field]: 0 });

      const response = await axios.post(
        "http://localhost:5000/api/images/upload/single",
        uploadFormData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress({ ...uploadProgress, [field]: percentCompleted });
          },
        }
      );

      // Handle nested fields
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: response.data.url,
          },
        });
      } else {
        setFormData({
          ...formData,
          [field]: response.data.url,
        });
      }

      setLoading(false);
      setMessage(`Image for ${field} uploaded successfully`);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
      setMessage(`Error uploading image: ${error.message}`);
    }
  };

  const handleMultipleFileUpload = async (e, field) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const uploadFormData = new FormData();
    files.forEach((file) => {
      uploadFormData.append("images", file);
    });

    try {
      setLoading(true);
      setUploadProgress({ ...uploadProgress, [field]: 0 });

      const response = await axios.post(
        "http://localhost:5000/api/images/upload/multiple",
        uploadFormData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress({ ...uploadProgress, [field]: percentCompleted });
          },
        }
      );

      const fileUrls = response.data.files.map((file) => file.url);

      // Handle nested fields
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: fileUrls,
          },
        });
      } else {
        setFormData({
          ...formData,
          [field]: fileUrls,
        });
      }

      setLoading(false);
      setMessage(
        `${fileUrls.length} images uploaded successfully for ${field}`
      );
    } catch (error) {
      console.error("Error uploading multiple files:", error);
      setLoading(false);
      setMessage(`Error uploading images: ${error.message}`);
    }
  };

  // Course handlers
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

  const addCourse = () => {
    setFormData({
      ...formData,
      coursesAndFee: [
        ...formData.coursesAndFee,
        { course: "", duration: "", fee: "" },
      ],
    });
  };

  const removeCourse = (index) => {
    const updatedCourses = [...formData.coursesAndFee];
    updatedCourses.splice(index, 1);
    setFormData({
      ...formData,
      coursesAndFee: updatedCourses,
    });
  };

  // Review handlers
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

  const removeReviewItem = (reviewIndex, itemIndex) => {
    const updatedReviews = [...formData.reviews];
    updatedReviews[reviewIndex].review.splice(itemIndex, 1);

    setFormData({
      ...formData,
      reviews: updatedReviews,
    });
  };

  const removeReview = (reviewIndex) => {
    const updatedReviews = [...formData.reviews];
    updatedReviews.splice(reviewIndex, 1);

    setFormData({
      ...formData,
      reviews: updatedReviews,
    });
  };

  // College ID and data loading
  const handleCollegeIdChange = (e) => {
    setCollegeId(e.target.value);
  };

  const handleLoadCollegeData = () => {
    if (collegeId) {
      loadCollegeData(collegeId);
    } else {
      setMessage("Please enter a college ID first");
    }
  };

  // Form submission
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

  // Props object for child components
  const commonProps = {
    formData,
    handleChange,
    handleArrayChange,
    handleNestedChange,
    handleDeepNestedChange,
    handleNestedArrayChange,
    handleSingleFileUpload,
    handleMultipleFileUpload,
    uploadProgress,
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">
        College CRM Data Entry
      </h1>

      <LoadCollegeSection
        collegeId={collegeId}
        handleCollegeIdChange={handleCollegeIdChange}
        handleLoadCollegeData={handleLoadCollegeData}
        loading={loading}
      />

      {message && (
        <div
          className={`p-4 mb-4 rounded ${
            message.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInfoSection
          {...commonProps}
        />

        <OverviewSection
          {...commonProps}
        />

        <CoursesAndFeeSection
          {...commonProps}
          handleCourseChange={handleCourseChange}
          addCourse={addCourse}
          removeCourse={removeCourse}
        />

        <AdmissionProcessSection
          {...commonProps}
        />

        <ApprovalRankingSection
          {...commonProps}
        />

        <CertificatesSection
          {...commonProps}
        />

        <PlacementSection
          {...commonProps}
        /> 

        <FacultySection
          {...commonProps}
        />

        <ExamDetailsSection
          {...commonProps}
        />

        <GallerySection
          {...commonProps}
        />

        <CertificatesSection
          {...commonProps}
        />

        <ReviewsSection
          {...commonProps}
          handleReviewChange={handleReviewChange}
          handleReviewItemChange={handleReviewItemChange}
          addReview={addReview}
          addReviewItem={addReviewItem}
          removeReviewItem={removeReviewItem}
          removeReview={removeReview}
        />

        <ExamPatternSection
          {...commonProps}
        />

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
      </form>
    </div>
  );
};

export default CollegeForm;