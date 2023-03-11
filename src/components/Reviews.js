import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { hospitalId } = useParams();
  // const { reviewId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/hospitals/${hospitalId}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data[0].reviews));
  }, [hospitalId]);

  const reviewBreakdown = reviews.map((review) => {
    return (
      <tr
        key={review._id}
        className="bg-slate-400 flex p-2 w-full h-[66%] items-center border border-black"
      >
        <td>
          <Link to={`/search/${hospitalId}/${review._id}`}>
            {review.overallScore}
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table className="table-auto w-full bg-slate-300 border">
        <thead>
          <tr className="bg-slate-200 flex border">
            <th>Overall Score</th>
            {/* <th>Reviews</th> */}
          </tr>
        </thead>
        <tbody className="">{reviewBreakdown}</tbody>
        {/* <td>{reviewBreakdown ? reviewBreakdown : null}</td> */}
      </table>
    </div>
  );
};

export default Reviews;
