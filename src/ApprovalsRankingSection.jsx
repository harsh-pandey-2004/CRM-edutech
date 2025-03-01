// components/ApprovalRankingSection.js
import React from "react";

const ApprovalRankingSection = ({ formData, handleNestedChange }) => {
  return (
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
  );
};

export default ApprovalRankingSection;