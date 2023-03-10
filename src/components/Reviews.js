import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { hospitalId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/hospitals/${hospitalId}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data[0].reviews));
  }, [hospitalId]);

  const reviewBreakdown = reviews.map((review) => {
    return (
      <div className="flex col-span-3" key={review._id}>
        <div className="p-4">
          <h1 className="text-lg">
            Overall Score
            <strong className="ml-3">{review.overallScore}</strong>
          </h1>
        </div>
        {/* <div>
          <h1>
            Overall Score <strong>{review.overallScore}</strong>
          </h1>
        </div>
        <h1>
          Accessibility <strong>{review.accessibility}</strong>
        </h1>
        <h1>
          Dining Options
          <strong>
            {review.dinning.map((option) => (
              <p key={option}>{option}</p>
            ))}
          </strong>
        </h1>
        <h1>{review.scrubColor}</h1>
        <h1>{review.housing}</h1>
        <h1>{review.date}</h1> */}
      </div>
    );
  });

  return (
    <div>
      <h1>Reviews</h1>
      <h1>{reviewBreakdown ? reviewBreakdown : null}</h1>
    </div>
  );
};

export default Reviews;