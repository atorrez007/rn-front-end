import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReviewDetails = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/reviews/${reviewId}`)
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, [reviewId]);

  return (
    <div className="bg-white p-4 h-full flex justify-center">
      <div className=" w-[66%] text-center ">
        <h1 className="text-lg p-2">
          Overall Score: <strong>{review.overallScore}</strong>
        </h1>
        <p>
          <strong> {review.date}</strong>
        </p>
        <div className="border  h-auto px-auto py-auto flex justify-start">
          <div className=" w-full p-2">
            <div className="border p-2">
              <h1>
                Specialty: <strong>{review.specialty}</strong>
              </h1>
            </div>
            <div className="border p-1">
              <h1>
                Shift:
                <strong>
                  <ul>
                    {review.shift?.map((item, index) => (
                      <li key={index}>
                        <strong>{item}</strong>
                      </li>
                    ))}
                  </ul>
                </strong>
              </h1>
            </div>
            <div className="border p-1">
              <h1>
                Nurse/Patient Ratio: <strong>{review.nurseRatio}</strong>
              </h1>
            </div>
            <div className="border p-1">
              <h1>
                Charting Software: <strong>{review.chartingSoftware}</strong>
              </h1>
            </div>
            <div className="border p-1">
              <h1>
                Accessibility: <strong>{review.accessibility}</strong>
              </h1>
            </div>
            <div className="border p-1">
              <h1>
                Dinning Options:
                <ul>
                  {review.dinning?.map((item, index) => (
                    <li key={index}>
                      <strong>{item}</strong>
                    </li>
                  ))}
                </ul>
              </h1>
            </div>
            <h1>
              Scrub Colors: <strong>{review.scrubColor}</strong>
            </h1>
            <h1>
              Housing: <strong>{review.housing}</strong>
            </h1>
            <h1>
              Safety: <strong>{review.safety}</strong>
            </h1>
            <h1>
              Parking: <strong>{review.parking}</strong>
            </h1>
            <div className="bg-slate-200 p-4 border border-black">
              <h1>
                Comment: <strong>{review.text}</strong>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
