// components/BasicInfoSection.js
import React from "react";

const BasicInfoSection = ({ 
  formData, 
  handleChange, 
  handleSingleFileUpload, 
  uploadProgress 
}) => {
  return (
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
          {uploadProgress.collegeLogo > 0 && uploadProgress.collegeLogo < 100 && (
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
          {uploadProgress.collegeImage > 0 && uploadProgress.collegeImage < 100 && (
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
                alt="College"
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
  );
};

export default BasicInfoSection;