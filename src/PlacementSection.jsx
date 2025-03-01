import React from "react";

const PlacementSection = ({
  formData,
  handleNestedChange,
  handleNestedArrayChange,
  handleSingleFileUpload,
  uploadProgress,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Placement Details</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Placement Description
        </label>
        <textarea
          name="description"
          value={formData.placement.description}
          onChange={(e) => handleNestedChange(e, "placement")}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Placement Rate (%)
        </label>
        <input
          type="text"
          name="placementRate"
          value={formData.placement.stats.placementRate}
          onChange={(e) => handleDeepNestedChange(e, "placement", "stats")}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Highest Package (LPA)
        </label>
        <input
          type="text"
          name="highestPackage"
          value={formData.placement.stats.highestPackage}
          onChange={(e) => handleDeepNestedChange(e, "placement", "stats")}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Top Recruiting Companies</h3>
        {formData.placement.topCompanies.map((company, index) => (
          <div key={index} className="mb-2 flex items-center">
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
              placeholder={`Company ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Upload Company Logos (Multiple)
        </label>
        <input
          type="file"
          onChange={(e) => handleMultipleFileUpload(e, "placement.companies")}
          multiple
          className="w-full p-2 border rounded"
          accept="image/*"
        />
        {uploadProgress["placement.companies"] > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress["placement.companies"]}%` }}
            ></div>
          </div>
        )}
        {formData.placement.companies && formData.placement.companies.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.placement.companies.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Company logo ${index + 1}`}
                className="h-16 w-auto object-contain border rounded p-1"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementSection;