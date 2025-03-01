import React from "react";

const GallerySection = ({
  formData,
  handleMultipleFileUpload,
  uploadProgress,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">College Gallery</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Upload College Images (Multiple)
        </label>
        <input
          type="file"
          onChange={(e) => handleMultipleFileUpload(e, "gallery")}
          multiple
          className="w-full p-2 border rounded"
          accept="image/*"
        />
        {uploadProgress["gallery"] > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress["gallery"]}%` }}
            ></div>
          </div>
        )}
      </div>

      {formData.gallery && formData.gallery.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Uploaded Gallery Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.gallery.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-40 object-cover rounded border"
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-tr">
                  Image {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <label className="block text-gray-700 mb-2">
          Upload Sample Degree Certificate
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <textarea
              name="description"
              value={formData.sampleDegree.description}
              onChange={(e) => handleNestedChange(e, "sampleDegree")}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Description of the sample degree certificate"
            />
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => handleSingleFileUpload(e, "sampleDegree.image")}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
            {uploadProgress["sampleDegree.image"] > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress["sampleDegree.image"]}%` }}
                ></div>
              </div>
            )}
            {formData.sampleDegree.image && (
              <div className="mt-2">
                <img
                  src={formData.sampleDegree.image}
                  alt="Sample degree certificate"
                  className="max-h-40 border rounded p-1"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;