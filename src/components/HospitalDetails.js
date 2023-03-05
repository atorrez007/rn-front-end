import React from "react";
import { Link, useParams } from "react-router-dom";

const HospitalDetails = () => {
  // const params = useParams();
  const { hospitalId } = useParams();

  return (
    <div>
      <h1>Hospital Details</h1>
      <Link to={`/search/${hospitalId}/reviews`}>
        <h1>Reviews</h1>
      </Link>
    </div>
  );
};

export default HospitalDetails;
