import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { getHospitals } from "../redux/hospitalReducer";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUrl = useSelector((state) => state.hospitals.currentUrl);
  // console.log(currentUrl);

  // const { reviewId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/hospitals/${hospitalId}/reviews`)
      .then((response) => {
        setReviews(response.data[0].reviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [hospitalId]);

  const handleReviewChange = (reviewId) => {
    navigate(`/search/${hospitalId}/${reviewId}`);
  };

  const handleReviewAdd = (hospitalId) => {
    navigate(`/search/${hospitalId}/eval`);
  };

  const handleBackClick = () => {
    navigate(`/search`);
    dispatch(getHospitals(currentUrl));
  };

  const reviewBreakdown = reviews.map((review) => {
    return (
      // <Link key={review._id} to={`/search/${hospitalId}/${review._id}`}>
      <tr
        key={review._id}
        className="bg-slate-400 flex p-2 w-full h-[66%] items-center border border-black"
        onClick={() => {
          handleReviewChange(review._id);
        }}
      >
        <td>{review.overallScore}</td>
      </tr>
      // </Link>
    );
  });

  return (
    <div>
      <Box as="div" pb="2">
        <Box>
          <Button
            mr="4"
            colorScheme="yellow"
            onClick={() => {
              handleBackClick();
            }}
          >
            Back
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              handleReviewAdd();
            }}
          >
            Add Review
          </Button>
        </Box>
      </Box>
      <table className="table-auto w-full bg-slate-300 border">
        <thead>
          <tr className="bg-slate-200 flex border">
            <th>Overall Score</th>
            {/* <th>Reviews</th> */}
          </tr>
        </thead>
        <tbody className="">{reviewBreakdown}</tbody>
      </table>
    </div>
  );
};

export default Reviews;
