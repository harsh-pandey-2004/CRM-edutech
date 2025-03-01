// components/CertificatesSection.js
import React from "react";

const CertificatesSection = ({
  formData,
  handleMultipleFileUpload,
  uploadProgress,
  handleRemoveCertificate
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        Certificate Images
      </h2>
      <div className="mb-4">
        <label className="block mb-2">
          Upload Multiple Certificate Images
        </label>
        <input
          type="file"
          multiple
          onChange={(e) => handleMultipleFileUpload(e, "certificates")}
          className="w-full p-2 border rounded"
          accept="image/*"
        />
        {uploadProgress.certificates > 0 &&
          uploadProgress.certificates < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress.certificates}%` }}
              ></div>
            </div>
          )}
      </div>
      
      {formData.certificates && formData.certificates.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">
            Upload complete ({formData.certificates.length} certificate{formData.certificates.length > 1 ? 's' : ''})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.certificates.map((certificate, index) => (
              <div key={index} className="relative group">
                <img
                  src={certificate.url || URL.createObjectURL(certificate)}
                  alt={`Certificate ${index + 1}`}
                  className="w-full h-40 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCertificate(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove certificate"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="mt-1 text-sm truncate">
                  {certificate.name || `Certificate ${index + 1}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesSection;