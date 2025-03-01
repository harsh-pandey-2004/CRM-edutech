import React from "react";

const ReviewsSection = ({ 
  reviews, 
  handleReviewChange, 
  handleReviewItemChange, 
  addReviewItem,
  removeReviewItem,
  addReview,
  removeReview 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        Student Reviews
      </h2>

      {reviews?.map((review, reviewIndex) => (
        <div
          key={reviewIndex}
          className="mb-6 p-4 border rounded bg-gray-50"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Review {reviewIndex + 1}</h4>
            {reviews.length > 1 && (
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
                    onClick={() => removeReviewItem(reviewIndex, itemIndex)}
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
  );
};

export default ReviewsSection;